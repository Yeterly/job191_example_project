---
id: US-1-T-1
story: US-1
sprint: 1
assignee: Muratcan Çiçek
estimate_hours: 3
---

# Reject a non-university email on login

## Description
Serves US-1 (log in with a university email). This task covers the rejection path only. Successful login (US-1-T-2) and session persistence (US-1-T-3) are out of scope.

## Specs
- `POST /api/login` with `{ "email": "student@gmail.com" }` returns HTTP 400 and `{ "error": "Use your university email" }`.
- On rejection, the response sets no session cookie and the user stays signed out.
- A university email ends in `@stu.istinye.edu.tr` (case-insensitive). `student@STU.ISTINYE.EDU.TR` is valid. `student@stu.istinye.edu.tr.evil.com` is not.
- The check runs in the existing login handler, before any database lookup.

## Requirements
- Use the existing login handler. Do not add a second user table.
- No new runtime dependencies.
- Existing login tests must keep passing.

## Acceptance criteria
1. A non-university email is rejected with HTTP 400 and the message "Use your university email".
2. No session cookie is set on rejection.
3. A `@stu.istinye.edu.tr` email, in any letter case, is not rejected by this check.
4. A lookalike domain such as `stu.istinye.edu.tr.evil.com` is rejected.

## Tests
File: `tests/US-1-T-1_login_email.test.js`
Setup for all: start the app with an empty user store and send requests to `/api/login`.

| Test name | Setup | Asserts | Criterion |
|---|---|---|---|
| US-1-T-1 rejects a non-university email | POST `student@gmail.com` | status 400; error is "Use your university email" | 1 |
| US-1-T-1 sets no session cookie on rejection | same request | no `Set-Cookie` header | 2 |
| US-1-T-1 does not reject a stu.istinye.edu.tr email in any case | POST `student@stu.istinye.edu.tr`, then `student@STU.ISTINYE.EDU.TR` | status is not 400 for either | 3 |
| US-1-T-1 rejects a lookalike domain | POST `student@stu.istinye.edu.tr.evil.com` | status 400 | 4 |
