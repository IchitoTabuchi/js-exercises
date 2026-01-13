import fs from 'fs';
import iconv from 'iconv-lite';

// Shift_JISで保存されたファイルを読み込み
const buffer = fs.readFileSync('hello.txt');

console.log(buffer);

// Shift_JISからUTF-8にデコード
const text = iconv.decode(buffer, 'Shift_JIS');

console.log(text);
