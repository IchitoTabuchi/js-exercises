// node --loader ts-node/esm ch05/ex06/index.ts

export const tryCatchFinallyWithError = (): void => {
  try {
    console.log('try');
    throw new Error();
  } catch (err) {
    console.log('catch');
  } finally {
    console.log('finally');
  }
  console.log('after try-catch-finally');
};

export const tryCatchFinallyWithoutError = (): void => {
  try {
    console.log('try');
  } catch (err) {
    console.log('catch');
  } finally {
    console.log('finally');
  }
  console.log('after try-catch-finally');
};

console.log('\ntry-catch-finally with an error');
tryCatchFinallyWithError();
console.log('\ntry-catch-finally without an error');
tryCatchFinallyWithoutError();
