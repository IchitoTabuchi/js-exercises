// export const fib = (n: number): number => {
//   if (n < 0) throw new Error('Negative value is not allowed');
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// };
// 上記の実装では計算量がO(n^2)となり、fib(75)の計算に非常に時間がかかる
// 即時実行関数によるメモ化再帰に修正
export const fib = (() => {
    const memo = {};
    return (n) => {
        if (n < 0)
            throw new Error('Negative value is not allowed');
        if (n in memo)
            return memo[n];
        if (n <= 1)
            return n;
        return (memo[n] = fib(n - 1) + fib(n - 2));
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEM7QUFDOUMsaUVBQWlFO0FBQ2pFLGlEQUFpRDtBQUNqRCxLQUFLO0FBRUwsNENBQTRDO0FBQzVDLG9CQUFvQjtBQUNwQixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUE0QixFQUFFO0lBQ2hELE1BQU0sSUFBSSxHQUEyQixFQUFFLENBQUM7SUFFeEMsT0FBTyxDQUFDLENBQVMsRUFBVSxFQUFFO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==