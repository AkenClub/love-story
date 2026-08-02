# Security policy

## Supported versions

Security fixes are applied to the latest release on the default branch.

## Reporting a vulnerability

Please report vulnerabilities privately to the repository maintainers rather
than opening a public issue. Include reproduction steps and the affected
deployment target when possible.

## Deployment notes

- API authentication is required by default.
- Anonymous access must be enabled explicitly with `AUTH_MODE=disabled`.
- Never put API keys in the Vue application or in any `VITE_*` variable.
- Store Cloudflare and Vercel keys using each platform's secret manager.
- Prefer Docker secrets or a protected environment file for Docker deployments.
