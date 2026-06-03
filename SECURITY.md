# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Smart Public Transport Planner, please report it responsibly.

**Do not open a public GitLab issue for security vulnerabilities.**

### How to Report

1. Email the maintainer at the address listed in the project profile, or
2. Open a confidential issue on the GitLab repository using the "Confidential" checkbox.

### What to Include

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Any proof-of-concept code (if applicable)
- Suggested fix (if you have one)

### Response Timeline

- We will acknowledge your report within **48 hours**
- We aim to provide a fix or mitigation within **14 days** for critical issues
- You will be credited in the changelog (unless you prefer to remain anonymous)

## Security Best Practices for Contributors

- Never commit API keys, tokens, or credentials to the repository
- Use `.env` files for local secrets and ensure `.env` is listed in `.gitignore`
- Keep dependencies up to date and review dependency updates for known CVEs
