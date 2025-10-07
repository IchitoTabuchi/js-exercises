/* eslint-disable @typescript-eslint/ban-types */

// node --loader ts-node/esm ch14/ex06/index.ts

type LogEntry = {
  name: string;
  args: unknown[];
  timestamp: Date;
};

export const makeProxyAndLogs = <T extends object>(
  target: T
): [T, LogEntry[]] => {
  const logs: LogEntry[] = [];
  const cache = new WeakMap<Function, Function>();

  const proxy = new Proxy(target, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value !== 'function') return value;
      if (cache.has(value)) return cache.get(value);

      const wrapped = function (this: unknown, ...args: unknown[]) {
        logs.push({ name: String(prop), args, timestamp: new Date() });
        return value.apply(target, args);
      };

      cache.set(value, wrapped);
      return wrapped;
    },
  });

  return [proxy, logs];
};
