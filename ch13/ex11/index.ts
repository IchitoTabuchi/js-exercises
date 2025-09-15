/* eslint-disable no-constant-condition */
export async function retryWithExponentialBackoff<T>(
  func: () => Promise<T>,
  maxRetry: number
): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await func();
    } catch (err) {
      if (attempt++ >= maxRetry) throw err;
      const delay = 1000 * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
