export function withResource<T extends { close: () => void }, R>(
  resource: T,
  fn: (res: T) => R
): R {
  try {
    return fn(resource);
  } finally {
    resource.close();
  }
}
