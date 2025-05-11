// npm test ch04/ex04

import { bitCount } from './index.ts';

describe('bitCount', () => {
  it('should return the number of 1 bits in 0b111', () => {
    expect(bitCount(0b111)).toBe(3);
  });

  it('should return 31 for 0b1111111111111111111111111111111', () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });

  it('should return 0 for 0b0', () => {
    expect(bitCount(0b0)).toBe(0);
  });

  it('should return 1 for 0b1', () => {
    expect(bitCount(0b1)).toBe(1);
  });

  it('should return 32 for -1 (all bits are 1 in 32-bit signed integer)', () => {
    expect(bitCount(-1)).toBe(32);
  });

  it('should return 8 for 0b1010101010101010', () => {
    expect(bitCount(0b1010101010101010)).toBe(8);
  });
});
