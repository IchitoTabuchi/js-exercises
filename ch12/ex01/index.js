/* eslint-disable @typescript-eslint/no-unused-vars */
function counterIter(max) {
  console.log('counterIter');
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log('counterIter: Symbol.iterator');
      return this;
    },
    next() {
      console.log('counterIter: next');
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log('counterIter: return:', value);
      return { value, done: true };
    },
    throw(e) {
      console.log('counterIter: throw:', e);
      throw e;
    },
  };
}

function* counterGen(max) {
  console.log('counterGen');
  try {
    for (let c = 1; c <= max; c++) {
      console.log('counterGen: next');
      yield c;
    }
  } catch (e) {
    console.log('counterGen: catch:', e);
    throw e;
  } finally {
    console.log('counterGen: finally');
  }
}

console.log('1. 明示的にnext()を呼び出す');
console.log('=== counterIter: next ===');
const iter1 = counterIter(2);
iter1.next();
iter1.next();
iter1.next();

console.log('=== counterGen: next ===');
const gen1 = counterGen(2);
gen1.next();
gen1.next();
gen1.next();

console.log('\n2. 明示的にreturn()を呼び出す');
console.log('=== counterIter: return ===');
const iter2 = counterIter(5);
iter2.next();
iter2.next();
iter2.return('foo');

console.log('=== counterGen: return ===');
const gen2 = counterGen(5);
gen2.next();
gen2.next();
gen2.return('foo');

console.log('\n3. 明示的にthrow()を呼び出す');
console.log('=== counterIter: for...of ===');
const iter3 = counterIter(5);
try {
  for (const n of iter3) if (n >= 2) iter3.throw(new Error('test'));
} catch (e) {
  /* empty */
}

console.log('=== counterGen: for...of ===');
const gen3 = counterGen(5);
try {
  for (const n of gen3) if (n >= 2) gen3.throw(new Error('test'));
} catch (e) {
  /* empty */
}

console.log('\n4. for-of ループを実行');
console.log('=== counterIter: for...of ===');
for (const _n of counterIter(3)) {
  /* empty */
}

console.log('=== counterGen: for...of ===');
for (const _n of counterGen(3)) {
  /* empty */
}

console.log('\n5. for-of ループを実行途中でbreak');
console.log('=== counterIter: for...of ===');
for (const n of counterIter(5)) if (n >= 2) break;

console.log('=== counterGen: for...of ===');
for (const n of counterGen(5)) if (n >= 2) break;

console.log('\n6. for-of ループを実行中に例外発生');
console.log('=== counterIter: for...of ===');
try {
  for (const n of counterIter(5)) if (n >= 2) throw new Error('test');
} catch (e) {
  /* empty */
}

console.log('=== counterGen: for...of ===');
try {
  for (const n of counterGen(5)) if (n >= 2) throw new Error('test');
} catch (e) {
  /* empty */
}
