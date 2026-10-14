import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { startApp } from "./helpers.js";

let app;
before(async () => { app = await startApp(); });
after(() => app.close());

/** Logs in and returns the `session=...` cookie to send back. */
async function sessionCookie(email) {
  const response = await app.login(email);
  assert.equal(response.status, 200);
  return (response.headers.get("set-cookie") ?? "").split(";")[0];
}

test("US-1-T-2 returns the signed-in email", async () => {
  const response = await app.me(await sessionCookie("student@stu.istinye.edu.tr"));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { email: "student@stu.istinye.edu.tr" });
});

test("US-1-T-2 returns the email in lowercase", async () => {
  const response = await app.me(await sessionCookie("Student@STU.ISTINYE.EDU.TR"));
  assert.deepEqual(await response.json(), { email: "student@stu.istinye.edu.tr" });
});

test("US-1-T-2 refuses a request without a session", async () => {
  const response = await app.me();
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: "Not signed in" });
});

test("US-1-T-2 refuses an unknown session", async () => {
  const response = await app.me("session=unknown");
  assert.equal(response.status, 401);
});
