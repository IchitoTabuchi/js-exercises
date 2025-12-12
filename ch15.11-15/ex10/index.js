// Web Workerを作成
const worker = new Worker('worker.js');

document.getElementById('image').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener('load', (e) => {
    img.src = e.target.result;
  });

  img.addEventListener('load', () => {
    const originalCanvas = document.getElementById('original');
    const filteredCanvas = document.getElementById('filtered');
    const originalCtx = originalCanvas.getContext('2d');
    const filteredCtx = filteredCanvas.getContext('2d');

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const { width, height } = img;
    const srcImageData = originalCtx.getImageData(0, 0, width, height);

    // Web Workerに画像データを送信
    worker.postMessage({
      imageData: srcImageData.data,
      width: width,
      height: height,
    });

    // Web Workerからの結果を受信
    worker.onmessage = (e) => {
      // 元々あったガウシアンフィルタ処理のコードを全てWeb workerに移動
      // ここでは結果を受け取って表示するだけ
      const { imageData, width, height } = e.data;
      const outImageData = new ImageData(imageData, width, height);
      filteredCtx.putImageData(outImageData, 0, 0);
    };
  });

  reader.readAsDataURL(file);
});
