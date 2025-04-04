export const areNumbersEqual = (
  a: number,
  b: number,
  epsilon: number = 1e-10
): boolean => Math.abs(a - b) < epsilon;
