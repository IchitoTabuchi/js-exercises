import { primes } from './index.ts';

describe('primes generator', () => {
  it('generates the first 10 primes correctly', () => {
    const gen = primes();
    const expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
    for (let i = 0; i < expected.length; i++) {
      expect(gen.next().value).toBe(expected[i]);
    }
  });

  it('continues to generate primes beyond 10', () => {
    const gen = primes();
    const primes20: number[] = [];
    for (let i = 0; i < 20; i++) primes20.push(gen.next().value as number);
    expect(primes20[19]).toBe(71); // 20番目の素数は71
  });
});
