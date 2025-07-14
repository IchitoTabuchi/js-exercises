// node --loader ts-node/esm ch08/ex11/index.ts

// 組み込み関数
console.log(Math.max.toString());

// 自作関数
const myFunc = (a: number, b: number): number => a + b;

console.log(myFunc.toString());
