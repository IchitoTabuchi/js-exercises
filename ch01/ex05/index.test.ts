import { abs, factorial, sum } from './index.ts';

describe('math', () => {
  describe('abs', () => {
    it('returns same value when positive value given', () => {
      expect(abs(42)).toBe(42);
    });

    it('returns negated value when negative value given', () => {
      expect(abs(-42)).toBe(42);
    });

    it('returns zero value when zero given', () => {
      expect(abs(0)).toBe(0);
    });
  });

  describe('sum', () => {
    test('should return the sum of an array of numbers', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
    });

    test('should return 0 for an empty array', () => {
      expect(sum([])).toBe(0);
    });
  });

  describe('factorial', () => {
    test('should return factorial of a positive number', () => {
      expect(factorial(5)).toBe(120);
    });

    test('should return 1 for factorial of 0', () => {
      expect(factorial(0)).toBe(1);
    });

    test('should throw an error for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Negative value is not allowed');
    });
  });
});
