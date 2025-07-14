// node --loader ts-node/esm ch08/ex06/index.ts

const args: unknown[][] = [];

function call(...rest: unknown[]): void {
  args.push(rest);
}

call(1, 2, 3);
call('A', 'B');

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]
