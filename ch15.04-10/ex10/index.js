// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio('decision1.mp3');

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// grid を canvas に描画する
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

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      // 自分自身を除く周囲8セルを調べる
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

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener('click', function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame

// 経過時間を計測して更新を一定間隔 (TARGET_FPS) に制限する
const TARGET_FPS = 10; // 1秒あたりの更新回数
const FRAME_INTERVAL = 1000 / TARGET_FPS; // ミリ秒間隔
let lastTime = 0; // 前回更新基準時刻 (ms)
function update(timestamp) {
  if (!lastTime) lastTime = timestamp; // 初回フレームで基準時間を設定
  const elapsed = timestamp - lastTime; // 前回フレームからの経過時間 (ms)

  // FRAME_INTERVAL の時間が経過したら盤面を1ステップ進める
  if (elapsed >= FRAME_INTERVAL) {
    // ドリフト補正: ドリフト(繰り返し処理のタイミングが少しずつずれていく現象)を防ぐため、過剰な経過時間の余りを次フレーム基準に残す
    lastTime = timestamp - (elapsed % FRAME_INTERVAL);
    grid = updateGrid(grid); // セルの論理更新
    renderGrid(grid); // 画面描画
  }

  // 次フレームのコールを予約する
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener('click', () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
});

pauseButton.addEventListener('click', () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);
