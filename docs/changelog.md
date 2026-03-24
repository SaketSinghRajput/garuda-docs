# Changelog

All notable changes to Garuda will be documented here.

This project adheres to [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/) format.

---

## [Unreleased]

### Added
- Brotli compression support for task payloads and results.
- `garuda inspect` CLI command for live worker introspection.

### Changed
- Dashboard now uses WebSockets for real-time queue metric updates (replaces polling).

---

## [1.0.0] — 2026-03-24

### Added
- Initial public release of Project Garuda.
- Core task decorator (`@task`) with support for args, kwargs, and return values.
- Redis broker adapter with connection pooling and keepalive support.
- RabbitMQ broker adapter (AMQP 0-9-1).
- PostgreSQL broker adapter using `LISTEN/NOTIFY`.
- Redis result backend with configurable TTL.
- PostgreSQL result backend for durable, queryable result storage.
- Worker process with configurable concurrency (thread and multiprocess modes).
- Automatic retry with exponential back-off and jitter.
- Task prioritisation (priority 1–10 per queue).
- ETA and countdown scheduling — delay task execution to a future time.
- Garuda Beat scheduler for periodic and cron-based tasks.
- REST API server (FastAPI) with endpoints for tasks, queues, and workers.
- Python SDK (`garuda.client.GarudaClient`) for programmatic API access.
- Web-based monitoring Dashboard with live queue depths, worker health, and task log.
- CLI (`garuda worker`, `garuda beat`, `garuda dashboard`, `garuda inspect`).
- `garuda.toml` configuration file support.
- Environment variable configuration with `GARUDA_` prefix.
- JSON and MessagePack task serialisers.
- gzip payload compression.
- Plugin/middleware interface for task lifecycle hooks.
- Docker image (`ghcr.io/saketsinghrajput/garuda`).
- Docker Compose example for full-stack local deployment.
- Comprehensive documentation.

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|-----------|
| 1.0.0 | 2026-03-24 | Initial public release |

---

## How We Version

- **Major** (`X.0.0`) — Breaking changes to public APIs or configuration format.
- **Minor** (`1.X.0`) — New features that are backwards compatible.
- **Patch** (`1.0.X`) — Backwards-compatible bug fixes and security patches.

[Unreleased]: https://github.com/SaketSinghRajput/garuda/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/SaketSinghRajput/garuda/releases/tag/v1.0.0
