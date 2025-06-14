// npm test ch06/ex11

import { PolarPoint } from './index.ts';

describe('PolarPoint', () => {
  it('should return correct x and y from r and theta', () => {
    const p = new PolarPoint(1, Math.PI / 4);
    expect(p.x).toBeCloseTo(Math.SQRT1_2);
    expect(p.y).toBeCloseTo(Math.SQRT1_2);
  });

  it('should update r and theta when x is set', () => {
    const p = new PolarPoint(1, 0);
    p.x = 3;
    expect(p.r).toBeCloseTo(3);
    expect(p.theta).toBeCloseTo(0);
  });

  it('should update r and theta when y is set', () => {
    const p = new PolarPoint(1, 0);
    p.y = 4;
    expect(p.r).toBeCloseTo(Math.hypot(1, 4));
    expect(p.theta).toBeCloseTo(Math.atan2(4, 1));
  });

  it('should allow updating r and theta directly', () => {
    const p = new PolarPoint(1, 0);
    p.r = 5;
    p.theta = Math.PI;
    expect(p.r).toBe(5);
    expect(p.theta).toBe(Math.PI);
  });

  it('should throw when setting x to NaN', () => {
    const p = new PolarPoint(1, 0);
    expect(() => {
      p.x = NaN;
    }).toThrow('Invalid value for x: NaN');
  });

  it('should throw when setting y to NaN', () => {
    const p = new PolarPoint(1, 0);
    expect(() => {
      p.y = NaN;
    }).toThrow('Invalid value for y: NaN');
  });

  it('should handle negative coordinates correctly', () => {
    const p = new PolarPoint(1, Math.PI);
    expect(p.x).toBeCloseTo(-1);
    expect(p.y).toBeCloseTo(0);
  });

  it('should preserve quadrant in theta after x/y update', () => {
    const p = new PolarPoint(1, 0);
    p.x = -3;
    p.y = 4;
    expect(p.theta).toBeCloseTo(Math.atan2(4, -3));
    expect(p.r).toBeCloseTo(5);
  });

  it('should handle r=0 case', () => {
    const p = new PolarPoint(0, 0);
    expect(p.x).toBe(0);
    expect(p.y).toBe(0);

    p.x = 1;
    expect(p.r).toBeCloseTo(1);
    expect(p.theta).toBeCloseTo(0);
  });
});
