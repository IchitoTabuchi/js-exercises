// node --loader ts-node/esm ch06/ex02/index.ts

const parent = {
  uniqueProperty: 'uniqueProperty',
};

const child = Object.create(parent);

console.log(Object.getPrototypeOf(child) === parent); // => true

console.log(child.uniqueProperty); // => "uniqueProperty"
console.log(child.hasOwnProperty('uniqueProperty')); // => false
