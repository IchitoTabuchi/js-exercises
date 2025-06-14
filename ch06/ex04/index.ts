// node --loader ts-node/esm ch06/ex04/index.ts

type Obj = { foo?: number };

const obj: Obj = { foo: 0 };

Object.defineProperty(obj, 'foo', {
  value: 123,
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log('Initial value:', obj.foo); // 123

// obj.foo = 456; // TypeError: Cannot assign to read only property 'foo' of object '#<Object>'が発生する。(writable: false → 上書き不可)

// delete obj.foo; // TypeError: Cannot delete property 'foo' of #<Object>が発生する。（configurable: false → 削除不可）

console.log('hasOwnProperty:', obj.hasOwnProperty('foo')); // true

console.log('propertyIsEnumerable:', obj.propertyIsEnumerable('foo')); // false (enumerable: false → 列挙不可)

console.log('Object.keys:', Object.keys(obj)); // [] (enumerable: false → 列挙不可)

for (const key in obj) console.log('for...in:', key); // 出力されない (enumerable: false → 列挙不可)
