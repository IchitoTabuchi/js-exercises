import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from './index.ts';

jest.useFakeTimers();

describe('retryWithExponentialBackoff', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  const cases = [
    {
      name: 'should succeed immediately on first try',
      funcResults: [true],
      maxRetry: 3,
      expectedResult: true,
      expectedCallbackCalls: 1,
    },
    {
      name: 'should fail after maxRetry reached',
      funcResults: [false, false, false, false],
      maxRetry: 3,
      expectedResult: false,
      expectedCallbackCalls: 1,
    },
    {
      name: 'should succeed on second attempt',
      funcResults: [false, true],
      maxRetry: 3,
      expectedResult: true,
      expectedCallbackCalls: 1,
    },
    {
      name: 'should succeed on third attempt',
      funcResults: [false, false, true],
      maxRetry: 5,
      expectedResult: true,
      expectedCallbackCalls: 1,
    },
    {
      name: 'should fail immediately if maxRetry = 0',
      funcResults: [false],
      maxRetry: 0,
      expectedResult: false,
      expectedCallbackCalls: 1,
    },
  ];

  cases.forEach(
    ({
      name,
      funcResults,
      maxRetry,
      expectedResult,
      expectedCallbackCalls,
    }) => {
      it(name, () => {
        let callCount = 0;
        const func = jest.fn(() => funcResults[callCount++] ?? false);

        retryWithExponentialBackoff(func, maxRetry, callback);

        if (funcResults[0] === true) {
          expect(callback).toHaveBeenCalledWith(expectedResult);
          expect(callback).toHaveBeenCalledTimes(expectedCallbackCalls);
          return;
        }

        for (let i = 1; i <= maxRetry; i++)
          jest.advanceTimersByTime(1000 * 2 ** i);

        expect(callback).toHaveBeenCalledWith(expectedResult);
        expect(callback).toHaveBeenCalledTimes(expectedCallbackCalls);
      });
    }
  );
});
