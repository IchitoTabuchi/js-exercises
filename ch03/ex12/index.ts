const obj1: any = { x: 1 };

obj1.y = 2;

console.log(obj1);

const obj2 = { x: 1, y: 2 };

console.log(obj1 === obj2);

export function equals(
  objA: Record<string, number>,
  objB: Record<string, number>
): boolean {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }

  return true;
}
