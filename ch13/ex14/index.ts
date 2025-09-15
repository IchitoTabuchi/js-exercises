/**
 * 非同期処理の同時実行数を制限し、大量の非同期処理の同時実行を防ぐキュー
 * - queueSize: 待機できるPromiseの最大数
 * - maxRunningPromises: 同時に実行可能なPromiseの最大数
 * - start()/stop(): プールの開始・終了
 * - dispatch(): Promiseをキューに追加し、順次実行
 */
export class PromisePool {
  private queue: (() => Promise<void>)[] = []; // 実行待ちキュー
  private running = 0; // 現在実行中のPromise数
  private started = false; // プールが開始済みかどうか
  private resolveStop?: () => void; // stop()解決用コールバック
  private stopPromise?: Promise<void>; // stop()のPromiseを保持

  /**
   * プールを初期化
   * @param queueSize キューの最大長
   * @param maxRunningPromises 同時実行可能なPromiseの最大数
   */
  constructor(
    private queueSize: number,
    private maxRunningPromises: number
  ) {
    // queueSizeとmaxRunningPromisesは1以上
    if (queueSize < 1 || maxRunningPromises < 1)
      throw new Error('queueSize and maxRunningPromises must be >= 1');
  }

  /**
   * プールを開始
   * - start()後でないとdispatchできない
   * - すでに開始済みなら例外を投げる
   */
  async start() {
    if (this.started) throw new Error('already started');
    this.started = true;
  }

  /**
   * プールを停止
   * - すでにstopが呼ばれている場合はreject
   * - 実行中のPromiseが全て完了し、キューが空になるまで待機
   */
  async stop() {
    if (!this.started) throw new Error('not started');
    if (this.stopPromise)
      return Promise.reject(new Error('stop already called'));

    this.stopPromise = new Promise<void>((resolve) => {
      // 実行中がゼロかつキューが空なら即解決
      if (this.running === 0 && this.queue.length === 0) resolve();
      else this.resolveStop = resolve; // 終了時に resolve
    });
    return this.stopPromise;
  }

  /**
   * Promise をキューに追加する
   * - queueSize を超えていれば空きができるまで待機
   * - maxRunningPromises の制限に従い順次実行
   * @param promiseFactory Promise を返す関数
   */
  async dispatch(promiseFactory: () => Promise<void>): Promise<void> {
    if (!this.started) throw new Error('pool not started');

    // キューが満杯の場合、空きができるまで待機
    if (this.queue.length >= this.queueSize) {
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (this.queue.length < this.queueSize) {
            clearInterval(interval);
            resolve();
          }
        }, 1);
      });
    }

    return new Promise<void>((resolve, reject) => {
      const run = async () => {
        this.running++; // 実行中カウントを増やす
        try {
          await promiseFactory(); // 実際のPromiseを実行
          resolve(); // 成功時に解決
        } catch (err) {
          reject(err);
        } finally {
          this.running--; // 実行中カウントを減らす
          this.next(); // 次のキューを実行
        }
      };
      this.queue.push(run); // キューに追加
      this.next(); // 空きがあれば即実行
    });
  }

  /**
   * キューから Promise を取り出して実行
   * - maxRunningPromises の制限に従い順次実行
   * - 実行中とキューが空になったら stop() を解決
   */
  private next() {
    while (this.running < this.maxRunningPromises && this.queue.length > 0) {
      const fn = this.queue.shift()!; // キューから取得
      fn(); // 実行
    }

    // 実行中が0でキューが空ならstop()を解決
    if (this.running === 0 && this.queue.length === 0 && this.resolveStop)
      this.resolveStop();
  }
}
