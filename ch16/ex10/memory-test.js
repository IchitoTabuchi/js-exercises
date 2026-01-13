import fs from 'fs';

const PORT = 8000;

// テストファイル (100MB) が存在しない場合は作成
const testFile = 'large-file.txt';
if (!fs.existsSync(testFile)) {
  const buffer = Buffer.alloc(1024 * 1024);
  const stream = fs.createWriteStream(testFile);
  for (let i = 0; i < 100; i++) stream.write(buffer);
  stream.end();
  await new Promise((resolve) => stream.on('finish', resolve));
}

// fs.createReadStream のメモリ測定
console.log('=== fs.createReadStream ===');
const memoryBefore1 = process.memoryUsage();
const data1 = fs.createReadStream(testFile);
const memoryAfter1 = process.memoryUsage();
console.log(
  'RSS diff after creating stream:',
  ((memoryAfter1.rss - memoryBefore1.rss) / 1024 / 1024).toFixed(2),
  'MB'
);
await fetch(`http://localhost:${PORT}/upload1.txt`, {
  method: 'PUT',
  body: data1,
  duplex: 'half',
});
console.log(
  'RSS diff after uploading stream:',
  ((process.memoryUsage().rss - memoryAfter1.rss) / 1024 / 1024).toFixed(2),
  'MB'
);

// fs.readFileSync のメモリ測定
console.log('\n=== fs.readFileSync ===');
const memoryBefore2 = process.memoryUsage();
const data2 = fs.readFileSync(testFile);
const memoryAfter2 = process.memoryUsage();
console.log(
  'RSS diff after reading file:',
  ((memoryAfter2.rss - memoryBefore2.rss) / 1024 / 1024).toFixed(2),
  'MB'
);
await fetch(`http://localhost:${PORT}/upload2.txt`, {
  method: 'PUT',
  body: data2,
});
console.log(
  'RSS diff after uploading file:',
  ((process.memoryUsage().rss - memoryAfter2.rss) / 1024 / 1024).toFixed(2),
  'MB'
);
