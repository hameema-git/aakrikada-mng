// Tiny zero-dependency web server for the Aakrikada demo. Needs only Node.js (no npm install).
// Serves ./public on port 5173, listens on all network interfaces, accepts any hostname
// (so the Cloudflare tunnel link works).
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.join(__dirname, 'public');
const PORT = Number(process.env.PORT) || 5173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.jpg': 'image/jpeg', '.webp': 'image/webp',
};
function send(res, code, type, body, extra = {}) { res.writeHead(code, { 'Content-Type': type, ...extra }); res.end(body); }
const server = http.createServer((req, res) => {
  let url;
  try { url = decodeURIComponent(req.url.split('?')[0]); } catch { return send(res, 400, 'text/plain', 'Bad request'); }
  if (url.endsWith('/')) url += 'index.html';
  const file = path.normalize(path.join(ROOT, url));
  if (!file.startsWith(ROOT)) return send(res, 403, 'text/plain', 'Forbidden');
  fs.readFile(file, (err, data) => {
    if (err) {
      if (path.extname(url)) return send(res, 404, 'text/plain', 'Not found');
      return fs.readFile(path.join(ROOT, 'index.html'), (e, d) => e ? send(res, 500, 'text/plain', 'index.html missing') : send(res, 200, TYPES['.html'], d, { 'Cache-Control': 'no-cache' }));
    }
    const ext = path.extname(file);
    const fresh = ext === '.html' || file.endsWith('sw.js') || ext === '.webmanifest';
    send(res, 200, TYPES[ext] || 'application/octet-stream', data, { 'Cache-Control': fresh ? 'no-cache' : 'public, max-age=3600' });
  });
});
// If the port is busy (for example another demo is already running), try the next ports.
function start(port, triesLeft) {
  const onListening = () => {
    server.removeListener('error', onError);
    console.log('\nAakrikada demo is running.\n');
    console.log('  On this computer:  http://localhost:' + port);
    for (const list of Object.values(os.networkInterfaces()))
      for (const n of list || []) if (n.family === 'IPv4' && !n.internal) console.log('  Same Wi-Fi phone:  http://' + n.address + ':' + port);
    console.log('\nFor a public link, open a second terminal and run:\n  cloudflared tunnel --url http://localhost:' + port + '\n');
  };
  const onError = (err) => {
    server.removeListener('listening', onListening);
    if (err.code === 'EADDRINUSE' && triesLeft > 0) {
      console.log('Port ' + port + ' is busy, trying ' + (port + 1) + ' ...');
      start(port + 1, triesLeft - 1);
    } else { throw err; }
  };
  server.once('listening', onListening);
  server.once('error', onError);
  server.listen(port, '0.0.0.0');
}
start(PORT, 10);
