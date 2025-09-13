// 無限に自然数を返すジェネレータ
function* integers(start: number = 2): Generator<number> {
  let n = start;
  while (true) yield n++;
}

//P363の条件でフィルタするジェネレータ
function filter(
  iterable: Generator<number>,
  predicate: (n: number) => boolean
): Generator<number> {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        const v = iterator.next();
        if (v.done || predicate(v.value)) return v;
      }
    },
  } as Generator<number>;
}

export function* primes(): Generator<number> {
  let seq: Generator<number> = integers(2);
  while (true) {
    const p = seq.next().value;
    yield p;
    seq = filter(seq, (n) => n % p !== 0);
  }
}
