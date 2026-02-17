import { COLS, RESOLUTION, ROWS } from './constants.js';
import { renderGrid } from './renderGrid.js';
import { updateGrid } from './updateGrid.js';

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

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener('click', (evt) => {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid, ctx);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// 経過時間を計測して更新を一定間隔 (TARGET_FPS) に制限する
const TARGET_FPS = 10; // 1秒あたりの更新回数
const FRAME_INTERVAL = 1000 / TARGET_FPS; // ミリ秒間隔
let lastTime = 0; // 前回更新基準時刻 (ms)

function update(timestamp) {
  if (!lastTime) {
    lastTime = timestamp;
  } // 初回フレームで基準時間を設定
  const elapsed = timestamp - lastTime; // 前回フレームからの経過時間 (ms)

  // FRAME_INTERVAL の時間が経過したら盤面を1ステップ進める
  if (elapsed >= FRAME_INTERVAL) {
    // ドリフト補正: ドリフト(繰り返し処理のタイミングが少しずつずれていく現象)を防ぐため、過剰な経過時間の余りを次フレーム基準に残す
    lastTime = timestamp - (elapsed % FRAME_INTERVAL);
    grid = updateGrid(grid); // セルの論理更新
    renderGrid(grid, ctx); // 画面描画
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

renderGrid(grid, ctx);
