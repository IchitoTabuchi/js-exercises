/* eslint-disable @typescript-eslint/no-explicit-any */
export function addMyCall<F extends (...args: any[]) => any>(f: F) {
  (
    f as F & { myCall: (thisArg: any, ...args: Parameters<F>) => ReturnType<F> }
  ).myCall = function (
    this: F,
    thisArg: any,
    ...args: Parameters<F>
  ): ReturnType<F> {
    return this.bind(thisArg)(...args);
  };
}
