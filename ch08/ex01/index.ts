// return 以外に処理を含むので波括弧が必要
export const repeatChar = (n: number, c: string) => {
  Array.from({ length: n }).forEach(() => console.log(c));
  return Array(n).fill(c);
};

// 式のみなので波括弧とreturnは不要
export const square = (x: number) => x * x;

// オブジェクトリテラルを返す場合は丸括弧で囲む
export const getNow = () => ({ now: Date.now() });
