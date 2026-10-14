---
id: US-1-T-2
story: US-1
sprint: 1
assignee: Muratcan Çiçek
estimate_hours: 3
---

# Show the signed-in user at /api/me

## Description
Serves US-1 (log in with a university email). After a successful login, the session cookie must identify the user, so the app can show who is signed in. This task adds that lookup. Rejecting non-university emails (US-1-T-1) and keeping sessions across server restarts (US-1-T-3) are out of scope.

## Specs
- A successful `POST /api/login` remembers which email its session cookie belongs to.
- `GET /api/me` with that session cookie returns HTTP 200 and `{ "email": "<email>" }`, with the email in lowercase.
- `GET /api/me` with no session cookie, or with a session the server does not know, returns HTTP 401 and `{ "error": "Not signed in" }`.
- Sessions live in server memory. They are lost when the server restarts.

## Requirements
- Use the existing login handler and its session cookie. Do not add a second cookie.
- No new runtime dependencies.
- Existing login tests, including US-1-T-1's, must keep passing.

## Acceptance criteria
1. After logging in, `GET /api/me` with the session cookie returns HTTP 200 and the signed-in email.
2. The email returned is lowercase, even if the login used capital letters.
3. `GET /api/me` without a session cookie returns HTTP 401 and the message "Not signed in".
4. `GET /api/me` with an unknown session returns HTTP 401.

## Tests
File: `tests/US-1-T-2_me.test.js`
Setup for all: start the app with an empty user store.

| Test name | Setup | Asserts | Criterion |
|---|---|---|---|
| US-1-T-2 returns the signed-in email | log in as `student@stu.istinye.edu.tr`, then GET `/api/me` with its cookie | status 200; email is `student@stu.istinye.edu.tr` | 1 |
| US-1-T-2 returns the email in lowercase | log in as `Student@STU.ISTINYE.EDU.TR`, then GET `/api/me` with its cookie | email is `student@stu.istinye.edu.tr` | 2 |
| US-1-T-2 refuses a request without a session | GET `/api/me` with no cookie | status 401; error is "Not signed in" | 3 |
| US-1-T-2 refuses an unknown session | GET `/api/me` with `session=unknown` | status 401 | 4 |
