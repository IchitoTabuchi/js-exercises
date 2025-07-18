export const instanceOf = <
  T extends abstract new (...args: unknown[]) => unknown,
>(
  object: unknown,
  constructor: T
): boolean => {
  // nullの場合は、.constructorが存在しないため、falseを返す
  if (typeof object !== 'object' || object === null) return false;

  let proto = Object.getPrototypeOf(object);
  while (proto) {
    if (proto === constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};

// Functionも引数に取れるようにする必要がある。
