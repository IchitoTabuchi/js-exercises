// node --loader ts-node/esm ch06/ex03/index.ts

const o = {};
const p = Object.create(o);
const q = Object.create(p);

console.log(o.isPrototypeOf(p)); // => true
console.log(o.isPrototypeOf(q)); // => true
console.log(p.isPrototypeOf(q)); // => true

// Object
const obj = {};
console.log(Object.prototype.isPrototypeOf(obj)); // true

// Array
const arr = [];
console.log(Array.prototype.isPrototypeOf(arr)); // true
console.log(Object.prototype.isPrototypeOf(arr)); // true

// Date
const date = new Date();
console.log(Date.prototype.isPrototypeOf(date)); // true
console.log(Object.prototype.isPrototypeOf(date)); // true

// Map
const map = new Map();
console.log(Map.prototype.isPrototypeOf(map)); // true
console.log(Object.prototype.isPrototypeOf(map)); // true
