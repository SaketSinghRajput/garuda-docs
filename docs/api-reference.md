# API Reference

Garuda exposes a RESTful HTTP API that lets you submit tasks, query results, and manage queues from any language or service.

---

## Base URL

```
http://<host>:8080/api/v1
```

All endpoints accept and return **JSON**. Timestamps are in ISO 8601 UTC format.

---

## Authentication

When `auth_enabled = true` in your configuration, include a bearer token in every request:

```http
Authorization: Bearer <your-api-token>
```

---

## Tasks

### Submit a Task

```http
POST /tasks
```

**Request body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `task_name` | string | ✅ | Fully-qualified task name (e.g., `myapp.tasks.add`) |
| `args` | array | ❌ | Positional arguments |
| `kwargs` | object | ❌ | Keyword arguments |
| `queue` | string | ❌ | Target queue (default: `default`) |
| `priority` | int (1–10) | ❌ | Task priority (1 = highest) |
| `eta` | ISO 8601 string | ❌ | Earliest time to execute the task |
| `countdown` | int | ❌ | Seconds to delay execution from now |

**Example request:**

```bash
curl -X POST http://localhost:8080/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "task_name": "myapp.tasks.add",
    "args": [3, 4],
    "queue": "default"
  }'
```

**Response `201 Created`:**

```json
{
  "task_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "task_name": "myapp.tasks.add",
  "status": "PENDING",
  "queue": "default",
  "submitted_at": "2026-03-24T10:00:00Z"
}
```

---

### Get Task Status

```http
GET /tasks/{task_id}
```

**Response `200 OK`:**

```json
{
  "task_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "task_name": "myapp.tasks.add",
  "status": "SUCCESS",
  "result": 7,
  "submitted_at": "2026-03-24T10:00:00Z",
  "started_at": "2026-03-24T10:00:01Z",
  "completed_at": "2026-03-24T10:00:01Z",
  "duration_ms": 42,
  "retries": 0,
  "worker_id": "worker-1@hostname"
}
```

**Task statuses:**

| Status | Description |
|--------|-------------|
| `PENDING` | Task is queued, waiting for a worker |
| `STARTED` | A worker has picked up the task |
| `SUCCESS` | Task completed successfully |
| `FAILURE` | Task raised an unhandled exception |
| `RETRY` | Task failed and is scheduled for retry |
| `REVOKED` | Task was cancelled before execution |

---

### Cancel a Task

```http
DELETE /tasks/{task_id}
```

Attempts to cancel a pending or running task.

**Response `200 OK`:**

```json
{
  "task_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "status": "REVOKED"
}
```

> **Note:** Cancelling a task that is already running is a best-effort operation. The worker will attempt to abort, but completion is not guaranteed.

---

### Retry a Failed Task

```http
POST /tasks/{task_id}/retry
```

Re-submits a `FAILURE` task with the original arguments.

**Response `201 Created`:**

```json
{
  "task_id": "a1b2c3d4-...",
  "status": "PENDING"
}
```

---

### List Tasks

```http
GET /tasks
```

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status (`PENDING`, `SUCCESS`, `FAILURE`, …) |
| `queue` | string | Filter by queue name |
| `task_name` | string | Filter by task name |
| `from` | ISO 8601 | Filter tasks submitted after this time |
| `to` | ISO 8601 | Filter tasks submitted before this time |
| `page` | int | Page number (default: 1) |
| `page_size` | int | Results per page (default: 20, max: 100) |

**Response `200 OK`:**

```json
{
  "total": 1024,
  "page": 1,
  "page_size": 20,
  "items": [
    {
      "task_id": "f47ac10b-...",
      "task_name": "myapp.tasks.add",
      "status": "SUCCESS",
      ...
    }
  ]
}
```

---

## Queues

### List Queues

```http
GET /queues
```

**Response `200 OK`:**

```json
[
  {
    "name": "default",
    "pending": 42,
    "consumers": 4
  },
  {
    "name": "critical",
    "pending": 2,
    "consumers": 2
  }
]
```

---

### Purge a Queue

```http
DELETE /queues/{queue_name}/messages
```

Deletes all pending messages in the queue. Running tasks are not affected.

**Response `200 OK`:**

```json
{
  "queue": "default",
  "deleted": 42
}
```

---

## Workers

### List Workers

```http
GET /workers
```

**Response `200 OK`:**

```json
[
  {
    "worker_id": "worker-1@hostname",
    "status": "online",
    "queues": ["default", "critical"],
    "concurrency": 4,
    "active_tasks": 2,
    "processed_total": 15823,
    "uptime_seconds": 86400,
    "cpu_percent": 12.4,
    "memory_mb": 128.6
  }
]
```

---

### Get Worker Detail

```http
GET /workers/{worker_id}
```

Returns detailed information about a single worker, including its currently active tasks.

---

## Health Check

```http
GET /health
```

Returns the health status of the API server and its connections.

**Response `200 OK`:**

```json
{
  "status": "ok",
  "broker": "connected",
  "result_backend": "connected",
  "version": "1.0.0"
}
```

---

## Python SDK

The Python SDK mirrors the HTTP API with an idiomatic async interface:

```python
from garuda.client import GarudaClient

client = GarudaClient(base_url="http://localhost:8080/api/v1")

# Submit a task
handle = client.submit("myapp.tasks.add", args=[3, 4])
print(handle.task_id)

# Poll for result
result = handle.get(timeout=30)
print(result)  # 7

# List failed tasks
failed = client.list_tasks(status="FAILURE", page_size=50)
for task in failed:
    print(task.task_id, task.task_name)
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "task_not_found",
  "message": "No task with ID 'abc123' was found.",
  "status_code": 404
}
```

| HTTP Status | Error code | Description |
|-------------|-----------|-------------|
| 400 | `invalid_request` | Missing or malformed request body |
| 401 | `unauthorized` | Missing or invalid auth token |
| 404 | `task_not_found` | Requested task ID does not exist |
| 409 | `task_already_revoked` | Task has already been cancelled |
| 422 | `unprocessable_entity` | Request body failed validation |
| 500 | `internal_error` | Unexpected server error |
| 503 | `broker_unavailable` | Garuda cannot reach the message broker |
