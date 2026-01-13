import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const applyGaussianFilter = async (inputPath, outputPath) => {
  // 画像の読み込み（sharp は JPEG, PNG, WebP等に対応）
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // RGBAバッファとして取得
  const { data: imageData } = await image
    .raw() // raw データとして取得
    .ensureAlpha() // alpha チャンネルを確実に追加（保存時に RGBA 形式にするため）
    .toBuffer({ resolveWithObject: true }); // 幅と高さも取得できるようにする

  return new Promise((resolve, reject) => {
    // Workerを作成
    const worker = new Worker(path.join(__dirname, 'worker.js'));

    // Workerにデータを送信
    worker.postMessage({ imageData, width, height });

    // Workerからの結果を受信
    worker.on('message', (result) => {
      const { imageData: filteredData, width, height } = result;

      // 出力画像を保存（入力と同じフォーマットで保存）
      sharp(Buffer.from(filteredData), {
        raw: {
          width,
          height,
          channels: 4, // RGBA
        },
      })
        .toFile(outputPath)
        .then(() => {
          console.log(`Filtered image saved to: ${outputPath}`);
          worker.terminate();
          resolve();
        })
        .catch(reject);
    });
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Error: ${code}`));
    });
  });
};

// コマンドライン引数から入出力ファイルを取得
const inputFile = process.argv[2] || 'input.png';
const outputFile = process.argv[3] || 'output.png';

console.log(`Applying a Gaussian filter to: ${inputFile}...`);
applyGaussianFilter(inputFile, outputFile)
  .then(() => console.log('Done'))
  .catch((err) => console.error('Error:', err));
