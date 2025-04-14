// npm test ch03/ex11

import { equals } from './index.ts';

describe('equals function', () => {
  it('returns true for strictly equal primitives', () => {
    expect(equals(42, 42)).toBe(true);
    expect(equals(null, null)).toBe(true);
  });

  it('returns false when one is object and one is primitive', () => {
    expect(equals({ x: 42 }, 42)).toBe(false);
    expect(equals(null, { x: 42 })).toBe(false);
  });

  it('returns false for objects with different keys or key counts', () => {
    expect(equals({ x: 1 }, { y: 1 })).toBe(false);
    expect(equals({ x: 1 }, { x: 1, y: 1 })).toBe(false);
  });

  it('returns true for deeply equal nested objects', () => {
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })).toBe(true);
  });

  it('returns false for nested objects with extra properties', () => {
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })).toBe(
      false
    );
  });
});
