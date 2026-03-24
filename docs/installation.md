# Installation

This page covers all the ways you can install and deploy Garuda — from a simple local development setup to a production-ready cluster.

---

## Requirements

| Dependency | Minimum Version | Purpose |
|------------|----------------|---------|
| Python | 3.10 | Core runtime |
| Redis | 6.0 | Default message broker |
| PostgreSQL | 13 *(optional)* | Alternative broker / result backend |
| RabbitMQ | 3.10 *(optional)* | Alternative message broker |
| Docker | 20.10 *(optional)* | Containerised deployment |

---

## Option 1 — pip (Recommended for Development)

Install the base package:

```bash
pip install garuda
```

Install with optional extras:

```bash
# PostgreSQL broker support
pip install "garuda[postgres]"

# RabbitMQ broker support
pip install "garuda[rabbitmq]"

# All extras
pip install "garuda[all]"
```

---

## Option 2 — Docker

The official Garuda Docker image bundles the worker, scheduler, and API server.

### Pull the Image

```bash
docker pull ghcr.io/saketsinghrajput/garuda:latest
```

### Run a Worker Container

```bash
docker run -d \
  --name garuda-worker \
  -e GARUDA_BROKER_URL=redis://redis:6379/0 \
  -e GARUDA_RESULT_BACKEND=redis://redis:6379/1 \
  ghcr.io/saketsinghrajput/garuda:latest \
  worker --concurrency 4
```

---

## Option 3 — Docker Compose (Full Stack)

The following `docker-compose.yml` starts Garuda with Redis, a worker, and the monitoring dashboard:

```yaml
version: "3.9"

services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  worker:
    image: ghcr.io/saketsinghrajput/garuda:latest
    command: worker --concurrency 4
    environment:
      GARUDA_BROKER_URL: redis://redis:6379/0
      GARUDA_RESULT_BACKEND: redis://redis:6379/1
    depends_on:
      - redis
    volumes:
      - ./tasks:/app/tasks

  dashboard:
    image: ghcr.io/saketsinghrajput/garuda:latest
    command: dashboard --port 8080
    ports:
      - "8080:8080"
    environment:
      GARUDA_BROKER_URL: redis://redis:6379/0
    depends_on:
      - redis
```

Start the stack:

```bash
docker compose up -d
```

---

## Option 4 — From Source

Clone the repository and install in editable mode for development:

```bash
git clone https://github.com/SaketSinghRajput/garuda.git
cd garuda
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

Run the test suite to verify the build:

```bash
pytest
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GARUDA_BROKER_URL` | `redis://localhost:6379/0` | Message broker connection URL |
| `GARUDA_RESULT_BACKEND` | `redis://localhost:6379/1` | Result storage backend URL |
| `GARUDA_LOG_LEVEL` | `INFO` | Logging verbosity (`DEBUG`, `INFO`, `WARNING`, `ERROR`) |
| `GARUDA_WORKER_CONCURRENCY` | `4` | Number of concurrent worker threads |
| `GARUDA_TASK_TIMEOUT` | `300` | Default task timeout in seconds |

---

## Upgrading

```bash
pip install --upgrade garuda
```

After upgrading, review the [Changelog](changelog.md) for any breaking changes.

---

## Uninstalling

```bash
pip uninstall garuda
```
