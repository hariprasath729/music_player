# Security Policy

## Supported Versions

Only the latest release version of the music player receives security updates.

| Version | Supported |
| ------- | --------- |
| 1.0.x   | ✅ Yes    |
| < 1.0   | ❌ No     |

## Reporting a Vulnerability

We take the security of our music player seriously. If you find any security vulnerability, please do NOT open a public issue on GitHub. Instead, report it privately.



Please include the following details in your report:
- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting)
- Path or URL where the vulnerability exists
- Detailed steps to reproduce the issue
- Any proof of concept (PoC) or screenshots

We will acknowledge receipt of your vulnerability report within 48 hours and strive to send a follow-up response with a resolution plan within 7 days.

---

## Security Architecture Overview

This project has been hardened to production-grade security standards. Below is an overview of the security measures implemented:

1. **Authentication & Session Hardening**:
   - Secure JWT verification with strict cryptographically secure random key check.
   - `tokenVersion` schema-based validation to instantly invalidate session tokens when a password is changed or reset.
   - Fully hashed magic login and reset tokens stored in the database.
   - In-memory blacklisted token store matching the remaining duration of JWT validity upon logout.

2. **Rate Limiting & Anti-Abuse**:
   - Tiered rate limits applied to different routes (Strict, Sensitive, Write, Read, Public).
   - In-memory IP threat-scoring and automatic progressive IP blacklisting (15 minutes, 1 hour, 24 hours).
   - Strict brute-force protection with account locking.

3. **Input Sanitization & Data Safety**:
   - Schema-based validation using structural checks.
   - MongoDB operator sanitization (`express-mongo-sanitize`) to prevent NoSQL injection.
   - Prototype pollution protection and HTML/XSS input scanning.
   - HTML-escaping of all user input injected into transactional emails.

4. **Network & Connection Protections**:
   - Helmet middleware for secure HTTP headers (CSP, HSTS, CORP, COOP).
   - Strict CORS origin whitelisting.
   - Connection/request timeout limits to protect against slow-client/slowloris DDoS attacks.
   - MongoDB query timeout limits (`maxTimeMS`) to prevent server resource exhaustion.
