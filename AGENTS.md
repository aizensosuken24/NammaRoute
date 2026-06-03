# AGENTS.md — AI Agent & Automation Guidelines

This file provides guidance for AI agents, automated tools, and bots
interacting with the Smart Public Transport Planner repository.

## Repository Overview

- **Project**: Smart Public Transport Planner
- **Language**: Python
- **Purpose**: Route planning and optimization using public transport data

## For AI Coding Agents

### Allowed Actions

- Read and analyze any source file in the repository
- Suggest code improvements, refactors, or bug fixes via merge requests
- Generate or update tests in the `tests/` directory
- Update documentation files (README, USER_MANUAL, CHANGELOG, etc.)

### Restricted Actions

- Do **not** commit directly to `main` — always use a feature branch and MR
- Do **not** modify `.env` or any file containing secrets
- Do **not** remove existing tests without justification
- Do **not** add dependencies without updating `requirements.txt`

## Code Style

- Follow **PEP 8** for all Python code
- Use **ruff** for linting: `ruff check .`
- Use **black** for formatting: `black .`
- Type hints are encouraged for all public functions

## Testing

- Run tests with: `pytest tests/`
- Aim for >80% coverage on new code
- Add regression tests for any bug fixes

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

Examples:
feat: add real-time delay notifications
fix: correct route calculation for metro transfers
docs: update USER_MANUAL with new API config steps
test: add unit tests for route optimizer
```

## CI/CD

The project uses GitLab CI. Ensure all pipeline stages pass before requesting a review:
- `lint` — code style checks
- `test` — unit and integration tests
- `build` — package/Docker build

## Contact

For questions about this repository's automation policies, open an issue or
contact the maintainer via the GitLab project page.
