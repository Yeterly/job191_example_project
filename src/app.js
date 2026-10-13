import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

/** Reads a JSON request body; resolves to null when it is missing or invalid. */
function readJson(request) {
  return new Promise((resolve) => {
    let body = "";
    request.on("data", (chunk) => { body += chunk; });
    request.on("end", () => {
      try { resolve(JSON.parse(body)); } catch { resolve(null); }
    });
  });
}

function sendJson(response, status, payload, headers = {}) {
  response.writeHead(status, { "Content-Type": "application/json", ...headers });
  response.end(JSON.stringify(payload));
}

/** The app: POST /api/login signs a user in by email and sets a session cookie. */
export function createApp({ users = new Map() } = {}) {
  return createServer(async (request, response) => {
    if (request.method !== "POST" || request.url !== "/api/login") {
      sendJson(response, 404, { error: "Not found" });
      return;
    }
    const body = await readJson(request);
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    if (!email.includes("@")) {
      sendJson(response, 400, { error: "Enter an email address" });
      return;
    }
    const key = email.toLowerCase();
    if (!users.has(key)) users.set(key, { email: key });
    const session = randomUUID();
    sendJson(response, 200, { email: key }, { "Set-Cookie": `session=${session}; HttpOnly; Path=/; SameSite=Lax` });
  });
}
