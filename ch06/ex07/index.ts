export const assign = (target: object, ...sources: object[]) => {
  if (target == null)
    throw new TypeError('Cannot convert undefined or null to object');
  const to = Object(target);
  for (const src of sources ?? [])
    if (src != null) {
      for (const key of Object.keys(src)) (to as any)[key] = (src as any)[key];
      const symbols = Object.getOwnPropertySymbols(src);
      if (symbols.length > 0) {
        const sym = symbols[0];
        (to as any)[sym] = (src as any)[sym];
      }
    }
  return to;
};
