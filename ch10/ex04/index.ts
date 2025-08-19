import add2, { Calculator2 as Calc } from './math.ts';
export { default as add2, Calculator2 as Calculator } from './math.ts';

console.log('index.ts: ', add2(1, 2));
const calc = new Calc();
console.log('index.ts: ', calc.multiply2(3, 4));
