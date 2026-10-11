import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const types = { ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml", ".ico": "image/x-icon" };
createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = resolve(root, `.${path}`);
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    try { if ((await stat(file)).isDirectory()) file = resolve(file, "index.html"); } catch { /* Resolve missing routes with the exported 404 below. */ }
    let body;
    try { body = await readFile(file); } catch { file = resolve(root, "404.html"); body = await readFile(file); response.statusCode = 404; }
    response.setHeader("Content-Type", types[extname(file)] || "application/octet-stream");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.end(request.method === "HEAD" ? undefined : body);
  } catch { response.writeHead(400).end("Unable to serve this request."); }
}).listen(port, "127.0.0.1", () => console.log(`TZ GEMS preview: http://127.0.0.1:${port}`));
