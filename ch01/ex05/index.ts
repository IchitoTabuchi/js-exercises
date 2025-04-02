export const abs = (n: number): number => (n < 0 ? -n : n);

export const sum = (arr: number[]): number =>
  arr.reduce((acc, crr) => acc + crr, 0);

export const factorial = (n: number): number => {
  if (n < 0) throw new Error('Negative value is not allowed');
  return !n ? 1 : n * factorial(n - 1);
};
