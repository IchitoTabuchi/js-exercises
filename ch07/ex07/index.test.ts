// npm test ch07/ex07

import {
  bubbleSort,
  heapSort,
  mergeSort,
  quickSort,
  selectionSort,
} from './index.ts';

const sortingFunctions = {
  bubbleSort,
  selectionSort,
  heapSort,
  quickSort,
  mergeSort,
};

const defaultCompare = (a: number, b: number) => a - b;

describe.each(Object.entries(sortingFunctions))('%s', (_name, sortFn) => {
  it('should sort an unsorted array', () => {
    expect(sortFn([5, 2, 4, 1, 3], defaultCompare)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return empty array as is', () => {
    expect(sortFn([], defaultCompare)).toEqual([]);
  });

  it('should return single element array as is', () => {
    expect(sortFn([42], defaultCompare)).toEqual([42]);
  });

  it('should handle array with duplicate values', () => {
    expect(sortFn([3, 3, 1, 2, 2], defaultCompare)).toEqual([1, 2, 2, 3, 3]);
  });

  it('should handle already sorted array', () => {
    expect(sortFn([1, 2, 3, 4, 5], defaultCompare)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle reverse sorted array', () => {
    expect(sortFn([5, 4, 3, 2, 1], defaultCompare)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should support custom compare function for descending order', () => {
    const descCompare = (a: number, b: number) => b - a;
    expect(sortFn([1, 2, 3, 4, 5], descCompare)).toEqual([5, 4, 3, 2, 1]);
  });

  it('should not modify the original array', () => {
    const arr = [3, 1, 2];
    const copy = [...arr];
    sortFn(arr, defaultCompare);
    expect(arr).toEqual(copy);
  });
});
