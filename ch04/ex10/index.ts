// node --loader ts-node/esm ch04/ex010/index.ts

const arr: string[] = ['r', 'i', 'c', 'o', 'h'];
delete arr[3];

console.log(arr);
console.log(arr.length);

const arr2: string[] = ['r', 'i', 'c', 'o', 'h'];
arr2.splice(3, 1);
console.log(arr2);
console.log(arr2.length);
