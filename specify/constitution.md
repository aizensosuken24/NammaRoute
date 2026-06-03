# Project Constitution — Smart Public Transport Planner

## Mission

To provide an intelligent, open-source public transport planning tool that helps
users find the most efficient routes using real-time transit data across multiple
modes of transport.

## Core Values

- **Openness**: All code is open source under AGPLv3
- **Reliability**: Transit data must be accurate and up to date
- **Simplicity**: The interface should be easy for any user to navigate
- **Community**: Contributions and feedback are welcome from everyone

## Architecture Principles

- Keep the codebase modular — each feature in its own module
- All external API calls must be abstracted behind a service layer
- Configuration via environment variables only (never hardcoded secrets)
- All new features must have a corresponding spec in `specs/`

## Definition of Done

A feature is complete when:
1. It has a feature spec in `specs/`
2. It passes all CI pipeline checks
3. It has unit tests with >50% coverage
4. Documentation is updated (README or USER_MANUAL if user-facing)
5. A conventional commit message is used

## Coding Standards

- Language: Python 3.13+
- Linter: ruff
- Formatter: black
- Type checker: mypy
- All functions must have type hints
- All public functions must have docstrings
