import fs from 'fs';
import assert from 'node:assert';
import { afterEach, beforeEach, describe, it } from 'node:test';
import path from 'path';
import request from 'supertest';
import { serve } from './server.js';

describe('Express HTTP Server', () => {
  let testDir;
  let app;

  beforeEach(() => {
    // テスト用ディレクトリを作成
    testDir = fs.mkdtempSync('/tmp/test-');
    app = serve(testDir);

    // テスト用ファイルを作成
    fs.writeFileSync(path.join(testDir, 'test.txt'), 'Hello, World!');
    fs.writeFileSync(
      path.join(testDir, 'test.html'),
      '<html><body>Test</body></html>'
    );
    fs.writeFileSync(path.join(testDir, 'test.js'), 'console.log("test");');
    fs.writeFileSync(path.join(testDir, 'test.css'), 'body { margin: 0; }');
    fs.writeFileSync(
      path.join(testDir, 'test.png'),
      Buffer.from(
        '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c6300010000050001d1c7c8d40000000049454e44ae426082',
        'hex'
      )
    );
  });

  afterEach(() => {
    // テスト用ディレクトリを削除
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  // 静的ファイル配信のテスト
  it('存在しないファイルにGETリクエストすると404を返すこと', async () => {
    const res = await request(app).get('/');
    assert.strictEqual(res.status, 404);
  });

  it('txtファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.txt');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers['content-type'], 'text/plain');
    assert.strictEqual(res.text, 'Hello, World!');
  });

  it('HTMLファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.html');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers['content-type'], 'text/html');
    assert.strictEqual(res.text, '<html><body>Test</body></html>');
  });

  it('JavaScriptファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.js');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers['content-type'], 'application/javascript');
    assert.strictEqual(res.text, 'console.log("test");');
  });

  it('CSSファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.css');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers['content-type'], 'text/css');
    assert.strictEqual(res.text, 'body { margin: 0; }');
  });

  it('PNGファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.png');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers['content-type'], 'image/png');
    assert.ok(res.body instanceof Buffer);
  });

  it('存在しないファイルにアクセスすると404を返すこと', async () => {
    const res = await request(app).get('/nonexistent.txt');
    assert.strictEqual(res.status, 404);
    assert.match(res.text, /ENOENT/);
  });

  it('ディレクトリトラバーサル攻撃が防がれていること', async () => {
    const res = await request(app).get('/../etc/passwd');
    assert.strictEqual(res.status, 404);
  });

  it('GETメソッド以外でファイルアクセスすると405を返すこと', async () => {
    const res = await request(app).post('/test.txt');
    assert.strictEqual(res.status, 405);
    assert.match(res.text, /Method Not Allowed/);
  });

  it('PUTメソッドでファイルアクセスすると405を返すこと', async () => {
    const res = await request(app).put('/test.txt').send('data');
    assert.strictEqual(res.status, 405);
  });

  it('DELETEメソッドでファイルアクセスすると405を返すこと', async () => {
    const res = await request(app).delete('/test.txt');
    assert.strictEqual(res.status, 405);
  });

  // /test/mirror エンドポイントのテスト
  it('/test/mirror GETリクエストのヘッダーを返すこと', async () => {
    const res = await request(app)
      .get('/test/mirror')
      .set('X-Custom-Header', 'test-value');

    assert.strictEqual(res.status, 200);
    assert.strictEqual(
      res.headers['content-type'],
      'text/plain; charset=utf-8'
    );
    assert.match(res.text, /GET \/test\/mirror HTTP/);
    assert.match(res.text, /x-custom-header: test-value/);
  });

  it('/test/mirror POSTリクエストのボディを返すこと', async () => {
    const testData = 'This is test data';
    const res = await request(app).post('/test/mirror').send(testData);

    assert.strictEqual(res.status, 200);
    assert.match(res.text, /POST \/test\/mirror HTTP/);
    assert.match(res.text, new RegExp(testData));
  });

  it('/test/mirror PUTリクエストのボディを返すこと', async () => {
    const res = await request(app).put('/test/mirror').send('PUT test data');

    assert.strictEqual(res.status, 200);
    assert.match(res.text, /PUT \/test\/mirror HTTP/);
  });

  it('/test/mirror DELETEリクエストも処理すること', async () => {
    const res = await request(app).delete('/test/mirror');

    assert.strictEqual(res.status, 200);
    assert.match(res.text, /DELETE \/test\/mirror HTTP/);
  });
});
