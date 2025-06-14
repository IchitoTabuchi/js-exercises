import { DynamicSizeArray } from './index.ts';

describe('DynamicSizeArray', () => {
  it('should push and get values', () => {
    const arr = new DynamicSizeArray<number>();
    arr.push(10);
    arr.push(20);
    expect(arr.length()).toBe(2);
    expect(arr.get(0)).toBe(10);
    expect(arr.get(1)).toBe(20);
  });

  it('should throw on get/set out of bounds', () => {
    const arr = new DynamicSizeArray<string>();
    expect(() => arr.get(0)).toThrow();
    expect(() => arr.set(0, 'x')).toThrow();
  });

  it('should grow when full', () => {
    const arr = new DynamicSizeArray<number>();
    for (let i = 0; i < 10; i++) {
      arr.push(i * 2);
    }
    expect(arr.length()).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(arr.get(i)).toBe(i * 2);
    }
  });

  it('should set and get values after pushing', () => {
    const arr = new DynamicSizeArray<string>();
    arr.push('a');
    arr.push('b');
    arr.set(1, 'z');
    expect(arr.get(1)).toBe('z');
  });

  it('should throw when getting unset value in underlying fixed array', () => {
    const arr = new DynamicSizeArray<number>();
    arr.push(1);
    expect(() => {
      (arr as any).array.get(1);
    }).toThrow('Value at index 1 is undefined');
  });

  it('should reject negative indices', () => {
    const arr = new DynamicSizeArray<number>();
    expect(() => arr.get(-1)).toThrow();
    expect(() => arr.set(-1, 1)).toThrow();
  });
});
