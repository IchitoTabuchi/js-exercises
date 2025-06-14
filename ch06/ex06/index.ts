export const getAllPropertyKeys = (obj: object): (string | symbol)[] =>
  [
    ...Object.getOwnPropertyNames(obj),
    ...Object.getOwnPropertySymbols(obj),
    ...Object.keys(Object.getPrototypeOf(obj) || {}),
  ].filter((k, i, arr) => arr.indexOf(k) === i);
