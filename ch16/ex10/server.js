/* eslint-disable prefer-const */

// テキストのコードを写経・改造してPUTメソッドでファイルアップロードに対応
import fs from 'fs';
import http from 'http';
import path from 'path';
import { URL } from 'url';

function serve(rootDirectory, port) {
  let server = new http.Server();
  server.listen(port);
  console.log('Listening on port', port);

  server.on('request', (request, response) => {
    let endpoint = new URL(request.url, `http://localhost:${port}`).pathname;
    if (endpoint === '/test/mirror') {
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.write(
        `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
      );
      let headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }
      response.write('\r\n');
      request.pipe(response);
    } else if (request.method === 'PUT') {
      // PUTメソッドでファイルアップロード
      let filename = endpoint.substring(1);
      filename = filename.replace(/\.\./g, ''); // ディレクトリ・トラバーサル対策
      filename = path.resolve(rootDirectory, filename); // ルートディレクトリ以下に保存

      // ディレクトリが存在しない場合は作成
      const dir = path.dirname(filename);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // ストリームで書き込み
      const writeStream = fs.createWriteStream(filename);
      request.pipe(writeStream);

      writeStream.on('finish', () => {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.writeHead(201);
        response.end('File uploaded successfully');
      });
      writeStream.on('error', (err) => {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.writeHead(500);
        response.end(`Upload failed: ${err.message}`);
      });
    } else if (request.method === 'GET') {
      // GETメソッドでファイル取得
      let filename = endpoint.substring(1);
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

      let stream = fs.createReadStream(filename);
      stream.once('readable', () => {
        response.setHeader('Content-Type', type);
        response.writeHead(200);
        stream.pipe(response);
      });

      stream.on('error', (err) => {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.writeHead(404);
        response.end(err.message);
      });
    } else {
      // その他のメソッドは405
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.writeHead(405);
      response.end('Method Not Allowed');
    }
  });
}

serve(process.argv[2] || '/tmp', parseInt(process.argv[3]) || 8000);
