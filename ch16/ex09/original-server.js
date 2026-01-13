/* eslint-disable prefer-const */

// テキスト P772-673 のコードを写経
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
    } else {
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
    }
  });
}

serve(process.argv[2] || '/tmp', parseInt(process.argv[3]) || 8000);
