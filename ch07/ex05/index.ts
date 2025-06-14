// node --loader ts-node/esm ch07/ex05/index.ts

export const pop = <T>(arr: T[]): T[] => arr.slice(0, -1);

export const push = <T>(arr: T[], value: T): T[] => [...arr, value];

export const shift = <T>(arr: T[]): T[] => arr.slice(1);

export const unshift = <T>(arr: T[], value: T): T[] => [value, ...arr];

export const sort = <T>(
  arr: T[],
  compareFn: ((a: T, b: T) => number) | undefined
): T[] => [...arr].sort(compareFn);

const seq = [1, 2, 3, 4, 5];

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]
