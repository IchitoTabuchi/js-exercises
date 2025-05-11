// node --loader ts-node/esm ch04/ex07/index.ts

/*
 * undefined ==> undefined
 * null ==> object
 * オブジェクト ==> object
 * NaN ==> number
 * 数値 ==> number
 * 関数 ==> function
 */

console.log('typeof undefined:', typeof undefined);
console.log('typeof null:', typeof null);
console.log('typeof {}:', typeof {});
console.log('typeof NaN:', typeof NaN);
console.log('typeof 42:', typeof 42);
console.log('typeof function() {}:', typeof function () {});
