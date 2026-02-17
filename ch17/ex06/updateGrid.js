import { ROWS, COLS } from './constants.js';

// Life Game のルールに従ってセルを更新する
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する
      // 自分自身を除く周囲8セルを調べる
      let aliveCount = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dy === 0 && dx === 0) {
            continue;
          } // 自分自身は除外
          const r = row + dy;
          const c = col + dx;
          if (r < 0 || r >= ROWS || c < 0 || c >= COLS) {
            continue;
          } // 境界外は無視
          if (grid[r][c]) {
            aliveCount++;
          } // 生存セルであればカウント
        }
      }
      const centerIsAlive = grid[row][col]; // 中央のセルの状態 (true: 生存, false: 死亡)
      // ライフゲームの基本ルール
      // 誕生: 死亡セルの周囲にちょうど3つの生存セル -> 中央のセルは生存状態になる
      // 生存: 生存セルの周囲に2または3つの生存セル -> 中央のセルは生存状態のまま
      // 過疎/過密: それ以外 -> 中央のセルは死亡する
      if (!centerIsAlive && aliveCount === 3) {
        nextGrid[row][col] = true; // 誕生
      } else if (centerIsAlive && (aliveCount === 2 || aliveCount === 3)) {
        nextGrid[row][col] = true; // 生存
      } else {
        nextGrid[row][col] = false; // 過疎/過密で死亡
      }
    }
  }
  return nextGrid;
}
