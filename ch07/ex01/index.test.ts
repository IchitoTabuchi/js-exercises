// npm test ch06/ex01

import { add, multiply } from './index.ts';

describe('add', () => {
  it('adds two 2x2 matrices', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    expect(add(a, b)).toEqual([
      [6, 8],
      [10, 12],
    ]);
  });

  it('adds two 1x1 matrices', () => {
    expect(add([[1]], [[2]])).toEqual([[3]]);
  });

  it('adds two empty matrices', () => {
    expect(add([], [])).toEqual([]);
  });

  it('throws on size mismatch (rows)', () => {
    const a = [[1, 2]];
    const b = [
      [1, 2],
      [3, 4],
    ];
    expect(() => add(a, b)).toThrow();
  });

  it('throws on size mismatch (columns)', () => {
    const a = [[1, 2]];
    const b = [[1]];
    expect(() => add(a, b)).toThrow();
  });

  it('throws on inconsistent row lengths in A', () => {
    const a = [[1, 2], [3]];
    const b = [
      [4, 5],
      [6, 7],
    ];
    expect(() => add(a, b)).toThrow();
  });

  it('throws on inconsistent row lengths in B', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [[5], [6, 7]];
    expect(() => add(a, b)).toThrow();
  });
});

describe('multiply', () => {
  it('multiplies two 2x2 matrices', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    expect(multiply(a, b)).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });

  it('multiplies 2x3 and 3x1 matrices', () => {
    const a = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const b = [[1], [2], [3]];
    expect(multiply(a, b)).toEqual([[14], [32]]);
  });

  it('multiplies 1x3 and 3x3 matrices', () => {
    const a = [[1, 2, 3]];
    const b = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    expect(multiply(a, b)).toEqual([[1, 2, 3]]);
  });

  it("throws when A's columns != B's rows", () => {
    const a = [[1, 2]];
    const b = [[1, 2]];
    expect(() => multiply(a, b)).toThrow();
  });

  it('throws when matrix A has inconsistent row sizes', () => {
    const a = [[1, 2], [3]];
    const b = [[4], [5]];
    expect(() => multiply(a, b)).toThrow();
  });

  it('throws when matrix B has inconsistent row sizes', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [[5], [6, 7]];
    expect(() => multiply(a, b)).toThrow();
  });

  it('returns empty matrix when multiplying two empty matrices', () => {
    expect(multiply([], [])).toEqual([]);
  });

  it('returns empty matrix when A is empty and B is compatible', () => {
    const a: number[][] = [];
    const b = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(multiply(a, b)).toEqual([]);
  });

  it('throws when A is not empty but B is empty', () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b: number[][] = [];
    expect(() => multiply(a, b)).toThrow();
  });
});
