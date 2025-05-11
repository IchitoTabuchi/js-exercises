export const f = (obj: Record<string, number>): Record<string, number> => {
  const result: Record<string, number> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!(value % 2)) result[key] = value;
  }
  return result;
};
