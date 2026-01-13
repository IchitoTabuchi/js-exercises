import net from 'net';

const PORT = 8080;

// 問題文の HTML
const indexHTML = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

// HTTPレスポンスを作成する関数
const createResponse = (status, body, contentType = 'text/html') =>
  `HTTP/1.1 ${status}\r\nContent-Type: ${contentType}; charset=UTF-8\r\nContent-Length: ${Buffer.byteLength(body)}\r\nConnection: close\r\n\r\n${body}`;

// HTTPリクエストをパースする関数
const parseRequest = (data) => {
  const lines = data.split('\r\n');
  const [method, path] = lines[0].split(' ');
  const bodyStart = lines.indexOf('') + 1;
  const body = lines.slice(bodyStart).join('\r\n');
  return { method, path, body };
};

// サーバーの作成
const server = net.createServer((socket) => {
  let data = '';

  // クライアントからのデータ受信
  socket.on('data', (chunk) => {
    data += chunk;

    // リクエストの終端を検出
    if (data.includes('\r\n\r\n')) {
      const { method, path, body } = parseRequest(data); // メソッド、パス、ボディを取得
      let response;

      if (method === 'GET' && path === '/')
        response = createResponse('200 OK', indexHTML); // GET / の場合は、フォームを返す
      else if (method === 'POST' && path === '/greeting') {
        // POST /greeting の場合は、フォームデータを処理して応答を返す
        const params = new URLSearchParams(body);
        const name = params.get('name') || 'Guest';
        const greeting = params.get('greeting') || 'Hello';
        response = createResponse(
          '200 OK',
          `<!doctype html><html lang="ja"><head><meta charset="UTF-8" /><title>Response</title></head><body><h1>${greeting}, ${name}!</h1><p>Name: ${name}</p><p>Greeting: ${greeting}</p><a href="/">Back</a></body></html>`
        );
      } else if (path === '/' || path === '/greeting') {
        response = createResponse(
          '405 Method Not Allowed',
          '<h1>405 Method Not Allowed</h1>'
        );
      } else
        response = createResponse('404 Not Found', '<h1>404 Not Found</h1>');

      socket.write(response);
      socket.end();
    }
  });
});

// サーバーの起動
server.listen(PORT, () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
);
