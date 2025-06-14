type Matrix = number[][];

const isSameShape = (a: number[][], b: number[][]): boolean =>
  a.length === b.length &&
  a.every(
    (row, i) => row.length === a[0].length && row.length === b[i]?.length
  );

export const add = (a: Matrix, b: Matrix): Matrix => {
  if (!isSameShape(a, b)) throw new Error('Matrix dimensions are invalid');

  return a.map((row, i) => row.map((val, j) => val + b[i][j]));
};

const canMultiply = (a: number[][], b: number[][]): boolean =>
  a.every((row) => row.length === a[0].length) &&
  b.every((row) => row.length === b[0].length) &&
  (a.length === 0 || b.length === 0 || a[0].length === b.length);

export const multiply = (a: Matrix, b: Matrix): Matrix => {
  if (!canMultiply(a, b)) throw new Error('Matrix dimensions are invalid');

  return a.map((row) =>
    b[0].map((_, j) => row.reduce((sum, val, k) => sum + val * b[k][j], 0))
  );
};
