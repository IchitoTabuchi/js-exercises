// npm test ch04/ex03

import { sub } from './index.ts';

describe('sub(a, b) using bitwise operations only', () => {
  it('sub(8, 3) returns 5', () => {
    expect(sub(8, 3)).toBe(5);
  });

  it('sub(10, 7) returns 3', () => {
    expect(sub(10, 7)).toBe(3);
  });

  it('sub(100, 50) returns 50', () => {
    expect(sub(100, 50)).toBe(50);
  });

  // either is 0
  it('sub(0, 0) returns 0', () => {
    expect(sub(0, 0)).toBe(0);
  });

  it('sub(0, 5) returns -5', () => {
    expect(sub(0, 5)).toBe(-5);
  });

  it('sub(5, 0) returns 5', () => {
    expect(sub(5, 0)).toBe(5);
  });

  // either is negative number
  it('sub(3, 8) returns -5', () => {
    expect(sub(3, 8)).toBe(-5);
  });

  it('sub(-3, 8) returns -11', () => {
    expect(sub(-3, 8)).toBe(-11);
  });

  it('sub(8, -3) returns 11', () => {
    expect(sub(8, -3)).toBe(11);
  });

  // both are negative numbers
  it('sub(-5, -3) returns -2', () => {
    expect(sub(-5, -3)).toBe(-2);
  });

  it('sub(-3, -5) returns 2', () => {
    expect(sub(-3, -5)).toBe(2);
  });

  // large numbers
  it('sub(2**30, 2**29) returns 2**29', () => {
    expect(sub(2 ** 30, 2 ** 29)).toBe(2 ** 29);
  });

  it('sub(2**31 - 1, 1) returns 2**31 - 2', () => {
    expect(sub(2 ** 31 - 1, 1)).toBe(2 ** 31 - 2);
  });

  // same number
  it('sub(12345, 12345) returns 0', () => {
    expect(sub(12345, 12345)).toBe(0);
  });
});
