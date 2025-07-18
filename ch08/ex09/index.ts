export const withResource = <T extends { close: () => void }>(
  resource: T,
  fn: (res: T) => void
): void => {
  try {
    fn(resource); // 実行するだけなのでreturn不要
  } finally {
    resource.close();
  }
};
