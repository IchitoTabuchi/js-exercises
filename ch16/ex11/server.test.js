import { spawn } from 'child_process';
import net from 'net';
import assert from 'node:assert';
import { after, before, describe, it } from 'node:test';

const PORT = 8080;
const HOST = '127.0.0.1';
let serverProcess;

// サーバーを起動
before(async () => {
  serverProcess = spawn('node', ['server.js'], {
    cwd: import.meta.dirname,
    stdio: 'pipe',
  });

  // サーバーが起動するまで待機
  await new Promise((resolve) => {
    serverProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Server running')) resolve();
    });
  });
});

// サーバーを終了
after(() => {
  if (serverProcess) serverProcess.kill();
});

// HTTPリクエスト送信用ヘルパー関数
const sendRequest = (method, path, body = '') =>
  new Promise((resolve, reject) => {
    const socket = net.connect(PORT, HOST);
    let response = '';
    socket.on('connect', () => {
      const headers = [
        `${method} ${path} HTTP/1.1`,
        `Host: ${HOST}`,
        `Content-Length: ${Buffer.byteLength(body)}`,
        'Connection: close',
        '',
        body,
      ].join('\r\n');
      socket.write(headers);
    });
    socket.on('data', (chunk) => (response += chunk.toString()));
    socket.on('end', () => resolve(response));
    socket.on('error', (err) => reject(err));
  });

describe('HTTP Server', () => {
  it('GET / が HTML フォームを返すこと', async () => {
    const response = await sendRequest('GET', '/');
    assert.ok(response.includes('HTTP/1.1 200 OK'));
    assert.ok(response.includes('<form'));
    assert.ok(response.includes('action="/greeting"'));
    assert.ok(response.includes('name="name"'));
    assert.ok(response.includes('name="greeting"'));
  });

  it('POST /greeting が結果の HTML を返すこと', async () => {
    const body = 'name=ポチ&greeting=Hello';
    const response = await sendRequest('POST', '/greeting', body);
    assert.ok(response.includes('HTTP/1.1 200 OK'));
    assert.ok(response.includes('Hello, ポチ!'));
    assert.ok(response.includes('Name: ポチ'));
    assert.ok(response.includes('Greeting: Hello'));
  });

  it('GET /notfound が 404 を返すこと', async () => {
    const response = await sendRequest('GET', '/notfound');
    assert.ok(response.includes('HTTP/1.1 404 Not Found'));
    assert.ok(response.includes('404 Not Found'));
  });

  it('DELETE / が 405 を返すこと', async () => {
    const response = await sendRequest('DELETE', '/');
    assert.ok(response.includes('HTTP/1.1 405 Method Not Allowed'));
    assert.ok(response.includes('405 Method Not Allowed'));
  });

  it('POST / が 405 を返すこと', async () => {
    const response = await sendRequest('POST', '/');
    assert.ok(response.includes('HTTP/1.1 405 Method Not Allowed'));
  });

  it('GET /greeting が 405 を返すこと', async () => {
    const response = await sendRequest('GET', '/greeting');
    assert.ok(response.includes('HTTP/1.1 405 Method Not Allowed'));
  });
});
