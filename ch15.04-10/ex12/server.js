// ex12 直下で node server.js を実行してサーバを起動する
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/ch15.04-10/ex12', express.static(__dirname));

// 直接アクセス時に index.html を返す (pushState で遷移した後のリロード対策)
app.get(/^\/ch15\.04-10\/ex12\/(all|active|completed)$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/ch15.04-10/ex12', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/ch15.04-10/ex12`);
});
