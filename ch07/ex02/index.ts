export const fizzbuzz = (n: number) =>
  Array.from({ length: n }, (_, i) => i + 1).forEach((i) =>
    console.log([!(i % 3) ? 'Fizz' : '', !(i % 5) ? 'Buzz' : ''].join('') || i)
  );

export const sumOfSquaredDifference = (f: number[], g: number[]) =>
  f.reduce((sum, val, i) => sum + (val - g[i]) ** 2, 0);

export const sumOfEvensIsLargerThan42 = (array: number[]) =>
  array.filter((x) => !(x % 2)).reduce((sum, x) => sum + x, 0) >= 42;
