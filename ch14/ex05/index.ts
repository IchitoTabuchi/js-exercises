export const template = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string =>
  strings.reduce<string>(
    (result, chunk, index) =>
      result + chunk + (index < values.length ? typeof values[index] : ''),
    ''
  );
