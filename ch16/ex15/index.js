/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

// テキストのコードを写経して ESM モジュール用に import と一部コードを変換
import { fileURLToPath } from 'url';
import { Worker, isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
  let num = 0; // 1. sharedArray を number 型の変数 num にする
  let worker = new Worker(fileURLToPath(import.meta.url));
  let workerCompleted = false;
  let mainCompleted = false;

  // サブスレッドからのインクリメント要求を受信
  worker.on('message', (message) => {
    if (message === 'increment') num++;
    else if (message === 'done') {
      workerCompleted = true;
      if (mainCompleted) console.log(num); // メインスレッドの処理も完了していれば結果を出力
    }
  });

  // メインスレッドの処理開始
  worker.on('online', () => {
    for (let i = 0; i < 10_000_000; i++) num++; // 2. Atomic.addの 代わりに num をインクリメント
    mainCompleted = true;
    if (workerCompleted) console.log(num); // サブスレッドの処理も完了していれば結果を出力
  });
} else {
  for (let i = 0; i < 10_000_000; i++) parentPort.postMessage('increment'); // 3. Atomic.add 代わりにメッセージを送信
  parentPort.postMessage('done');
}
