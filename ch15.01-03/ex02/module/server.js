import express from 'express';

const app = express();

// localhost:3000 からのアクセスだけ許可
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.use(express.static(new URL('.', import.meta.url).pathname));

app.listen(4000, () => {
  console.log('Module server running on http://localhost:4000');
});
