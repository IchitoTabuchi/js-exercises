// npm test ch05/ex05

import { f } from './index.ts';

describe('f', () => {
  it('returns an object with only even values', () => {
    const input = { x: 1, y: 2, z: 3, w: 4 };
    const result = f(input);
    expect(result).toEqual({ y: 2, w: 4 });
  });

  it('returns an empty object if no values are even', () => {
    const input = { a: 1, b: 3, c: 5 };
    const result = f(input);
    expect(result).toEqual({});
  });

  it('returns the same object if all values are even', () => {
    const input = { a: 2, b: 4, c: 6 };
    const result = f(input);
    expect(result).toEqual(input);
    expect(result).not.toBe(input);
  });

  it('returns an empty object for an empty input object', () => {
    const input = {};
    const result = f(input);
    expect(result).toEqual({});
  });

  it('does not mutate the original object', () => {
    const input = { a: 2, b: 3 };
    const copy = { ...input };
    f(input);
    expect(input).toEqual(copy);
  });
});
