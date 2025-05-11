// node --loader ts-node/esm ch04/ex07/index.ts

function set42(key: string) {
  eval(`${key} = 42;`);
}

set42("(()=>{ while(true) console.log('danger!!!!!!!!!!') })()");
