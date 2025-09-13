import { resettableCounter } from './index.ts';

describe('resettableCounter', () => {
  it('increments sequentially', () => {
    const counter = resettableCounter();
    for (let i = 0; i < 5; i++) {
      expect(counter.next().value).toBe(i);
    }
  });

  it('resets after throw("reset")', () => {
    const counter = resettableCounter();
    for (let i = 0; i < 3; i++) counter.next();
    counter.throw('reset');
    // リセットしたので、再び0から始まる
    for (let i = 0; i < 4; i++) expect(counter.next().value).toBe(i);
  });

  it('throws unexpected errors', () => {
    const counter = resettableCounter();
    expect(() => counter.throw(new Error('unexpected'))).toThrow('unexpected');
  });
});
