#!/usr/bin/env node
// Static file server with HTTP/1.1 + Range request support (needed for video streaming)
const http = require('http');
const fs   = require('fs');
const path = require('path');
const url  = require('url');

const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jsx':  'application/javascript',
  '.svg':  'image/svg+xml',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.mov':  'video/quicktime',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
};

function dirListing(dirPath, urlPath, res) {
  fs.readdir(dirPath, (err, names) => {
    if (err) { res.writeHead(500); res.end(); return; }
    names.sort();
    const links = names.map(n => {
      const enc   = encodeURIComponent(n);
      const isDir = fs.statSync(path.join(dirPath, n)).isDirectory();
      return `<li><a href="${enc}${isDir ? '/' : ''}">${n}${isDir ? '/' : ''}</a></li>`;
    }).join('\n');
    const body = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Directory listing for ${urlPath}</title></head>
<body><h1>Directory listing for ${urlPath}</h1><hr><ul>${links}</ul><hr></body></html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': Buffer.byteLength(body) });
    res.end(body);
  });
}

function serveFile(filePath, stat, req, res) {
  const ext  = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  const size = stat.size;

  const rangeHeader = req.headers['range'];
  if (rangeHeader) {
    const m = rangeHeader.match(/bytes=(\d*)-(\d*)/);
    if (!m) { res.writeHead(416); res.end(); return; }

    const start = m[1] ? parseInt(m[1], 10) : 0;
    const end   = m[2] ? parseInt(m[2], 10) : size - 1;
    const clamp = Math.min(end, size - 1);
    const len   = clamp - start + 1;

    if (start > clamp || start >= size) { res.writeHead(416); res.end(); return; }

    res.writeHead(206, {
      'Content-Type':   mime,
      'Content-Range':  `bytes ${start}-${clamp}/${size}`,
      'Content-Length': len,
      'Accept-Ranges':  'bytes',
    });
    fs.createReadStream(filePath, { start, end: clamp }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Type':   mime,
      'Content-Length': size,
      'Accept-Ranges':  'bytes',
    });
    fs.createReadStream(filePath).pipe(res);
  }
}

const server = http.createServer((req, res) => {
  const parsed   = url.parse(req.url);
  const pathname = decodeURIComponent(parsed.pathname).replace(/\.\./g, '');
  const filePath = path.join(ROOT, pathname);

  fs.stat(filePath, (err, stat) => {
    if (err) {
      // SPA fallback: extensionless paths are client-side routes → serve index.html
      if (!path.extname(filePath)) {
        const index = path.join(ROOT, 'index.html');
        return serveFile(index, fs.statSync(index), req, res);
      }
      res.writeHead(404); res.end('Not found'); return;
    }

    if (stat.isDirectory()) {
      const index = path.join(filePath, 'index.html');
      if (fs.existsSync(index)) {
        return serveFile(index, fs.statSync(index), req, res);
      }
      return dirListing(filePath, pathname, res);
    }

    serveFile(filePath, stat, req, res);
  });
});

function tryListen(port) {
  server.listen(port, () => {
    console.log(`\nGrove & Stone dev server → http://localhost:${port}`);
    console.log('HTTP/1.1 + Range requests enabled — videos will stream properly\n');
  });

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      server.close();
      tryListen(port + 1);
    } else {
      throw err;
    }
  });
}

tryListen(parseInt(process.env.PORT || '8234', 10));
