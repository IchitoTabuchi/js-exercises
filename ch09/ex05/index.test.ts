import { instanceOf } from './index.ts';

class A {}
class B extends A {}
class C extends B {}
class Unrelated {}

describe('instanceOf', () => {
  it('should return true for instance of direct class', () => {
    const b = new B();
    expect(instanceOf(b, B)).toBe(true);
  });

  it('should return true for instance of superclass', () => {
    const c = new C();
    expect(instanceOf(c, B)).toBe(true);
    expect(instanceOf(c, A)).toBe(true);
  });

  it('should return false for unrelated classes', () => {
    const c = new C();
    expect(instanceOf(c, Unrelated)).toBe(false);
  });

  it('should return false for plain object', () => {
    const o = {};
    expect(instanceOf(o, A)).toBe(false);
  });

  it('should return false for primitive values (wrapped in Object)', () => {
    const n = new Number(5);
    expect(instanceOf(n, String)).toBe(false);
  });

  // nullのケースが必要
  it('should return false for null', () => {
    expect(instanceOf(null, A)).toBe(false);
  });

  // アロー関数のケースが必要
  it('should return false for arrow function', () => {
    const arrowFn = () => {};
    expect(instanceOf(arrowFn, Function)).toBe(false);
  });
});
