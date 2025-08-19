export const retryWithExponentialBackoff = (
  func: () => boolean,
  maxRetry: number,
  callback: (result: boolean) => void
): void => {
  let attempt = 0;

  const tryFunc = () => {
    if (func()) return callback(true);
    if (attempt++ >= maxRetry) return callback(false);
    setTimeout(tryFunc, 1000 * 2 ** attempt);
  };

  tryFunc();
};
