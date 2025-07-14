export function any<T>(
  ...predicates: Array<(arg: T) => boolean>
): (arg: T) => boolean {
  return (arg: T) => predicates.some((fn) => fn(arg));
}

export function catching<A, R, E>(
  fn: (arg: A) => R,
  errorHandler: (error: unknown) => E
): (arg: A) => R | E {
  return (arg: A) => {
    try {
      return fn(arg);
    } catch (e) {
      return errorHandler(e);
    }
  };
}
