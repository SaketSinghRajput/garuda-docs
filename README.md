# 🦅 Project Garuda

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-latest-blue.svg)](./docs)
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)]()

**Garuda** is a lightweight, high-performance distributed task orchestration framework designed to simplify the execution and monitoring of asynchronous workflows. Named after the mythical eagle of Hindu and Buddhist tradition — swift, powerful, and precise — Garuda gives your applications wings to process tasks at scale.

---

## ✨ Features

- **Distributed Task Queue** — Schedule and run tasks across multiple workers seamlessly.
- **Real-time Monitoring** — Built-in dashboard to monitor task status, logs, and performance metrics.
- **Flexible Backends** — Supports Redis, RabbitMQ, and PostgreSQL as message brokers.
- **Retry & Error Handling** — Automatic retries with exponential back-off and dead-letter queues.
- **Priority Scheduling** — Assign task priorities to ensure critical work runs first.
- **REST API** — Fully documented HTTP API for programmatic task management.
- **Extensible Plugins** — Hook into the lifecycle with custom middleware and plugins.
- **Language Agnostic Workers** — Workers can be written in Python, Node.js, Go, or any language with an HTTP client.

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10 or higher
- Redis 6.x or higher (default broker)
- Docker (optional, for containerised setup)

### Installation

```bash
pip install garuda
```

### Running Your First Task

```python
from garuda import Garuda, task

app = Garuda(broker="redis://localhost:6379/0")

@task
def add(x, y):
    return x + y

# Enqueue a task
result = add.delay(3, 4)
print(result.get())  # 7
```

Start a worker in a separate terminal:

```bash
garuda worker --app myapp.app
```

---

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/getting-started.md) | Walkthrough for first-time users |
| [Installation](docs/installation.md) | Detailed installation and environment setup |
| [Configuration](docs/configuration.md) | All configuration options explained |
| [Architecture](docs/architecture.md) | How Garuda works under the hood |
| [API Reference](docs/api-reference.md) | REST API endpoints and SDK reference |
| [Contributing](docs/contributing.md) | How to contribute to the project |
| [FAQ](docs/faq.md) | Frequently asked questions |
| [Changelog](docs/changelog.md) | Version history and release notes |

---

## 📦 Project Structure

```
garuda/
├── core/           # Core orchestration engine
├── brokers/        # Broker adapters (Redis, RabbitMQ, PG)
├── workers/        # Worker process management
├── api/            # REST API server
├── dashboard/      # Monitoring dashboard (web UI)
├── plugins/        # Plugin interface and built-in plugins
└── cli/            # Command-line interface
```

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](docs/contributing.md) to get started.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

Garuda is inspired by the great distributed task systems that came before it — Celery, Sidekiq, and Temporal — and built with the goal of being easier to deploy and operationally simpler for small-to-medium teams.
