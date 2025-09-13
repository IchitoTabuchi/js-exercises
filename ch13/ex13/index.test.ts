/* eslint-disable no-irregular-whitespace */
import * as fs from 'fs/promises';
import { tmpdir } from 'os';
import * as path from 'path';
import { walk } from './index.ts';

describe('walk (async generator)', () => {
  let testDir: string;

  beforeAll(async () => {
    // 一時ディレクトリを作成
    testDir = await fs.mkdtemp(path.join(tmpdir(), 'walk-test-'));

    // NOTE: walk に与えたパスが以下のようなディレクトリ・ファイルを持つ時を考える
    // .
    // ├── A
    // ├── B
    // │   └── C
    // │       └── buz.txt
    // └── foo.txt
    //
    // この時 `walk` は以下を返す (順序は任意):
    // - { path: "A", isDirectory: true }
    // - { path: "B", isDirectory: true }
    // - { path: "B/C", isDirectory: true }
    // - { path: "B/C/buz.txt", isDirectory: false }
    // - { path: "foo.txt", isDirectory: false }

    // ディレクトリ構造を作成
    await fs.mkdir(path.join(testDir, 'A'));
    await fs.mkdir(path.join(testDir, 'B'));
    await fs.mkdir(path.join(testDir, 'B', 'C'));
    await fs.writeFile(path.join(testDir, 'foo.txt'), 'foo');
    await fs.writeFile(path.join(testDir, 'B', 'C', 'buz.txt'), 'buz');
  });

  afterAll(async () => {
    await fs.rm(testDir, { recursive: true, force: true });
  });

  it('should return all entries recursively', async () => {
    const entries: { path: string; isDirectory: boolean }[] = [];

    for await (const entry of walk(testDir)) {
      const relativePath = path.relative(testDir, entry.path) || '.';
      entries.push({ path: relativePath, isDirectory: entry.isDirectory });
    }

    const withoutRoot = entries.filter((e) => e.path !== '.');

    const expected = [
      { path: 'A', isDirectory: true },
      { path: 'B', isDirectory: true },
      { path: path.join('B', 'C'), isDirectory: true },
      { path: path.join('B', 'C', 'buz.txt'), isDirectory: false },
      { path: 'foo.txt', isDirectory: false },
    ];

    // 順序は任意なので、sortして比較する
    const sortFn = (a: { path: string }, b: { path: string }) =>
      a.path.localeCompare(b.path);

    expect(withoutRoot.sort(sortFn)).toEqual(expected.sort(sortFn));
  });
});
