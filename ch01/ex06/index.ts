// export const fib = (n: number): number => {
//   if (n < 0) throw new Error('Negative value is not allowed');
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// };

// 上記の実装では計算量がO(n^2)となり、fib(75)の計算に非常に時間がかかる
// 即時実行関数によるメモ化再帰に修正
export const fib = ((): ((n: number) => number) => {
  const memo: Record<number, number> = {};

  return (n: number): number => {
    if (n < 0) throw new Error('Negative value is not allowed');
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    return (memo[n] = fib(n - 1) + fib(n - 2));
  };
})();
