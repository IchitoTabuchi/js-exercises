import WebSocket, { WebSocketServer } from 'ws';

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1秒当たりの更新頻度
const FRAME_RATE = 10;

// WebSocketのポート
const port = 3003;
const wss = new WebSocketServer({ port });

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );
// 停止状態
let paused = true;

wss.on('connection', (ws) => {
  // 接続されたクライアントに初期のグリッドを送信
  ws.send(JSON.stringify({ type: 'update', grid }));

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    switch (data.type) {
      case 'toggle': // セルの反転
        grid[data.row][data.col] = !grid[data.row][data.col];
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'update', grid }));
          }
        });
        break;
      case 'pause': // 停止
        paused = true;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'pause' }));
          }
        });
        break;
      case 'start': // 開始・再開
        paused = false;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'start' }));
          }
        });
        break;
    }
  });
});

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する
      //（15.04-10.10の実装を利用）
      // 対応箇所をコピペ
      let aliveCount = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dy === 0 && dx === 0) continue; // 自分自身は除外
          const r = row + dy;
          const c = col + dx;
          if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue; // 境界外は無視
          if (grid[r][c]) aliveCount++; // 生存セルであればカウント
        }
      }
      const centerIsAlive = grid[row][col]; // 中央のセルの状態 (true: 生存, false: 死亡)
      // ライフゲームの基本ルール
      // 誕生: 死亡セルの周囲にちょうど3つの生存セル -> 中央のセルは生存状態になる
      // 生存: 生存セルの周囲に2または3つの生存セル -> 中央のセルは生存状態のまま
      // 過疎/過密: それ以外 -> 中央のセルは死亡する
      if (!centerIsAlive && aliveCount === 3)
        nextGrid[row][col] = true; // 誕生
      else if (centerIsAlive && (aliveCount === 2 || aliveCount === 3))
        nextGrid[row][col] = true; // 生存
      else nextGrid[row][col] = false; // 過疎/過密で死亡
    }
  }
  return nextGrid;
}

// 全クライアントにグリッドの状態をブロードキャストする
function broadcast(grid) {
  const message = JSON.stringify({ type: 'update', grid });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 1秒に10回グリッドを更新し、クライアントに送信する
setInterval(() => {
  if (paused) {
    return;
  }
  grid = updateGrid(grid);
  broadcast(grid);
}, 1000 / FRAME_RATE);
