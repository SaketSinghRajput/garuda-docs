# Frequently Asked Questions

---

## General

### What is Garuda?

Garuda is a lightweight distributed task orchestration framework for Python. It lets you offload time-consuming work — like sending emails, processing images, or calling external APIs — to background workers so your application stays fast and responsive.

---

### How is Garuda different from Celery?

Garuda is designed to be simpler to deploy and operate, especially for small-to-medium teams. Key differences:

| Feature | Garuda | Celery |
|---------|--------|-------|
| Configuration | Single TOML file | Complex settings module |
| Dashboard | Built-in | Requires Flower (separate project) |
| REST API | Built-in | Not included |
| PostgreSQL broker | ✅ | ✅ (via kombu) |
| Deployment | Single binary / Docker image | Multiple components to wire together |
| Python version | ≥ 3.10 | ≥ 3.8 |

---

### What message brokers does Garuda support?

- **Redis** (default) — recommended for most use cases
- **RabbitMQ** — for complex routing and enterprise deployments
- **PostgreSQL** — when you already operate PostgreSQL and don't want to add another service

---

### Does Garuda support task chaining or workflows?

Yes. You can chain tasks so the output of one becomes the input of the next:

```python
from garuda import chain

result = chain(
    fetch_data.s(url),
    process_data.s(),
    store_result.s(),
).delay()
```

Support for parallel groups (`group`) and complex canvas workflows (`chord`) is planned for v1.1.

---

## Workers

### How many workers should I run?

- For **I/O-bound tasks** (HTTP calls, database queries): start with `concurrency = CPU cores × 4`.
- For **CPU-bound tasks** (image processing, data crunching): start with `concurrency = CPU cores`.

Monitor CPU and memory usage with the Dashboard and adjust accordingly.

---

### What happens if a worker crashes mid-task?

If `task_acks_late = false` (the default), the task message is acknowledged as soon as the worker picks it up. If the worker crashes, the task result is lost.

Set `task_acks_late = true` to acknowledge the message only after the task completes successfully. Combined with `task_reject_on_worker_lost = true`, tasks are automatically re-queued if the worker dies.

---

### Can workers run on different machines?

Yes. Workers just need network access to the broker. You can run as many workers as you like on as many machines as you like — no coordination is needed beyond connecting to the same broker URL.

---

## Tasks

### How do I pass large objects to tasks?

Avoid passing large objects (files, DataFrames, binary blobs) directly as task arguments — the payload travels through the broker, which can become a bottleneck.

Instead, store the large object in a shared location (S3, database, Redis) and pass a reference (URL, key, ID) as the task argument.

---

### How do I handle task timeouts?

Configure `time_limit` (hard kill) and `soft_time_limit` (raises `SoftTimeLimitExceeded` so the task can clean up):

```python
@task(time_limit=60, soft_time_limit=55)
def long_running_task():
    try:
        # your work here
        pass
    except SoftTimeLimitExceeded:
        # clean up resources before hard kill
        cleanup()
        raise
```

---

### Can I schedule a task to run at a specific time?

Yes, use `eta` (absolute time) or `countdown` (relative delay):

```python
from datetime import datetime, timedelta, timezone

# Run at a specific time
task.apply_async(eta=datetime(2026, 4, 1, 9, 0, tzinfo=timezone.utc))

# Run in 5 minutes
task.apply_async(countdown=300)
```

---

### How long are task results kept?

By default, results are stored for **1 hour** (`result_expires = 3600`). You can change this in your configuration. Results that expire are automatically deleted from the backend.

---

## Production

### Is it safe to run multiple Beat scheduler instances?

No. Only **one Beat process** should run at a time. Running multiple Beat instances will cause duplicate task submissions. Use a process supervisor (systemd, Kubernetes Deployment with `replicas: 1`) to ensure a single Beat is always running.

---

### How do I deploy Garuda in Kubernetes?

A recommended setup:

- **Workers**: `Deployment` with horizontal autoscaling based on queue depth (use KEDA for queue-aware HPA).
- **Beat scheduler**: `Deployment` with `replicas: 1` and a `PodDisruptionBudget`.
- **API / Dashboard**: `Deployment` behind an `Ingress`.
- **Broker**: Redis via `redis-operator` or a managed Redis service (e.g., AWS ElastiCache).

---

### How do I monitor Garuda in production?

Garuda exposes Prometheus-compatible metrics at `/metrics` on the API server. Scrape these with Prometheus and visualise with Grafana. The built-in Dashboard is great for development and ad-hoc debugging, but Prometheus + Grafana is recommended for production alerting.

---

## Getting Help

If your question isn't answered here:

- Search [GitHub Issues](https://github.com/SaketSinghRajput/garuda/issues)
- Start a [GitHub Discussion](https://github.com/SaketSinghRajput/garuda/discussions)
- Read the full [documentation](https://github.com/SaketSinghRajput/garuda-docs)
