// (n >>> 0): 「符号なし」32ビット整数へ変換（負数へ対応するため）
// toString(2): 2進数の文字列へ変換
// split('1'): '1'で文字列を分割する。（要素数が('1'の数 + 1)個の配列になる）
// .length - 1: 配列サイズ（'1'の数 + 1） - 1を出力

export const bitCount = (n: number): number =>
  (n >>> 0).toString(2).split('1').length - 1;
