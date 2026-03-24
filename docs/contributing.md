# Contributing to Garuda

Thank you for your interest in contributing to Garuda! We welcome bug reports, feature requests, documentation improvements, and code contributions.

---

## Code of Conduct

By participating in this project you agree to abide by our [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Please treat all community members with respect.

---

## Ways to Contribute

| Type | How |
|------|-----|
| 🐛 Bug report | [Open a GitHub Issue](https://github.com/SaketSinghRajput/garuda/issues/new?template=bug_report.md) |
| 💡 Feature request | [Open a GitHub Issue](https://github.com/SaketSinghRajput/garuda/issues/new?template=feature_request.md) |
| 📝 Documentation | Submit a PR to [garuda-docs](https://github.com/SaketSinghRajput/garuda-docs) |
| 🔧 Code | Fork → Branch → PR (see below) |

---

## Development Setup

### 1. Fork and Clone

```bash
git clone https://github.com/<your-username>/garuda.git
cd garuda
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate
```

### 3. Install Development Dependencies

```bash
pip install -e ".[dev]"
```

This installs the package in editable mode plus all development tools:

- `pytest` — Test runner
- `pytest-asyncio` — Async test support
- `coverage` — Code coverage
- `ruff` — Linter
- `black` — Code formatter
- `mypy` — Static type checker
- `pre-commit` — Git hook manager

### 4. Install Pre-commit Hooks

```bash
pre-commit install
```

Pre-commit hooks run `ruff`, `black`, and `mypy` before every commit to catch issues early.

### 5. Start a Local Broker

```bash
docker run -d --name garuda-redis -p 6379:6379 redis:7-alpine
```

---

## Running Tests

Run the full test suite:

```bash
pytest
```

Run a specific test file or test:

```bash
pytest tests/test_tasks.py
pytest tests/test_tasks.py::test_basic_task
```

Run with coverage report:

```bash
pytest --cov=garuda --cov-report=term-missing
```

All PRs must maintain **>= 90% test coverage**.

---

## Code Style

We follow these standards:

- **[PEP 8](https://peps.python.org/pep-0008/)** for general Python style.
- **[Black](https://black.readthedocs.io/)** for code formatting (line length: 88).
- **[Ruff](https://docs.astral.sh/ruff/)** for linting.
- **[Google-style docstrings](https://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings)** for all public functions and classes.
- **Type annotations** for all function signatures.

Format and lint your code before committing:

```bash
black .
ruff check . --fix
mypy garuda/
```

---

## Pull Request Process

1. **Create a branch** from `main` with a descriptive name:
   ```bash
   git checkout -b feat/add-rabbitmq-broker
   # or
   git checkout -b fix/task-timeout-not-applied
   ```

2. **Write tests** for any new functionality.

3. **Update documentation** if your change affects public APIs or configuration.

4. **Commit** with a clear, conventional commit message:
   ```
   feat: add RabbitMQ broker adapter
   fix: apply task timeout to subprocess workers
   docs: clarify retry backoff configuration
   chore: upgrade redis-py to 5.0
   ```

5. **Push** your branch and open a Pull Request against `main`.

6. **Fill in the PR template** — describe what the PR does, why it's needed, and how you tested it.

7. **Address review feedback** — a maintainer will review your PR within a few business days.

### PR Checklist

Before submitting, confirm that:

- [ ] All tests pass (`pytest`)
- [ ] Coverage has not decreased
- [ ] Code is formatted and linted (`black . && ruff check .`)
- [ ] Type checks pass (`mypy garuda/`)
- [ ] Public API changes are documented
- [ ] The CHANGELOG has an entry for this change (if user-facing)

---

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`

**Examples:**

```
feat(broker): add PostgreSQL broker adapter
fix(worker): handle SIGTERM gracefully during task execution
docs(api): document /health endpoint
```

---

## Reporting Security Vulnerabilities

**Please do not open a public issue for security vulnerabilities.**

Instead, email the maintainers directly at **security@garuda-project.dev** with:

- A description of the vulnerability
- Steps to reproduce
- Potential impact

We aim to acknowledge reports within 48 hours and release a patch within 14 days.

---

## Questions?

If you have questions that aren't covered here, open a [Discussion](https://github.com/SaketSinghRajput/garuda/discussions) on GitHub — we're happy to help!
