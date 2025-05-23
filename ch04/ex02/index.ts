// node --loader ts-node/esm ch04/ex02/index.ts

// ternary operator version
for (let i = 1; i < 101; i++)
  console.log(i % 15 ? (i % 3 ? (i % 5 ? i : 'Buzz') : 'Fizz') : 'FizzBuzz');

// if version
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) console.log('FizzBuzz');
  else if (i % 3 === 0) console.log('Fizz');
  else if (i % 5 === 0) console.log('Buzz');
  else console.log(i);
}
