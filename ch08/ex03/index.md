# 1 末尾再帰が最適化可能な理由

## 末尾再帰最適化なし

```js
const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};
```

呼び出し後の戻り値を使用して、`n * factorial(n-1)`という計算を後で行う必要があるため、スタックフレームを保持し続ける必要があるため、再帰の深さが一定以上になるとメモリが枯渇してスタックオーバーフローが発生する。

## 末尾再帰最適化あり

```js
const factorialWithTCO = (n: number, acc = 1): number => {
  if (n <= 1) return acc;
  return factorialWithTCO(n - 1, acc * n);
};
```

末尾再帰では、再帰呼び出し後に何も処理が残っていないため、現在の関数のスタックフレームを保持する必要がなく、同じスタックフレームを上書きして再利用できるため、理論上スタックオーバーフローが発生しない。（ただし、実際は処理系がTCOに対応している場合に限定される。）

# 2 JavaScriptでTCOに対応している処理系

- Safari

## 非対応

Google Chrome, Node.js, Firefox, Edgeなどは対応していない。

理由

- スタックトレースができなくなることでデバッグ性とトレードオフになるため。
- JavaScriptはループ処理が主流なので、TCO実装のメリットが少ないため。
