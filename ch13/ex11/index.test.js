/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from './index.ts';

describe('retryWithExponentialBackoff', () => {
  it('resolves immediately if func succeeds on first try', async () => {
    const func = jest.fn().mockResolvedValue('ok');
    await expect(retryWithExponentialBackoff(func, 5)).resolves.toBe('ok');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('retries until success', async () => {
    const func = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValue('ok');

    const originalSetTimeout = global.setTimeout;
    global.setTimeout = (fn) => originalSetTimeout(fn, 0);

    await expect(retryWithExponentialBackoff(func, 5)).resolves.toBe('ok');
    expect(func).toHaveBeenCalledTimes(3);

    global.setTimeout = originalSetTimeout; // 元に戻す
  });

  it('rejects after exceeding maxRetry', async () => {
    const func = jest.fn().mockRejectedValue(new Error('always fail'));

    const originalSetTimeout = global.setTimeout;
    global.setTimeout = (fn) => originalSetTimeout(fn, 0);

    await expect(retryWithExponentialBackoff(func, 2)).rejects.toThrow(
      'always fail'
    );
    expect(func).toHaveBeenCalledTimes(3);

    global.setTimeout = originalSetTimeout;
  });
});
