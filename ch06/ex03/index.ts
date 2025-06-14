const o = {};
const p = Object.create(o);
const q = Object.create(p);

console.log(o.isPrototypeOf(p)); // => true
console.log(o.isPrototypeOf(q)); // => true
console.log(p.isPrototypeOf(q)); // => true
