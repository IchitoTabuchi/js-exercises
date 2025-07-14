import { any, catching } from './index.ts';

describe('any', () => {
  const isEven = (n: number) => n % 2 === 0;
  const isNegative = (n: number) => n < 0;
  const isZero = (n: number) => n === 0;

  it('returns true if any predicate matches', () => {
    const fn = any(isEven, isNegative);
    expect(fn(2)).toBe(true);
    expect(fn(-1)).toBe(true);
  });

  it('returns false if no predicate matches', () => {
    const fn = any(isEven, isNegative);
    expect(fn(1)).toBe(false);
    expect(fn(3)).toBe(false);
  });

  it('returns false for empty predicates array', () => {
    const fn = any<number>();
    expect(fn(1)).toBe(false);
    expect(fn(0)).toBe(false);
  });

  it('works with one predicate', () => {
    const fn = any(isZero);
    expect(fn(0)).toBe(true);
    expect(fn(1)).toBe(false);
  });

  it('works with different types', () => {
    const isString = (x: unknown) => typeof x === 'string';
    const isNull = (x: unknown) => x === null;
    const fn = any(isString, isNull);
    expect(fn('hello')).toBe(true);
    expect(fn(null)).toBe(true);
    expect(fn(42)).toBe(false);
  });
});

describe('catching', () => {
  it('returns result if no error is thrown', () => {
    const fn = catching(
      (x: number) => x * 2,
      () => 'error'
    );
    expect(fn(3)).toBe(6);
  });

  it('returns errorHandler result if error is thrown', () => {
    const fn = catching(
      () => {
        throw new Error('fail');
      },
      () => 'caught'
    );
    expect(fn(0)).toBe('caught');
  });

  it('passes error object to errorHandler', () => {
    const fn = catching(
      () => {
        throw new TypeError('bad');
      },
      (e) => e instanceof TypeError
    );
    expect(fn(0)).toBe(true);
  });

  it('works with undefined errorHandler return', () => {
    const fn = catching(
      () => {
        throw 'oops';
      },
      () => undefined
    );
    expect(fn(0)).toBeUndefined();
  });

  it('works with functions that return undefined', () => {
    const fn = catching(
      () => undefined,
      () => 'error'
    );
    expect(fn(0)).toBeUndefined();
  });

  it('works with functions that throw non-Error values', () => {
    const fn = catching(
      () => {
        throw 123;
      },
      (e) => e
    );
    expect(fn(0)).toBe(123);
  });
});
