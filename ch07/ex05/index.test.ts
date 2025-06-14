// npm test ch07/ex05

import { pop, push, shift, sort, unshift } from './index.ts';

describe('Non-destructive array operations', () => {
  const original = [1, 2, 3, 4, 5];

  it('pop: removes the last element', () => {
    expect(pop(original)).toEqual([1, 2, 3, 4]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('pop: empty array', () => {
    expect(pop([])).toEqual([]);
  });

  it('push: adds element to end', () => {
    expect(push(original, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('push: to empty array', () => {
    expect(push([], 1)).toEqual([1]);
  });

  it('shift: removes first element', () => {
    expect(shift(original)).toEqual([2, 3, 4, 5]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('shift: empty array', () => {
    expect(shift([])).toEqual([]);
  });

  it('unshift: adds element to front', () => {
    expect(unshift(original, 0)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('unshift: to empty array', () => {
    expect(unshift([], 9)).toEqual([9]);
  });

  it('sort: sorts in descending order', () => {
    const result = sort(original, (a, b) => b - a);
    expect(result).toEqual([5, 4, 3, 2, 1]);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('sort: no comparator', () => {
    expect(sort(['b', 'a', 'c'], undefined)).toEqual(['a', 'b', 'c']);
  });

  it('sort: empty array', () => {
    expect(sort([], (a, b) => (a as number) - (b as number))).toEqual([]);
  });

  it('immutability: original array remains unchanged', () => {
    const arr = [10, 20, 30];
    pop(arr);
    push(arr, 40);
    shift(arr);
    unshift(arr, 5);
    sort(arr, (a, b) => a - b);
    expect(arr).toEqual([10, 20, 30]);
  });
});
