import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { startApp } from "./helpers.js";

let app;
before(async () => { app = await startApp(); });
after(() => app.close());

test("US-1-T-1 rejects a non-university email", async () => {
  const response = await app.login("student@gmail.com");
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Use your university email" });
});

test("US-1-T-1 sets no session cookie on rejection", async () => {
  const response = await app.login("student@gmail.com");
  assert.equal(response.headers.get("set-cookie"), null);
});

test("US-1-T-1 does not reject a stu.istinye.edu.tr email in any case", async () => {
  for (const email of ["student@stu.istinye.edu.tr", "student@STU.ISTINYE.EDU.TR"]) {
    const response = await app.login(email);
    assert.notEqual(response.status, 400, email);
  }
});

test("US-1-T-1 rejects a lookalike domain", async () => {
  const response = await app.login("student@stu.istinye.edu.tr.evil.com");
  assert.equal(response.status, 400);
});
