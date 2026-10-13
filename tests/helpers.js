import { createApp } from "../src/app.js";

/** Starts the app with an empty user store on a free port. Call `close()` when done. */
export async function startApp() {
  const server = createApp({ users: new Map() });
  await new Promise((resolve) => server.listen(0, resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    login: (email) => fetch(`${base}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }),
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}
