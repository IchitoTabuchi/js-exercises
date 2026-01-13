import fs from 'fs';

// 元のファイルを作成
const filename = 'test-file.dat';
fs.writeFileSync(filename, '0000'); // 比較用に0000を書き込む

// truncateでファイルを100バイトに拡張
fs.truncateSync(filename, 100);
