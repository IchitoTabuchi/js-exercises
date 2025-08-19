import { add, Calculator } from './index.ts';

console.log('index2.ts: ', add(1, 2));
const calc = new Calculator();
console.log('index2.ts: ', calc.multiply2(3, 4));
