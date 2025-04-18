// node --loader ts-node/esm ch03/ex07/index.ts

export const equalArrays = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
