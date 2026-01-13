/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

// テキストのコードを写経して ESM モジュール用に import と一部コードを変換
import { fileURLToPath } from 'url';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

if (isMainThread) {
  let sharedBuffer = new SharedArrayBuffer(4); // 4バイトの共有バッファを作成
  let sharedArray = new Int32Array(sharedBuffer); // 共有バッファをInt32Arrayとして扱う
  let worker = new Worker(fileURLToPath(import.meta.url), {
    workerData: sharedBuffer,
  });

  worker.on('online', () => {
    for (let i = 0; i < 10_000_000; i++) {
      Atomics.add(sharedArray, 0, 1); // 第一引数: 対象の配列、第二引数: インデックス、第三引数: 加算する値
    }

    worker.on('message', (message) => {
      console.log(Atomics.load(sharedArray, 0)); // 第一引数: 対象の配列、第二引数: インデックス
    });
  });
} else {
  let sharedArray = new Int32Array(workerData);
  for (let i = 0; i < 10_000_000; i++) {
    Atomics.add(sharedArray, 0, 1); // 第一引数: 対象の配列、第二引数: インデックス、第三引数: 加算する値
  }
  parentPort.postMessage('done');
}
