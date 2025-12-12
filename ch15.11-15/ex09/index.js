// ch15.04-10 のコードをコピペして一部修正

const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;

const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

const sound = new Audio('decision1.mp3');

let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// WebSocket接続を確立
const ws = new WebSocket('ws://localhost:3003');

function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}

// WebSocketからメッセージを受信した時の処理
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'update') {
    // サーバから盤面の更新を受信したら描画
    grid = data.grid;
    renderGrid(grid);
  }
};

canvas.addEventListener('click', function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  // セルの反転をサーバに送信
  ws.send(
    JSON.stringify({
      type: 'toggle',
      row: row,
      col: col,
    })
  );
  sound.cloneNode().play();
});

// ゲーム開始ボタンのイベント
startButton.addEventListener('click', () => {
  // サーバにゲーム開始を通知
  ws.send(JSON.stringify({ type: 'start' }));
});

// ゲーム停止ボタンのイベント
pauseButton.addEventListener('click', () => {
  // サーバにゲーム停止を通知
  ws.send(JSON.stringify({ type: 'pause' }));
});

renderGrid(grid);
