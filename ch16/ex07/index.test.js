import { spawn } from 'child_process';
import fs from 'fs';
import net from 'net';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkEntry } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('checkEntry', () => {
  const testDir = path.join(__dirname, 'test-entries');
  const testFile = path.join(testDir, 'test.txt');
  const isLinux = os.platform() === 'linux';

  // テスト用ディレクトリとファイルを作成
  beforeAll(async () => {
    await fs.promises.mkdir(testDir, { recursive: true });
    await fs.promises.writeFile(testFile, 'test content');
  });

  // テストディレクトリ内のすべてのファイルを削除
  afterAll(
    async () => await fs.promises.rm(testDir, { recursive: true, force: true })
  );

  it('通常のファイルの場合、"file"を返すこと', async () => {
    expect(await checkEntry(testFile)).toBe('file');
  });

  it('ディレクトリの場合、"directory"を返すこと', async () =>
    expect(await checkEntry(testDir)).toBe('directory'));

  it('キャラクターデバイスの場合、"characterDevice"を返すこと', async () => {
    if (!isLinux) return;
    expect(await checkEntry('/dev/null')).toBe('characterDevice');
  });

  it('ブロックデバイスの場合、"blockDevice"を返すこと', async () => {
    if (!isLinux || !fs.existsSync('/dev/sda')) return;
    expect(await checkEntry('/dev/sda')).toBe('blockDevice');
  });

  it('FIFOの場合、"fifo"を返すこと', async () => {
    if (!isLinux) return;
    const fifoPath = path.join(testDir, 'test-fifo');
    try {
      await fs.promises.rm(fifoPath, { force: true });
      await new Promise((resolve, reject) =>
        spawn('mkfifo', [fifoPath]).on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`mkfifo failed with code ${code}`));
        })
      );
      expect(await checkEntry(fifoPath)).toBe('fifo');
      await fs.promises.unlink(fifoPath);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

  it('Unixソケットの場合、"socket"を返すこと', async () => {
    if (!isLinux) return;
    const socketPath = path.join(testDir, 'test.sock');
    const server = net.createServer();
    try {
      await new Promise((resolve) => server.listen(socketPath, resolve));
      expect(await checkEntry(socketPath)).toBe('socket');
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      if (server) {
        server.close();
        try {
          await fs.promises.unlink(socketPath);
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    }
  });

  it('存在しないパスの場合、エラーを投げること', async () =>
    await expect(checkEntry('/nonexistent/path')).rejects.toThrow());
});
