import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.xml': 'application/xml', '.txt': 'text/plain' };
const port = Number(process.env.PORT || 4173);
createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found'); }
}).listen(port, () => console.log(`Preview: http://localhost:${port}/`));
