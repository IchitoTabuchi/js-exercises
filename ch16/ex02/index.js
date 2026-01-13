import { spawn } from 'child_process';
import path from 'path';

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, 'child.js');
  child = spawn('node', [childPath]);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on('close', (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// 終了フラグ（Graceful Shutdown用）
let isShuttingDown = false;

const main = async () => {
  while (!isShuttingDown) {
    const [code, signal] = await startChild();

    console.log(`Child process exited with code: ${code}, signal: ${signal}`);

    // シグナルによる終了の場合、親プロセスも終了
    if (signal) {
      console.log(`Child was killed by signal: ${signal}. Exiting parent.`);
      process.exit(0);
    }

    // 異常終了の場合、再起動
    if (code !== 0 && !isShuttingDown) {
      console.log(`Child process crashed with code ${code}. Restarting...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else break; // 正常終了の場合は再起動しない
  }
};

// シグナルハンドラ（SIGTERM, SIGINT）
const handleSignal = (signal) => {
  console.log(
    `Received ${signal}. Forwarding to child and shutting down gracefully...`
  );
  isShuttingDown = true;

  if (child && !child.killed)
    child.kill(signal); // 子プロセスに同じシグナルを送信
  else process.exit(0);
};

process.on('SIGTERM', () => handleSignal('SIGTERM')); // プロセス終了要求 (kill コマンドなど) が実行されたときのコールバック
process.on('SIGINT', () => handleSignal('SIGINT')); // Ctrl + C が実行されたときのコールバック

main().catch((error) => {
  console.error('Error in main process:', error);
  process.exit(1);
});
