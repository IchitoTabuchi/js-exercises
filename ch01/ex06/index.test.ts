import { fib } from './index.ts';

describe('fib', () => {
  test('should return the nth Fibonacci number', () => {
    expect(fib(0)).toBe(0);
    expect(fib(1)).toBe(1);
    expect(fib(5)).toBe(5);
    expect(fib(10)).toBe(55);
    expect(fib(75)).toBe(2111485077978050);
  });

  test('should throw an error for negative numbers', () => {
    expect(() => fib(-1)).toThrow('Negative value is not allowed');
  });
});
