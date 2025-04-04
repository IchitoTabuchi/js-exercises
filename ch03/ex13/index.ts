class Example {
  valueOf() {
    return 24;
  }

  toString() {
    return 'Hello, world!';
  }
}

const obj = new Example();

console.log(Number(obj) + 1);
console.log((obj as number) * 2);

console.log(String(obj));
console.log(`${obj}`);
