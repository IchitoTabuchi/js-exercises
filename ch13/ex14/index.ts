export class PromisePool {
  private readonly queueSize: number;
  private readonly maxRunning: number;
  private started = false;
  private running = 0;
  private queue: {
    promiseFactory: () => Promise<void>;
    resolve: () => void;
    reject: (err: unknown) => void;
  }[] = [];
  private stopPromise: Promise<void> | null = null;
  private stopResolve: (() => void) | null = null;

  constructor(queueSize: number, maxRunningPromises: number) {
    if (queueSize < 1 || maxRunningPromises < 1) 
      throw new Error("queueSize and maxRunningPromises must be >= 1");
    
    this.queueSize = queueSize;
    this.maxRunning = maxRunningPromises;
  }

  async start() {
    if (this.started) 
      return Promise.reject(new Error("Pool already started"));
    
    this.started = true;
    this.stopPromise = new Promise<void>((resolve) => {
      this.stopResolve = resolve;
    });
  }

  async stop() {
    if (!this.started) 
      return Promise.reject(new Error("Pool not started"));
    
    await this.stopPromise;
  }

  async dispatch(promiseFactory: () => Promise<void>): Promise<void> {
    if (!this.started) 
      return Promise.reject(new Error("Pool not started"));

    return new Promise<void>((resolve, reject) => {
      const task = { promiseFactory, resolve, reject };

      if (this.queue.length >= this.queueSize) {
        reject(new Error("Queue is full"));
        return;
      }

      this.queue.push(task);
      this.tryRun();
    });
  }

  private tryRun() {
    while (this.running < this.maxRunning && this.queue.length > 0) {
      const task = this.queue.shift()!;
      this.running++;

      task
        .promiseFactory()
        .then(() => task.resolve())
        .catch((err) => task.reject(err))
        .finally(() => {
          this.running--;
          this.tryRun();

          if (this.running === 0 && this.queue.length === 0) {
            this.stopResolve?.();
          }
        });
    }
  }
}
