export const sequenceToObject = (
  ...values: unknown[]
): Record<string, unknown> => {
  if (values.length % 2)
    throw new Error(
      'Invalid number of arguments. Expected even number of elements.'
    );

  const result: Record<string, unknown> = {};

  for (let i = 0; i < values.length; i += 2) {
    const key = values[i];
    const value = values[i + 1];

    if (typeof key !== 'string')
      throw new Error(`Key at index ${i} is not a string: ${key}`);

    result[key] = value;
  }

  return result;
};
