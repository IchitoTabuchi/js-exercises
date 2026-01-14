import fs from 'fs';
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
    expect(res.status).toBe(404);
  });

  it('txtファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.txt');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/plain');
    expect(res.text).toBe('Hello, World!');
  });

  it('HTMLファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.html');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/html');
    expect(res.text).toBe('<html><body>Test</body></html>');
  });

  it('JavaScriptファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.js');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('application/javascript');
    expect(res.text).toBe('console.log("test");');
  });

  it('CSSファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.css');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/css');
    expect(res.text).toBe('body { margin: 0; }');
  });

  it('PNGファイルが正しく配信されること', async () => {
    const res = await request(app).get('/test.png');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('image/png');
    expect(res.body).toBeInstanceOf(Buffer);
  });

  it('存在しないファイルにアクセスすると404を返すこと', async () => {
    const res = await request(app).get('/nonexistent.txt');
    expect(res.status).toBe(404);
    expect(res.text).toMatch(/ENOENT/);
  });

  it('ディレクトリトラバーサル攻撃が防がれていること', async () => {
    const res = await request(app).get('/../etc/passwd');
    expect(res.status).toBe(404);
  });

  it('GETメソッド以外でファイルアクセスすると405を返すこと', async () => {
    const res = await request(app).post('/test.txt');
    expect(res.status).toBe(405);
    expect(res.text).toMatch(/Method Not Allowed/);
  });

  it('PUTメソッドでファイルアクセスすると405を返すこと', async () => {
    const res = await request(app).put('/test.txt').send('data');
    expect(res.status).toBe(405);
  });

  it('DELETEメソッドでファイルアクセスすると405を返すこと', async () => {
    const res = await request(app).delete('/test.txt');
    expect(res.status).toBe(405);
  });

  // /test/mirror エンドポイントのテスト
  it('/test/mirror GETリクエストのヘッダーを返すこと', async () => {
    const res = await request(app)
      .get('/test/mirror')
      .set('X-Custom-Header', 'test-value');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/plain; charset=utf-8');
    expect(res.text).toMatch(/GET \/test\/mirror HTTP/);
    expect(res.text).toMatch(/x-custom-header: test-value/);
  });

  it('/test/mirror POSTリクエストのボディを返すこと', async () => {
    const testData = 'This is test data';
    const res = await request(app).post('/test/mirror').send(testData);

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/POST \/test\/mirror HTTP/);
    expect(res.text).toMatch(new RegExp(testData));
  });

  it('/test/mirror PUTリクエストのボディを返すこと', async () => {
    const res = await request(app).put('/test/mirror').send('PUT test data');

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/PUT \/test\/mirror HTTP/);
  });

  it('/test/mirror DELETEリクエストも処理すること', async () => {
    const res = await request(app).delete('/test/mirror');

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/DELETE \/test\/mirror HTTP/);
  });
});
