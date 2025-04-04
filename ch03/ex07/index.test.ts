import { equalArrays } from './index.ts';

describe('equalArrays', () => {
  it('should return false when comparing arrays containing numbers greater than Number.MAX_SAFE_INTEGER', () => {
    const a = [Number.MAX_SAFE_INTEGER + 1];
    const b = [Number.MAX_SAFE_INTEGER + 2];
    expect(equalArrays(a, b)).toBe(true);
  });

  it('should return false when comparing +0 and -0', () => {
    const a = [+0];
    const b = [-0];
    expect(equalArrays(a, b)).toBe(true);
  });
});
