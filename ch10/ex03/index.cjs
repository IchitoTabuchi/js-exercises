// eslint-disable-next-line @typescript-eslint/no-var-requires
const { add, Calculator } = require('./math.cjs');

console.log(add(1, 2));

const calc = new Calculator();
console.log(calc.multiply2(3, 4));
