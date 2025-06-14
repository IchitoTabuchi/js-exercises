// npm test ch06/ex02

import {
  fizzbuzz,
  sumOfEvensIsLargerThan42,
  sumOfSquaredDifference,
} from './index.ts';

describe('fizzbuzz', () => {
  it('prints correct sequence for n = 15', () => {
    const output: (string | number)[] = [];
    const log = console.log;
    console.log = (val) => output.push(val);

    fizzbuzz(15);

    expect(output).toEqual([
      1,
      2,
      'Fizz',
      4,
      'Buzz',
      'Fizz',
      7,
      8,
      'Fizz',
      'Buzz',
      11,
      'Fizz',
      13,
      14,
      'FizzBuzz',
    ]);

    console.log = log;
  });

  it('prints nothing for n = 0', () => {
    const output: (string | number)[] = [];
    const log = console.log;
    console.log = (val) => output.push(val);

    fizzbuzz(0);

    expect(output).toEqual([]);

    console.log = log;
  });
});

describe('sumOfSquaredDifference', () => {
  it('returns 0 for identical arrays', () => {
    expect(sumOfSquaredDifference([1, 2, 3], [1, 2, 3])).toBe(0);
  });

  it('calculates squared difference correctly', () => {
    expect(sumOfSquaredDifference([1, 2, 3], [4, 5, 6])).toBe(27);
  });

  it('works with negative numbers', () => {
    expect(sumOfSquaredDifference([-1, -2], [-1, 2])).toBe(16);
  });

  it('returns 0 for empty arrays', () => {
    expect(sumOfSquaredDifference([], [])).toBe(0);
  });
});

describe('sumOfEvensIsLargerThan42', () => {
  it('returns true when sum of evens >= 42', () => {
    expect(sumOfEvensIsLargerThan42([10, 12, 20])).toBe(true);
    expect(sumOfEvensIsLargerThan42([50, 2])).toBe(true);
  });

  it('returns false when sum of evens < 42', () => {
    expect(sumOfEvensIsLargerThan42([1, 2, 3, 4])).toBe(false);
  });

  it('returns false for all odd numbers', () => {
    expect(sumOfEvensIsLargerThan42([1, 3, 5, 7])).toBe(false);
  });

  it('returns false for empty array', () => {
    expect(sumOfEvensIsLargerThan42([])).toBe(false);
  });

  it('works with negative even numbers', () => {
    expect(sumOfEvensIsLargerThan42([-50, -10, 100])).toBe(false);
    expect(sumOfEvensIsLargerThan42([-50, -10])).toBe(false);
  });
});
