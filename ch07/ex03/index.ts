export const sum = (a: number[] = []): number =>
  a.reduce((sum, val) => sum + val, 0);

export const join = (a: any[], sep: string = ','): string =>
  a.reduce((sum, val, i) => (!i ? '' : sum + sep) + (val ?? ''), '');

export const reverse = <T>(a: T[] = []): T[] =>
  a.reduce<T[]>((sum, val) => [val, ...sum], []);

export const every = <T>(
  a: T[],
  predicate: (val: T, index: number, arr: T[]) => boolean
): boolean =>
  a.reduce((sum, val, i, arr) => sum && predicate(val, i, arr), true);

export const some = <T>(
  a: T[],
  predicate: (val: T, index: number, arr: T[]) => boolean
): boolean =>
  a.reduce((sum, val, i, arr) => sum || predicate(val, i, arr), false);
