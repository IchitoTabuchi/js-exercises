/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeMap } from './index.ts';

class Foo {}

describe('TypeMap', () => {
  let typeMap: TypeMap;

  beforeEach(() => {
    typeMap = new TypeMap();
  });

  const constructors: [any, any][] = [
    [String, 'hello'],
    [Number, 123],
    [Boolean, true],
    [Symbol, Symbol('s')],
    [Object, { a: 1 }],
    [Array, [1, 2, 3]],
    [Map, new Map([['k', 'v']])],
    [Set, new Set([1, 2])],
    [Date, new Date()],
    [RegExp, /abc/],
    [Function, () => 42],
    [Foo, new Foo()],
  ];

  it('should set and get values for all constructors', () => {
    for (const [Ctor, value] of constructors) {
      typeMap.set(Ctor, value);
      const retrieved = typeMap.get(Ctor);
      expect(retrieved).toBe(value);
    }
  });

  it('should throw when value does not match constructor', () => {
    const invalidValues = [null, undefined, 42, 'str', true, Symbol('x'), {}];
    for (const val of invalidValues) {
      expect(() => typeMap.set(Foo, val as any)).toThrow();
    }
  });
});
