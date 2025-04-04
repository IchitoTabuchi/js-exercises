// node --loader ts-node/esm ch03/ex02/index.ts

console.log(`Max Safe Integer: ${Number.MAX_SAFE_INTEGER}`);
console.log(`Min Safe Integer: ${Number.MIN_SAFE_INTEGER}`);

const maxPlusOne = Number.MAX_SAFE_INTEGER + 1;
console.log(`Max Safe Integer + 1: ${maxPlusOne}`);

const maxPlusTwo = Number.MAX_SAFE_INTEGER + 2;
console.log(
  `Max Safe Integer + 1 === Max Safe Integer + 2: ${maxPlusOne === maxPlusTwo}`
);
