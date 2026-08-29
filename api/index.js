// Vercel Node.js Function using the Web-standard `fetch` handler shape
// (https://vercel.com/docs/functions/functions-api-reference#fetch-web-standard-handler).
//
// This project's TanStack Start server entry (src/server.ts) already
// compiles to exactly that shape — `export default { fetch(request, env, ctx) }`
// — so this file just re-exports the build output straight through. The
// build (`vite build`, see vercel.json) runs before this function is
// bundled, so dist/server/server.js and its chunks already exist on disk
// by the time Vercel traces this import.
import handler from "../dist/server/server.js";

export default handler;
