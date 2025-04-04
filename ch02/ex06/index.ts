// 保存すると自動整形されてしまうので、1行で記述するコードはコメント形式で記載
// export const  fizzBuzz = (): string =>  Array.from({ length: 100 }, (_, i) => (i + 1) % 15 === 0 ? 'FizzBuzz' : (i + 1) % 3 === 0 ? 'Fizz' : (i + 1) % 5 === 0 ? 'Buzz' : (i + 1).toString()).join('\n') + '\n';;

// 上記コードを自動整形したコード
export const fizzBuzz = (): string =>
  Array.from({ length: 100 }, (_, i) =>
    (i + 1) % 15 === 0
      ? 'FizzBuzz'
      : (i + 1) % 3 === 0
      ? 'Fizz'
      : (i + 1) % 5 === 0
      ? 'Buzz'
      : (i + 1).toString()
  ).join('\n') + '\n';

console.log(fizzBuzz());
