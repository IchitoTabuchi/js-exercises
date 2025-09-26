export class PromisePool {
    #queueSize;
    #maxRunningPromises;
    #started = false;
    #runningPromises = 0;
    #queues = [];
    #blocked = [];
    #all = Promise.resolve();
    constructor(queueSize, maxRunningPromises) {
        if (queueSize < 1) {
            throw new Error("invalid queueSize");
        }
        if (maxRunningPromises < 1) {
            throw new Error("invalid numberOfPromises");
        }
        this.#queueSize = queueSize;
        this.#maxRunningPromises = maxRunningPromises;
    }
    async start() {
        if (this.#started) {
            throw new Error("already started");
        }
        this.#started = true;
    }
    async stop() {
        if (!this.#started) {
            throw new Error("not started");
        }
        this.#started = false;
        return this.#all;
    }
    async dispatch(promiseFactory) {
        if (!this.#started) {
            throw new Error("not started");
        }
        if (this.#runningPromises < this.#maxRunningPromises) {
            const p = promiseFactory()
                .catch(() => { })
                .then(() => this.#enqueue());
            this.#all = this.#all.then(() => p);
            this.#runningPromises++;
            return Promise.resolve();
        }
        if (this.#queues.length < this.#queueSize) {
            this.#queues.push(promiseFactory);
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this.#blocked.push([promiseFactory, resolve]);
        });
    }
    #enqueue() {
        this.#runningPromises--;
        while (this.#queues.length > 0 &&
            this.#runningPromises < this.#maxRunningPromises) {
            const fn = this.#queues.shift();
            const p = fn()
                .catch(() => { })
                .then(() => this.#enqueue());
            this.#all = this.#all.then(() => p);
            this.#runningPromises++;
            while (this.#blocked.length > 0 &&
                this.#queues.length < this.#queueSize) {
                const [factory, resolve] = this.#blocked.shift();
                const p = factory()
                    .catch(() => { })
                    .then(() => this.#enqueue());
                this.#all = this.#all.then(() => p);
                this.#runningPromises++;
                resolve();
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5zd2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5zd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxXQUFXO0lBQ3RCLFVBQVUsQ0FBUztJQUNuQixtQkFBbUIsQ0FBUztJQUU1QixRQUFRLEdBQVksS0FBSyxDQUFDO0lBQzFCLGdCQUFnQixHQUFXLENBQUMsQ0FBQztJQUM3QixPQUFPLEdBQTRCLEVBQUUsQ0FBQztJQUN0QyxRQUFRLEdBQXdDLEVBQUUsQ0FBQztJQUNuRCxJQUFJLEdBQWtCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUV4QyxZQUFZLFNBQWlCLEVBQUUsa0JBQTBCO1FBQ3ZELElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQztJQUNoRCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUs7UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSTtRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFD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