export const instanceOf = <
  T extends abstract new (...args: unknown[]) => unknown,
>(
  object: unknown,
  constructor: T
): boolean => {
  if (typeof object !== 'object' || object === null) return false;

  let proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    if (proto === constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};
