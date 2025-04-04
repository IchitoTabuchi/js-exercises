// npm test ch03/ex03

import { areNumbersEqual } from './index.ts';

describe('areNumbersEqual', () => {
  test('should return true for (0.3 - 0.2, 0.1)', () => {
    expect(areNumbersEqual(0.3 - 0.2, 0.1)).toBe(true);
  });

  test('should return true for (0.2 - 0.1, 0.1)', () => {
    expect(areNumbersEqual(0.2 - 0.1, 0.1)).toBe(true);
  });

  test('should return true for (0.1 - 0.05, 0.05)', () => {
    expect(areNumbersEqual(0.1 - 0.05, 0.05)).toBe(true);
  });

  test('should return false for (0.1 - 0.05, 0.06)', () => {
    expect(areNumbersEqual(0.1 - 0.05, 0.06)).toBe(false);
  });

  test('should return false for (0.1 - 0.05, 0.04)', () => {
    expect(areNumbersEqual(0.1 - 0.05, 0.04)).toBe(false);
  });
});
