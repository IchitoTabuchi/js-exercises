export const getAllPropertyKeys = (obj: object): (string | symbol)[] =>
  [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
    ...Object.keys(Object.getPrototypeOf(obj) || {}),
  ].filter((k, i, arr) => arr.indexOf(k) === i);

// プロトタイプを再帰的に祖先までたどるようにする。
// 重複要素を消す。
