import { equals } from './index.ts';

describe('equals function', () => {
  it('should return true for objects with the same properties and values', () => {
    expect(equals({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
  });

  it('should return false for objects with different properties', () => {
    expect(equals({ x: 1 }, { x: 1, y: 2 })).toBe(false);
  });

  it('should return false for objects with different values', () => {
    expect(equals({ x: 1, y: 2 }, { x: 1, y: 3 })).toBe(false);
  });

  it('should return false for objects with different keys', () => {
    expect(equals({ x: 1, y: 2 }, { x: 1, z: 2 })).toBe(false);
  });
});
