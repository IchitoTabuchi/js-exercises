import { powLoop, powRecursive } from './index.ts';

const testCases = [
  { base: 2, exp: 3, result: 8 },
  { base: 5, exp: 0, result: 1 },
  { base: 7, exp: 1, result: 7 },
  { base: 3, exp: 4, result: 81 },
  { base: 10, exp: 0, result: 1 },
  { base: -2, exp: 0, result: 1 },
  { base: -2, exp: 3, result: -8 },
  { base: -2, exp: 2, result: 4 },
  { base: 2, exp: 10, result: 1024 },
];

describe('powRecursive', () => {
  testCases.forEach(({ base, exp, result }) => {
    it(`powRecursive(${base}, ${exp}) should be ${result}`, () => {
      expect(powRecursive(base, exp)).toBe(result);
    });
  });
});

describe('powLoop', () => {
  testCases.forEach(({ base, exp, result }) => {
    it(`powLoop(${base}, ${exp}) should be ${result}`, () => {
      expect(powLoop(base, exp)).toBe(result);
    });
  });
});
