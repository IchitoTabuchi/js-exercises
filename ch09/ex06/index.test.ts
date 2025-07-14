import { TypedMap } from './index.ts';

describe('TypedMap', () => {
  test('constructs with valid entries', () => {
    const map = new TypedMap<string, number>('string', 'number', [['a', 1]]);
    expect(map.get('a')).toBe(1);
  });

  test('throws on invalid key type in constructor', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new TypedMap<string, number>('string', 'number', [[123 as any, 1]]);
    }).toThrow('Wrong type for entry');
  });

  test('throws on invalid value type in constructor', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new TypedMap<string, number>('string', 'number', [['a', 'x' as any]]);
    }).toThrow('Wrong type for entry');
  });

  test('set and get with correct types', () => {
    const map = new TypedMap<string, number>('string', 'number');
    map.set('x', 42);
    expect(map.get('x')).toBe(42);
  });

  test('throws on invalid key type in set', () => {
    const map = new TypedMap<string, number>('string', 'number');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => map.set(123 as any, 42)).toThrow('is not of type string');
  });

  test('throws on invalid value type in set', () => {
    const map = new TypedMap<string, number>('string', 'number');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => map.set('key', 'value' as any)).toThrow(
      'is not of type number'
    );
  });

  test('has returns true after set', () => {
    const map = new TypedMap<string, number>('string', 'number');
    map.set('exists', 1);
    expect(map.has('exists')).toBe(true);
  });

  test('size reflects number of entries', () => {
    const map = new TypedMap<string, number>('string', 'number');
    expect(map.size).toBe(0);
    map.set('a', 1);
    map.set('b', 2);
    expect(map.size).toBe(2);
  });

  test('supports iteration', () => {
    const map = new TypedMap<string, number>('string', 'number', [
      ['a', 1],
      ['b', 2],
    ]);
    const entries = Array.from(map);
    expect(entries).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });
});
