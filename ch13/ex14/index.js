// Poolライブラリ（https://www.npmjs.com/package/p-limit）が存在するので、
// 業務では自力実装ではなく、これを使用するのがよい。
/**
 * 非同期処理の同時実行数を制限し、大量の非同期処理の同時実行を防ぐキュー
 * - queueSize: 待機できるPromiseの最大数
 * - maxRunningPromises: 同時に実行可能なPromiseの最大数
 * - start()/stop(): プールの開始・終了
 * - dispatch(): Promiseをキューに追加し、順次実行
 */
export class PromisePool {
    queueSize;
    maxRunningPromises;
    queue = []; // 実行待ちキュー
    running = 0; // 現在実行中のPromise数
    started = false; // プールが開始済みかどうか
    resolveStop; // stop()解決用コールバック
    stopPromise; // stop()のPromiseを保持
    /**
     * プールを初期化
     * @param queueSize キューの最大長
     * @param maxRunningPromises 同時実行可能なPromiseの最大数
     */
    constructor(queueSize, maxRunningPromises) {
        this.queueSize = queueSize;
        this.maxRunningPromises = maxRunningPromises;
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
        if (this.started)
            throw new Error('already started');
        this.started = true;
    }
    /**
     * プールを停止
     * - すでにstopが呼ばれている場合はreject
     * - 実行中のPromiseが全て完了し、キューが空になるまで待機
     */
    async stop() {
        if (!this.started)
            throw new Error('not started');
        if (this.stopPromise)
            return Promise.reject(new Error('stop already called'));
        this.stopPromise = new Promise((resolve) => {
            // 実行中がゼロかつキューが空なら即解決
            if (this.running === 0 && this.queue.length === 0)
                resolve();
            else
                this.resolveStop = resolve; // 終了時に resolve
        });
        return this.stopPromise;
    }
    /**
     * Promise をキューに追加する
     * - queueSize を超えていれば空きができるまで待機
     * - maxRunningPromises の制限に従い順次実行
     * @param promiseFactory Promise を返す関数
     */
    async dispatch(promiseFactory) {
        if (!this.started)
            throw new Error('pool not started');
        // キューが満杯の場合、空きができるまで待機
        if (this.queue.length >= this.queueSize) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (this.queue.length < this.queueSize) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 1);
            });
        }
        return new Promise((resolve, reject) => {
            const run = async () => {
                this.running++; // 実行中カウントを増やす
                try {
                    await promiseFactory(); // 実際のPromiseを実行
                    resolve(); // 成功時に解決
                }
                catch (err) {
                    reject(err);
                }
                finally {
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
    next() {
        while (this.running < this.maxRunningPromises && this.queue.length > 0) {
            const fn = this.queue.shift(); // キューから取得
            fn(); // 実行
        }
        // 実行中が0でキューが空ならstop()を解決
        if (this.running === 0 && this.queue.length === 0 && this.resolveStop)
            this.resolveStop();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFDM0QsNEJBQTRCO0FBRTVCOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBYVo7SUFDQTtJQWJGLEtBQUssR0FBNEIsRUFBRSxDQUFDLENBQUMsVUFBVTtJQUMvQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO0lBQzlCLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxlQUFlO0lBQ2hDLFdBQVcsQ0FBYyxDQUFDLGtCQUFrQjtJQUM1QyxXQUFXLENBQWlCLENBQUMsb0JBQW9CO0lBRXpEOzs7O09BSUc7SUFDSCxZQUNVLFNBQWlCLEVBQ2pCLGtCQUEwQjtRQUQxQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBUTtRQUVsQyxtQ0FBbUM7UUFDbkMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLGtCQUFrQixHQUFHLENBQUM7WUFDekMsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLEtBQUs7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxDQUFDLFdBQVc7WUFDbEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztRQUUxRCxJQUFJ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