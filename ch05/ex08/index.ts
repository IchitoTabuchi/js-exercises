// node --loader ts-node/esm ch05/ex08/index.ts

let x = 0;

for (let i = 1; i <= 5; i++) {
  x = i;
  try {
    console.log('try');
    throw Error();
  } catch {
    console.log('catch');
    break;
  } finally {
    console.log('finally');
    continue;
  }
}

console.log(x);
