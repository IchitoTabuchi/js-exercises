const obj1: any = { x: 1 };

obj1.y = 2;

console.log(obj1);

const obj2 = { x: 1, y: 2 };

console.log(obj1 === obj2);

export const equals = (a: any, b: any): boolean => {
  if (a === b) return true;

  if (
    a === null ||
    b === null ||
    typeof a !== 'object' ||
    typeof b !== 'object'
  )
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;

    if (!equals(a[key], b[key])) return false;
  }

  return true;
};
