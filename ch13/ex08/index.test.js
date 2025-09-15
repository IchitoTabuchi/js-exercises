import * as fs from 'fs';
import * as fsp from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { fetchFirstFileSizeAsync, fetchSumOfFileSizesAsync } from '.';

/*
 * 問題文のコード
 */

function fetchFirstFileSize(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }
    if (files.length === 0) {
      callback(null, null);
      return;
    }

    fs.stat(join(path, files[0]), (err, stats) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, stats.size);
    });
  });
}

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

const fetchFirstFileSizeCb = (p) =>
  new Promise((resolve, reject) => {
    fetchFirstFileSize(p, (err, size) => {
      if (err) return reject(err);
      resolve(size);
    });
  });

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

describe('callback vs async', () => {
  let tmpDir;

  beforeAll(async () => {
    tmpDir = await fsp.mkdtemp(join(tmpdir(), 'test-'));
    await fsp.writeFile(join(tmpDir, 'a.txt'), 'aaaaa');
    await fsp.writeFile(join(tmpDir, 'b.txt'), 'bbbbb');
  });

  afterAll(async () => await fsp.rm(tmpDir, { recursive: true, force: true }));

  const cases = [
    ['fetchFirstFileSize', fetchFirstFileSizeCb, fetchFirstFileSizeAsync],
    ['fetchSumOfFileSizes', fetchSumOfFileSizesCb, fetchSumOfFileSizesAsync],
  ];

  for (const [name, cbFn, promiseFn] of cases) {
    test(`${name} returns the same result`, async () => {
      const resultCb = await cbFn(tmpDir);
      const resultPromise = await promiseFn(tmpDir);
      expect(resultCb).toEqual(resultPromise);
    });
  }
});
