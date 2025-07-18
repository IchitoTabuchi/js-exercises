// 再帰 (O(log n))
export const powRecursive = (x: number, n: number): number => {
  if (!n) return 1;
  if (n % 2) return x * powRecursive(x, n - 1);
  return powRecursive(x * x, n / 2);
  // const half = powRecursive(x, n / 2);
  // return half * half;
};

// ループ (O(log n))
export const powLoop = (x: number, n: number): number => {
  let result = 1;
  while (n > 0) {
    if (n % 2) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
};
