import * as fs from 'fs';
import * as fsp from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { fetchSumOfFileSizesPromiseAll } from '.';

/*
 * 問題文のコード
 */

function fetchSumOfFileSizes(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }

    let total = 0;
    const rest = [...files];

    function iter() {
      if (rest.length === 0) {
        callback(null, total);
        return;
      }

      const next = rest.pop();
      fs.stat(join(path, next), (err, stats) => {
        if (err) {
          callback(err);
          return;
        }
        total += stats.size;
        iter();
      });
    }
    iter();
  });
}

/*
 * 問題文のコードをPromise化したコード (node:fs/promisesとの比較用)
 */

const fetchSumOfFileSizesCb = (p) =>
  new Promise((resolve, reject) => {
    fetchSumOfFileSizes(p, (err, total) => {
      if (err) return reject(err);
      resolve(total);
    });
  });

/*
 * テストコード
 */

describe('callback vs PromiseAll', () => {
  let tmpDir;

  beforeAll(async () => {
    tmpDir = await fsp.mkdtemp(join(tmpdir(), 'test-'));
    await fsp.writeFile(join(tmpDir, 'a.txt'), 'aaaaa');
    await fsp.writeFile(join(tmpDir, 'b.txt'), 'bbbbb');
  });

  afterAll(async () => await fsp.rm(tmpDir, { recursive: true, force: true }));

  test(`fetchSumOfFileSizes returns the same result`, async () => {
    const resultCb = await fetchSumOfFileSizesCb(tmpDir);
    const resultPromise = await fetchSumOfFileSizesPromiseAll(tmpDir);
    expect(resultCb).toEqual(resultPromise);
  });
});
