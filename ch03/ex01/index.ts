const values: number[] = [Infinity, -Infinity, NaN];
const operators: string[] = ['+', '-', '*', '/'];

for (let i = 0; i < values.length; i++) {
  for (let j = i; j < values.length; j++) {
    const a = values[i];
    const b = values[j];
    console.log(`a = ${a}, b = ${b}`);
    for (const op of operators) {
      let result;
      switch (op) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          result = a / b;
          break;
      }
      console.log(`  ${a} ${op} ${b} = ${result}`);
    }
  }
}
