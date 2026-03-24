# Configuration

Garuda can be configured through environment variables, a configuration file, or directly in Python. All three methods can be combined; values are resolved in this precedence order:

1. **Code-level** settings (highest priority)
2. **Environment variables**
3. **Configuration file** (`garuda.toml`)
4. **Built-in defaults** (lowest priority)

---

## Configuration File

Create a `garuda.toml` file at the root of your project:

```toml
[broker]
url = "redis://localhost:6379/0"
connection_timeout = 5       # seconds
socket_keepalive = true

[result_backend]
url = "redis://localhost:6379/1"
result_expires = 3600        # seconds until results are deleted

[worker]
concurrency = 4
prefetch_multiplier = 4
max_tasks_per_child = 1000   # respawn worker after N tasks (prevents memory leaks)
time_limit = 300             # hard kill limit per task (seconds)
soft_time_limit = 270        # raises SoftTimeLimitExceeded before hard kill

[scheduler]
enabled = true
timezone = "UTC"

[logging]
level = "INFO"
format = "json"              # "json" | "text"

[dashboard]
port = 8080
auth_enabled = false
```

---

## Python Configuration

Pass settings directly when instantiating `Garuda`:

```python
from garuda import Garuda

app = Garuda(
    broker="redis://localhost:6379/0",
    result_backend="redis://localhost:6379/1",
    task_time_limit=300,
    worker_concurrency=4,
)
```

Or update settings after instantiation:

```python
app.config.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="Asia/Kolkata",
    enable_utc=True,
)
```

---

## All Configuration Options

### Broker

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `broker.url` | string | `redis://localhost:6379/0` | Broker connection URL |
| `broker.connection_timeout` | int | `5` | Seconds before a connection attempt times out |
| `broker.socket_keepalive` | bool | `true` | Enable TCP keepalive for broker sockets |
| `broker.transport_options` | dict | `{}` | Advanced transport-level options |

### Result Backend

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `result_backend.url` | string | *(same as broker)* | Result storage URL |
| `result_backend.result_expires` | int | `3600` | TTL for stored results (seconds) |
| `result_backend.result_compression` | string | `none` | Compress results: `none`, `gzip`, `brotli` |

### Worker

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `worker.concurrency` | int | `4` | Number of concurrent task threads |
| `worker.prefetch_multiplier` | int | `4` | How many tasks each worker pre-fetches |
| `worker.max_tasks_per_child` | int | `0` (unlimited) | Respawn worker after N tasks |
| `worker.time_limit` | int | `300` | Hard task timeout (seconds) |
| `worker.soft_time_limit` | int | `270` | Raises `SoftTimeLimitExceeded` before hard timeout |
| `worker.queues` | list | `["default"]` | Queues the worker consumes from |

### Task Defaults

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `task_serializer` | string | `json` | Default task serialiser: `json`, `msgpack` |
| `task_compression` | string | `none` | Compress task payloads: `none`, `gzip` |
| `task_acks_late` | bool | `false` | Acknowledge task only after it finishes |
| `task_reject_on_worker_lost` | bool | `false` | Re-queue task if the worker dies mid-execution |
| `task_default_queue` | string | `default` | Queue to use when none is specified |
| `task_default_priority` | int | `5` | Priority 1 (highest) – 10 (lowest) |

### Retry Policy

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `task_max_retries` | int | `3` | Maximum automatic retries |
| `task_retry_backoff` | bool / int | `false` | Enable exponential back-off. Set to an int for the base delay (seconds) |
| `task_retry_backoff_max` | int | `600` | Cap on retry delay (seconds) |
| `task_retry_jitter` | bool | `true` | Add random jitter to back-off delay |

### Scheduler

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `scheduler.enabled` | bool | `false` | Enable the built-in periodic task scheduler |
| `scheduler.timezone` | string | `UTC` | Timezone for cron-style schedules |

### Logging

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `logging.level` | string | `INFO` | Log level: `DEBUG`, `INFO`, `WARNING`, `ERROR` |
| `logging.format` | string | `text` | Output format: `text`, `json` |

---

## Configuring Queues

Define named queues with different priorities or concurrency settings:

```python
from garuda import Garuda

app = Garuda(broker="redis://localhost:6379/0")

# Route a task to a specific queue
@app.task(queue="critical")
def urgent_job():
    ...

@app.task(queue="bulk", priority=8)
def bulk_export():
    ...
```

Start a worker that only consumes from specific queues:

```bash
garuda worker --queues critical,default
```

---

## Periodic Tasks (Cron)

Schedule tasks using cron expressions or timedeltas:

```python
from garuda.schedules import crontab

app.conf.beat_schedule = {
    "generate-daily-report": {
        "task": "myapp.tasks.generate_report",
        "schedule": crontab(hour=0, minute=0),  # daily at midnight
    },
    "health-check": {
        "task": "myapp.tasks.ping",
        "schedule": 30.0,  # every 30 seconds
    },
}
```

Start the scheduler:

```bash
garuda beat
```
