import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { walk } from './index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('walk', () => {
  const rootDir = path.join(__dirname, 'walk_test');

  beforeAll(() => {
    // テスト用ディレクトリ構成
    fs.mkdirSync(rootDir, { recursive: true });
    fs.writeFileSync(path.join(rootDir, 'file1.txt'), 'file1');
    fs.mkdirSync(path.join(rootDir, 'dir1'));
    fs.writeFileSync(path.join(rootDir, 'dir1', 'file2.txt'), 'file2');
    fs.mkdirSync(path.join(rootDir, 'dir1', 'subdir1'));
    fs.writeFileSync(
      path.join(rootDir, 'dir1', 'subdir1', 'file3.txt'),
      'file3'
    );
    fs.mkdirSync(path.join(rootDir, 'dir2'));
  });

  afterAll(() => {
    const deleteRecursive = (p: string) => {
      for (const entry of fs.readdirSync(p)) {
        const fullPath = path.join(p, entry);
        if (fs.statSync(fullPath).isDirectory()) deleteRecursive(fullPath);
        else fs.unlinkSync(fullPath);
      }
      fs.rmdirSync(p);
    };
    deleteRecursive(rootDir);
  });

  it('yields all files and directories recursively', () => {
    const results: Array<{ path: string; isDirectory: boolean }> = [];
    for (const entry of walk(rootDir)) results.push(entry);

    const expected = [
      { path: rootDir, isDirectory: true }, // ルートディレクトリ
      { path: path.join(rootDir, 'file1.txt'), isDirectory: false },
      { path: path.join(rootDir, 'dir1'), isDirectory: true },
      { path: path.join(rootDir, 'dir1', 'file2.txt'), isDirectory: false },
      { path: path.join(rootDir, 'dir1', 'subdir1'), isDirectory: true },
      {
        path: path.join(rootDir, 'dir1', 'subdir1', 'file3.txt'),
        isDirectory: false,
      },
      { path: path.join(rootDir, 'dir2'), isDirectory: true },
    ];

    // 順不同の場合はソートして比較
    const sortByPath = (a: { path: string }, b: { path: string }) =>
      a.path.localeCompare(b.path);

    expect(results.sort(sortByPath)).toEqual(expected.sort(sortByPath));
  });

  it('all entries have correct isDirectory property', () => {
    for (const entry of walk(rootDir)) {
      const stats = fs.statSync(entry.path);
      expect(entry.isDirectory).toBe(stats.isDirectory());
    }
  });

  it('does not yield anything outside the directory', () => {
    for (const entry of walk(rootDir)) {
      expect(entry.path.startsWith(rootDir)).toBe(true);
    }
  });
});
