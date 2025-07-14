import { PositiveNumber } from './index.ts';

describe('PositiveNumber', () => {
  it('should create an object with positive number', () => {
    const pn = PositiveNumber(5);
    expect(pn.getX()).toBe(5);
  });

  it('should throw error if initialized with zero', () => {
    expect(() => PositiveNumber(0)).toThrow('require : x > 0');
  });

  it('should throw error if initialized with negative number', () => {
    expect(() => PositiveNumber(-10)).toThrow('require : x > 0');
  });

  it('should update value with setX for positive number', () => {
    const pn = PositiveNumber(3);
    pn.setX(7);
    expect(pn.getX()).toBe(7);
  });

  it('should throw error if setX is called with zero', () => {
    const pn = PositiveNumber(2);
    expect(() => pn.setX(0)).toThrow('require : x > 0');
  });

  it('should throw error if setX is called with negative number', () => {
    const pn = PositiveNumber(2);
    expect(() => pn.setX(-5)).toThrow('require : x > 0');
  });

  it('should allow setting to a different positive number', () => {
    const pn = PositiveNumber(1);
    pn.setX(100);
    expect(pn.getX()).toBe(100);
  });

  it('should allow setting to a positive float', () => {
    const pn = PositiveNumber(1.5);
    pn.setX(2.7);
    expect(pn.getX()).toBe(2.7);
  });

  it('should throw error if setX is called with NaN', () => {
    const pn = PositiveNumber(1);
    expect(() => pn.setX(NaN)).toThrow('require : x > 0');
  });

  it('should throw error if initialized with NaN', () => {
    expect(() => PositiveNumber(NaN)).toThrow('require : x > 0');
  });
});
