// npm test ch05/ex04

import { fibonacciDoWhile, fibonacciFor, fibonacciWhile } from './index.ts';

const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

describe('Fibonacci sequence generators', () => {
  it('fibonacciWhile returns the first 10 Fibonacci numbers', () => {
    expect(fibonacciWhile()).toEqual(expected);
  });

  it('fibonacciDoWhile returns the first 10 Fibonacci numbers', () => {
    expect(fibonacciDoWhile()).toEqual(expected);
  });

  it('fibonacciFor returns the first 10 Fibonacci numbers', () => {
    expect(fibonacciFor()).toEqual(expected);
  });

  it('all methods return arrays of length 10', () => {
    expect(fibonacciWhile()).toHaveLength(10);
    expect(fibonacciDoWhile()).toHaveLength(10);
    expect(fibonacciFor()).toHaveLength(10);
  });

  it('first two values are 1 and 1 in all implementations', () => {
    expect(fibonacciWhile().slice(0, 2)).toEqual([1, 1]);
    expect(fibonacciDoWhile().slice(0, 2)).toEqual([1, 1]);
    expect(fibonacciFor().slice(0, 2)).toEqual([1, 1]);
  });
});
