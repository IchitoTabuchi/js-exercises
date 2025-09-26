export const unwritableAndUnconfigurableObj = () =>
  Object.defineProperty({}, 'a', {
    value: 1,
    writable: false,
    configurable: false,
    enumerable: true,
  });

export const writableAndUnconfigurableObj = () =>
  Object.defineProperty({}, 'b', {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true,
  });

const deepFreeze = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') deepFreeze(obj[key]);
    Object.defineProperty(obj, key, {
      writable: false,
      configurable: false,
      enumerable: true,
    });
  });
  return Object.freeze(obj);
};

export const nestedUnwritableObj = () => deepFreeze({ c: { d: { e: 3 } } });
