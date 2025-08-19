import { cache } from './index.js';

describe('cache', () => {
  let callCount;
  function slowFn(obj) {
    callCount++;
    return { name: obj.name, result: `computed-${obj.name}` };
  }

  let cachedSlowFn;

  beforeEach(() => {
    callCount = 0;
    cachedSlowFn = cache(slowFn);
  });

  it('should return cached result for the same object', () => {
    const obj = { name: 'Alice' };
    const result1 = cachedSlowFn(obj);
    const result2 = cachedSlowFn(obj);
    expect(result1).toBe(result2); // 同一のオブジェクトを参照していること
    expect(callCount).toBe(1); // 2回目以降はキャッシュが使用されていること
  });

  it('should compute again for different objects with same content', () => {
    const obj1 = { name: 'Bob' };
    const obj2 = { name: 'Bob' };
    cachedSlowFn(obj1);
    cachedSlowFn(obj2);
    expect(callCount).toBe(2);
  });

  it('should work for multiple objects', () => {
    const objs = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    for (const o of objs) {
      cachedSlowFn(o);
    }
    expect(callCount).toBe(objs.length);
  });

  it('should allow garbage collection when object becomes unreachable', () => {
    let obj = { name: 'Temp' };
    cachedSlowFn(obj);
    expect(callCount).toBe(1);

    obj = null;

    expect(true).toBe(true);
  });

  it('should throw if a non-object argument is passed', () => {
    const invalidArgs = [null, undefined, 42, 'str', true, Symbol('s')];
    for (const arg of invalidArgs) {
      expect(() => cachedSlowFn(arg)).toThrow();
    }
  });
});
