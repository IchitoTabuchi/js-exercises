// node --inspect-brk --loader ts-node/esm ch05/ex11/index.ts

const sum = (a: number, b: number) => {
  const result = a + b;
  debugger; // debugger文を挿入
  return result;
};

console.log(sum(5, 7));
