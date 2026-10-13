# Job191 example project

An example team repository for **Job191 - Dream Data Labs AI Augmented Software Engineering**. It shows one sprint task done the way the course expects, from task spec to tagged merge.

The app is a tiny login server: `POST /api/login` with `{ "email": "..." }` signs a user in and sets a session cookie.

```bash
npm test     # runs the tests (Node 20 or later, no dependencies)
npm start    # serves the app on http://localhost:3000
```

## The example task: US-1-T-1

| Step | Where to see it |
| --- | --- |
| Task spec | [`docs/tasks/sprint-1/US-1-T-1.md`](docs/tasks/sprint-1/US-1-T-1.md) |
| Spec committed alone, first on the branch, tagged `US-1-T-1-base` | the first commit of pull request #1 |
| Implementation and tests on the same branch | [`src/app.js`](src/app.js), [`tests/US-1-T-1_login_email.test.js`](tests/US-1-T-1_login_email.test.js) |
| Pull request titled `US-1-T-1: ...`, merged with a merge commit | pull request #1 |
| Merge commit tagged `US-1-T-1-done` | the repository's tags |

The course GitHub App, **Job191 Repo Metrics**, is installed on this repository, so the task can be added on https://job191.yeterly.ai/dashboard.
