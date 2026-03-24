# Getting Started with Garuda

This guide walks you through setting up Garuda and running your first distributed task in under five minutes.

---

## Prerequisites

Before you begin, make sure you have the following installed:

| Requirement | Version | Notes |
|-------------|---------|-------|
| Python | ≥ 3.10 | Required for the Garuda SDK and CLI |
| Redis | ≥ 6.0 | Default message broker |
| pip | Latest | Python package manager |

> **Tip:** You can use Docker to run Redis without a local installation. See the [Installation guide](installation.md) for details.

---

## Step 1 — Install Garuda

Install the Garuda package from PyPI:

```bash
pip install garuda
```

To verify the installation:

```bash
garuda --version
```

---

## Step 2 — Start the Broker

If you have Redis running locally, you're ready to go. Otherwise, start Redis with Docker:

```bash
docker run -d --name garuda-redis -p 6379:6379 redis:7-alpine
```

---

## Step 3 — Define a Task

Create a file called `tasks.py`:

```python
from garuda import Garuda, task

app = Garuda(broker="redis://localhost:6379/0")

@task
def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to Garuda."

@task
def add(x: int, y: int) -> int:
    return x + y
```

---

## Step 4 — Start a Worker

Open a terminal and start a Garuda worker that listens for tasks:

```bash
garuda worker --app tasks.app --concurrency 4
```

You should see output like:

```
[2026-03-24 10:00:00] Garuda worker starting...
[2026-03-24 10:00:00] Connected to broker: redis://localhost:6379/0
[2026-03-24 10:00:00] Worker ready. Listening on queue: default
```

---

## Step 5 — Submit a Task

In a separate Python session or script, submit a task:

```python
from tasks import greet, add

# Submit asynchronously
result = greet.delay("World")

# Block and wait for the result
print(result.get(timeout=10))  # Hello, World! Welcome to Garuda.

# Chain tasks
sum_result = add.delay(5, 10)
print(sum_result.get())  # 15
```

---

## Step 6 — Monitor with the Dashboard

Start the built-in monitoring dashboard:

```bash
garuda dashboard --port 8080
```

Open your browser at [http://localhost:8080](http://localhost:8080) to see real-time task status, worker health, and queue metrics.

---

## What's Next?

- Read the [Installation guide](installation.md) for production setup options.
- Explore the [Configuration reference](configuration.md) to customise Garuda's behaviour.
- Check the [API Reference](api-reference.md) to integrate Garuda into your existing services.
- Learn about the [Architecture](architecture.md) to understand how everything fits together.
