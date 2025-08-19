// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  // WeakMapはキーにオブジェクトのみを使用でき、
  // キーが到達不能になった場合には、ガーベジコレクションの対象となるため、
  // メモリリークを防ぐことができる。
  const wm = new WeakMap();

  return function (obj) {
    if (typeof obj !== 'object' || obj === null)
      throw new TypeError('Argument must be a non-null object');
    if (wm.has(obj)) return wm.get(obj);
    const result = f(obj);
    wm.set(obj, result);
    return result;
  };
}

export function slowFn(obj) {
  let sum = 0;
  for (let i = 0; i < 1e6; i++) sum += i * Object.keys(obj).length;
  return sum;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
export const cachedSlowFn = cache(slowFn);
