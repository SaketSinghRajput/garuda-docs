# Architecture

This document describes how Garuda works internally — the key components, data flow, and design decisions.

---

## Overview

Garuda follows a **broker-based message-passing architecture**. Producers (your application code) publish task messages to a message broker. Workers pull those messages, execute the tasks, and store the results in a result backend.

```
┌────────────────────────────────────────────────────────┐
│                    Producer (Your App)                  │
│  task.delay(args)  ──────────────────────────────────► │
└──────────────────────────────┬─────────────────────────┘
                               │ Publish message
                               ▼
┌──────────────────────────────────────────────────────────┐
│                       Message Broker                      │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│   │ Queue: default│  │ Queue: critical│  │ Queue: bulk │  │
│   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└──────────┼─────────────────┼─────────────────┼──────────┘
           │ Consume         │                 │
           ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────┐
│                        Workers                           │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐          │
│  │ Worker 1  │   │ Worker 2  │   │ Worker N  │          │
│  └─────┬─────┘   └─────┬─────┘   └─────┬─────┘          │
└────────┼───────────────┼───────────────┼────────────────┘
         │ Store result  │               │
         ▼               ▼               ▼
┌──────────────────────────────────────────────────────────┐
│                     Result Backend                        │
│  (Redis / PostgreSQL)                                     │
└──────────────────────────────────────────────────────────┘
         ▲
         │ Poll / callback
┌────────┴──────────────────────────────────────────────────┐
│               Producer retrieves result                    │
│  result = task_handle.get()                                │
└────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Task

A **Task** is the unit of work. It is a Python callable decorated with `@task` that Garuda knows how to serialise, route, and execute.

- Each task is assigned a **unique task ID** (UUID) when enqueued.
- Tasks carry a payload (arguments) serialised as JSON or MessagePack.
- Task metadata (retries, priority, queue, ETA) is embedded in the message.

### 2. Message Broker

The broker is the **communication channel** between producers and workers. Garuda supports:

| Broker | Protocol | Best For |
|--------|----------|---------|
| Redis | RESP | Low latency, simple deployment |
| RabbitMQ | AMQP | High throughput, complex routing |
| PostgreSQL | SQL LISTEN/NOTIFY | When you already run PostgreSQL |

The broker stores messages in **queues**. Each queue is an ordered list of pending task messages. Workers consume from one or more queues.

### 3. Worker

A **Worker** is a long-running process that:

1. Connects to the broker and subscribes to one or more queues.
2. Pre-fetches a configurable number of messages (`prefetch_multiplier`).
3. Deserialises the task message and locates the task function.
4. Executes the task in a thread or subprocess.
5. Stores the result (or exception) in the result backend.
6. Acknowledges the message to remove it from the queue.

Workers support two execution models:

- **Threading** — Tasks run in separate threads (suitable for I/O-bound work).
- **Multiprocessing** — Tasks run in isolated subprocesses (suitable for CPU-bound work, also provides memory isolation).

### 4. Result Backend

The **Result Backend** stores task outcomes so producers can retrieve them later. Supported backends:

| Backend | Storage | Notes |
|---------|---------|-------|
| Redis | In-memory | Fast; results are ephemeral |
| PostgreSQL | On-disk | Durable; queryable |
| In-Memory | Process memory | Testing only; not shared across processes |

Results are stored with a configurable TTL (`result_expires`). After expiry, results are automatically deleted.

### 5. Scheduler (Beat)

The **Garuda Beat** process reads a periodic task schedule and publishes task messages to the broker at the configured times. It supports:

- Fixed-interval schedules (every N seconds)
- Cron expressions (e.g., `0 0 * * *` for midnight daily)

Only one Beat process should run per deployment to avoid duplicate task submissions.

### 6. REST API Server

Garuda includes an optional **HTTP API** (powered by FastAPI) that allows you to:

- Submit tasks over HTTP from any language or service.
- Query task status and results.
- Inspect and manage queues.
- View worker health.

See the [API Reference](api-reference.md) for full details.

### 7. Dashboard

The **Garuda Dashboard** is a web-based monitoring UI that shows:

- Live queue depths and throughput charts.
- Worker pool status and system resource usage.
- A searchable task log with status, duration, and error details.
- Controls to cancel, retry, or purge tasks.

---

## Task Lifecycle

```
Producer calls task.delay()
         │
         ▼
  Garuda serialises task + metadata into a message
         │
         ▼
  Message is published to the broker queue
         │
         ▼
  Worker receives and acknowledges the message
         │
         ├─► Task executes successfully
         │         │
         │         └─► Result stored in backend (state: SUCCESS)
         │
         └─► Task raises an exception
                   │
                   ├─► Retries remaining? → Re-queue with back-off delay
                   │
                   └─► Max retries exhausted → Stored as FAILURE
```

---

## Retry & Error Handling

Garuda provides automatic retry logic with configurable back-off:

```python
@task(max_retries=5, retry_backoff=2, retry_backoff_max=120)
def fetch_data(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
```

| Retry attempt | Back-off delay (base=2) |
|---------------|------------------------|
| 1st | 2 s |
| 2nd | 4 s |
| 3rd | 8 s |
| 4th | 16 s |
| 5th | 32 s |

Tasks that exceed `max_retries` are stored with a `FAILURE` state and the exception traceback.

---

## Scalability

Garuda is designed to scale horizontally:

- **Add more workers** to increase throughput — no coordination needed.
- **Add more queues** to isolate workloads (e.g., separate queues for `critical`, `default`, and `bulk`).
- **Cluster Redis or RabbitMQ** for broker high availability.
- **Use the PostgreSQL backend** for durable, queryable result storage in production.

---

## Security Considerations

- All task payloads travel through the broker — use TLS on your broker connections.
- The REST API and Dashboard should be placed behind an authenticated reverse proxy in production.
- Avoid passing sensitive credentials as task arguments; use environment variables or a secrets manager instead.
