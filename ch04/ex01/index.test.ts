// npm test ch04/ex01

import { add, Complex, div, mul, sub } from './index.ts';

describe('Complex number operations', () => {
  const a: Complex = { re: 4, im: 3 };
  const b: Complex = { re: 1, im: -2 };

  it('add', () => {
    const result: Complex = add(a, b);
    expect(result).toEqual({ re: 5, im: 1 });
  });

  it('sub', () => {
    const result: Complex = sub(a, b);
    expect(result).toEqual({ re: 3, im: 5 });
  });

  it('mul', () => {
    const result: Complex = mul(a, b);
    expect(result).toEqual({ re: 10, im: -5 });
  });

  it('div', () => {
    const result: Complex = div(a, b);
    expect(result.re).toBeCloseTo(-0.4);
    expect(result.im).toBeCloseTo(2.2);
  });

  it('division by zero should throw', () => {
    const zero: Complex = { re: 0, im: 0 };
    expect(() => div(a, zero)).toThrow('Division by zero');
  });

  it('operations with zero complex number', () => {
    const zero: Complex = { re: 0, im: 0 };

    expect(add(a, zero)).toEqual(a);
    expect(sub(a, zero)).toEqual(a);
    expect(mul(a, zero)).toEqual(zero);
    expect(div(zero, a)).toEqual(zero);
  });

  it('pure imaginary and real numbers', () => {
    const purelyImaginary: Complex = { re: 0, im: 5 };
    const purelyReal: Complex = { re: 2, im: 0 };

    expect(add(purelyImaginary, purelyReal)).toEqual({ re: 2, im: 5 });
    expect(mul(purelyImaginary, purelyImaginary)).toEqual({ re: -25, im: 0 });
  });
});
