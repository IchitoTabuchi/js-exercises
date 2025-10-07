import { makeProxyAndLogs } from './index.ts';

describe('makeProxyAndLogs', () => {
  it('returns proxy and log array references', () => {
    const target = { value: 1 };
    const [proxy, logs] = makeProxyAndLogs(target);

    expect(proxy.value).toBe(1);
    expect(Array.isArray(logs)).toBe(true);
    expect(logs.length).toBe(0);
  });

  it('records method calls with name, args, and timestamp', () => {
    const target = {
      greet(name: string, punctuation: string) {
        return `Hello, ${name}${punctuation}`;
      },
    };
    const [proxy, logs] = makeProxyAndLogs(target);

    const result = proxy.greet('Alice', '!');
    expect(result).toBe('Hello, Alice!');

    expect(logs).toHaveLength(1);
    const entry = logs[0];

    expect(entry.name).toBe('greet');
    expect(entry.args).toEqual(['Alice', '!']);
    expect(entry.timestamp).toBeInstanceOf(Date);
  });

  it('preserves this binding when invoking methods', () => {
    const target = {
      base: 5,
      add(x: number) {
        return this.base + x;
      },
    };
    const [proxy, logs] = makeProxyAndLogs(target);

    expect(proxy.add(3)).toBe(8);
    expect(logs).toHaveLength(1);
    expect(logs[0].name).toBe('add');
  });

  it('reuses wrapped functions for repeated property access', () => {
    const target = {
      count() {
        return 1;
      },
    };
    const [proxy] = makeProxyAndLogs(target);

    const first = proxy.count;
    const second = proxy.count;
    expect(first).toBe(second);
  });

  it('creates a new log entry for every invocation', () => {
    const target = {
      increment(x: number) {
        return x + 1;
      },
    };
    const [proxy, logs] = makeProxyAndLogs(target);

    expect(proxy.increment(1)).toBe(2);
    expect(proxy.increment(2)).toBe(3);

    expect(logs).toHaveLength(2);
    expect(logs[0].args).toEqual([1]);
    expect(logs[1].args).toEqual([2]);
  });

  it('does not log when calling methods on the original target', () => {
    const target = {
      double(x: number) {
        return x * 2;
      },
    };
    const [, logs] = makeProxyAndLogs(target);

    expect(target.double(4)).toBe(8);
    expect(logs).toHaveLength(0);
  });

  it('handles symbol-named methods', () => {
    const sym = Symbol('work');
    const target = {
      [sym](x: number) {
        return x * x;
      },
    };
    const [proxy, logs] = makeProxyAndLogs(target);

    expect(proxy[sym](3)).toBe(9);

    expect(logs).toHaveLength(1);
    expect(logs[0].name).toBe(sym.toString());
  });

  it('logs methods returning objects without altering return value', () => {
    const target = {
      build(x: number) {
        return { value: x };
      },
    };
    const [proxy, logs] = makeProxyAndLogs(target);

    const result = proxy.build(7);
    expect(result).toEqual({ value: 7 });

    expect(logs).toHaveLength(1);
    expect(logs[0].args).toEqual([7]);
  });

  it('does not log when method property is retrieved but not invoked', () => {
    const target = {
      noop() {
        return;
      },
    };
    const [proxy, logs] = makeProxyAndLogs(target);

    const fn = proxy.noop;
    expect(typeof fn).toBe('function');
    expect(logs).toHaveLength(0);
  });
});
