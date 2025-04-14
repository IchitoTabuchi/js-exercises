export const isPrimitive = (value: any): boolean =>
  value === null || (typeof value !== 'object' && typeof value !== 'function');

export const eq = (x: any, y: any): boolean => {
  if (typeof x === typeof y) return x === y;
  if ((x === null && y === undefined) || (x === undefined && y === null))
    return true;
  const types: string[] = ['string', 'number', 'boolean'];
  if (
    types.includes(typeof x) &&
    types.includes(typeof y) &&
    Number(x) === Number(y)
  )
    return true;
  if (x instanceof Date) return x.toString() === y;
  if (y instanceof Date) return y.toString() === x;
  if (!isPrimitive(x) && Number(x) === y) return true;
  if (!isPrimitive(y) && Number(y) === x) return true;
  return false;
};

export const lte = (x: any, y: any): boolean => {
  if (eq(x, y)) return true;
  if (Number(x) < Number(y) || Number(x) === Number(y)) return true;
  return x < y;
};
