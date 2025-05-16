// node --loader ts-node/esm ch04/ex03/index.ts

export const add = (x: number, y: number): number => {
  // 繰り上がりが無くなるまで実行
  while (y) [x, y] = [x ^ y, (x & y) << 1]; // x: 繰り上がりなしの和、y: 繰り上がり
  return x;
};

// add(~b, 1)で2の補数を計算（+演算子は使用不可なので、add関数を使用する）
export const sub = (a: number, b: number): number => add(a, add(~b, 1));
