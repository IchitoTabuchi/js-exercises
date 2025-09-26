// (n >>> 0): 「符号なし」32ビット整数へ変換（負数へ対応するため）
// toString(2): 2進数の文字列へ変換
// split('1'): '1'で文字列を分割する。（要素数が('1'の数 + 1)個の配列になる）
// .length - 1: 配列サイズ（'1'の数 + 1） - 1を出力
export const bitCount = (n) => (n >>> 0).toString(2).split('1').length - 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5Q0FBeUM7QUFDekMsMEJBQTBCO0FBQzFCLG9EQUFvRDtBQUNwRCx1Q0FBdUM7QUFFdkMsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFVLEVBQUUsQ0FDNUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDIn0=