// node --loader ts-node/esm ch08/ex13/index.js

function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

// 悪意のある入力例
f(`(function() { while(true) {console.log("hacked!")} return "done"; })()`);

function safeF(input) {
  console.log(`Hello, ${input}`);
}
safeF('World');
