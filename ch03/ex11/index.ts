const sym1: symbol = Symbol('mySymbol');
const sym2: symbol = Symbol('mySymbol');

const obj = {
  [sym1]: 'Value for Sym1',
  [sym2]: 'Value for sym2',
};

console.log(obj[sym1]);
console.log(obj[sym2]);

console.log(sym1 === sym2);

const globalSym1: symbol = Symbol.for('mySymbol');
const globalSym2: symbol = Symbol.for('mySymbol');

const globalObj = {
  [globalSym1]: 'Global value',
};

console.log(globalObj[globalSym1]);
console.log(globalObj[globalSym2]);

console.log(globalSym1 === globalSym2);
