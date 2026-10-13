import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { startApp } from "./helpers.js";

let app;
before(async () => { app = await startApp(); });
after(() => app.close());

test("login signs in a user and sets a session cookie", async () => {
  const response = await app.login("student@stu.istinye.edu.tr");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("set-cookie") ?? "", /^session=/);
});

test("login rejects a value that is not an email", async () => {
  const response = await app.login("not-an-email");
  assert.equal(response.status, 400);
});
