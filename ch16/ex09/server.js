import express from 'express';
import fs from 'fs';
import path from 'path';

export const serve = (rootDirectory) => {
  // http.Server の代わりに Express アプリケーションを作成
  const app = express();

  // /test/mirror エンドポイント
  app.all('/test/mirror', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    Object.entries(req.headers).forEach(([key, value]) => {
      res.write(`${key}: ${value}\r\n`);
    });
    res.write('\r\n');
    req.pipe(res);
  });

  // 静的ファイル配信
  app.use((req, res) => {
    // GETメソッドのみ処理
    if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    let filename = req.path.substring(1);
    filename = filename.replace(/\.\./g, '');
    filename = path.resolve(rootDirectory, filename);

    let type;
    switch (path.extname(filename)) {
      case '.html':
      case '.htm':
        type = 'text/html';
        break;
      case '.js':
        type = 'application/javascript';
        break;
      case '.css':
        type = 'text/css';
        break;
      case '.png':
        type = 'image/png';
        break;
      case '.txt':
        type = 'text/plain';
        break;
      default:
        type = 'application/octet-stream';
    }

    const stream = fs.createReadStream(filename);
    stream.once('readable', () => {
      res.setHeader('Content-Type', type);
      stream.pipe(res);
    });

    stream.on('error', (err) => {
      res.status(404).type('text/plain').send(err.message);
    });
  });

  return app;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = parseInt(process.argv[3]) || 8000;
  const app = serve(process.argv[2] || '/tmp');
  app.listen(port, () => console.log(`Listening on port ${port}`));
}
