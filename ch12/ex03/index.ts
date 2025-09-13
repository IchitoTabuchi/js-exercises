export function* resettableCounter() {
  let count = 0;
  while (true) {
    try {
      yield count++;
    } catch (e) {
      if (e === 'reset') count = -1; // 次のyieldで0にするため
      else throw e;
    }
  }
}
