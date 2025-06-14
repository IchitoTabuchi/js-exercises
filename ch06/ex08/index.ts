export const restrict = (
  target: Record<string, any>,
  template: Record<string, any>
) => (
  Object.keys(target).forEach(
    (k) => Object.hasOwn(template, k) || delete target[k]
  ),
  target
);

export const substract = (
  target: Record<string, any>,
  ...sources: Record<string, any>[]
) => (sources.flatMap(Object.keys).forEach((k) => delete target[k]), target);
