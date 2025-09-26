import { fibonacciIterator, fibonacciSequence } from './index.ts';

const compareFib = (n: number): boolean => {
  const gen = fibonacciSequence();
  const iter = fibonacciIterator();

  for (let i = 0; i < n; i++) {
    const g = gen.next().value;
    const it = iter.next().value;
    if (g !== it) return false;
  }
  return true;
};

describe('fibonacciSequence vs fibonacciIterator', () => {
  const cases = [0, 1, 20, 100];

  for (const n of cases)
    test(`should return true for n=${n}`, () => {
      expect(compareFib(n)).toBe(true);
    });
});

// フィボナッチ数列の配列を使用して、fibonacciIterator自体が正しい値を返すかテストするのが正しい。
// fibonacciSequenceが間違っている可能性もあるため。
