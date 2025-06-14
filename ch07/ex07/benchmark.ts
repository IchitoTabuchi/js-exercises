// node --loader ts-node/esm ch07/ex07/benchmark.ts

////////////////////////////////////
// ソートアルゴリズムの実行時間比較 //
////////////////////////////////////

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

const benchmarkSorts = (arraySize: number, trials = 1): void => {
  const randomArray = Array.from({ length: arraySize }, () =>
    Math.floor(Math.random() * 10000)
  );

  for (const [name, sortFn] of Object.entries(sortingFunctions)) {
    for (let t = 0; t < trials; t++) {
      const array = [...randomArray];
      const label = `${name} (trial ${t + 1})`;
      console.time(label);
      sortFn(array, defaultCompare);
      console.timeEnd(label);
    }
  }
};

benchmarkSorts(100000);
