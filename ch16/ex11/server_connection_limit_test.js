import net from 'net';

const MAX_TEST = 30000;
let success = 0,
  fail = 0,
  pending = 0;
const connections = [];

for (let i = 0; i < MAX_TEST; i++) {
  const socket = net.connect(8080, 'localhost');
  pending++;

  // 接続成功時は success カウントを増やす
  socket.on('connect', () => {
    pending--;
    success++;
  });

  // 接続失敗時は fail カウントを増やす
  socket.on('error', (err) => {
    pending--;
    fail++;
    if (fail === 1)
      console.log(`First error at ${i}: ${err.code} - ${err.message}`); // 最初のエラーのみ表示
    socket.destroy();
  });

  connections.push(socket);

  // 遅延を入れてサーバーへの負荷を軽減 (無いと接続に失敗する)
  if (i % 100 === 0) await new Promise((r) => setTimeout(r, 10));
}

// 結果を表示して終了
setTimeout(async () => {
  console.log(`Result: Success=${success}, Fail=${fail}, Pending=${pending}`);
  connections.forEach((s) => s.destroy());
  await new Promise((r) => setTimeout(r, 1000));
  process.exit(0);
}, 3000);
