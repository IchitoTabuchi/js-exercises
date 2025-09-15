import { readdir, stat } from 'node:fs';
import { promisify } from 'node:util';

// -----------------------------
// Promiseコンストラクタによる変換
// -----------------------------

// fs.readdir: ディレクトリ内のファイル一覧を取得する関数
export const readdirPromise = (path, options) => {
  return new Promise((resolve, reject) => {
    readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files); // 成功: ファイル一覧を返す
    });
  });
};

// fs.stat: ファイルやディレクトリの情報を取得する関数
export const statPromise = (path, options) => {
  return new Promise((resolve, reject) => {
    stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats); // 成功: fs.Statsオブジェクトを返す
    });
  });
};

// ----------------------
// promisify関数による変換
// ----------------------

// util.promisifyを使用すると、上記と同様の変換を自動で行える。
export const readdirPromisified = promisify(readdir);
export const statPromisified = promisify(stat);
