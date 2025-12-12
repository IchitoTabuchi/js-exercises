// ガウシアンフィルタの処理を全てWeb Workerに移動
self.addEventListener('message', (event) => {
  const { imageData, width, height } = event.data;

  const src = imageData;
  const dst = new Uint8ClampedArray(src.length);

  // 9 x 9
  const kernel = [
    [1, 4, 7, 10, 13, 10, 7, 4, 1],
    [4, 16, 26, 40, 52, 40, 26, 16, 4],
    [7, 26, 41, 63, 82, 63, 41, 26, 7],
    [10, 40, 63, 99, 128, 99, 63, 40, 10],
    [13, 52, 82, 128, 165, 128, 82, 52, 13],
    [10, 40, 63, 99, 128, 99, 63, 40, 10],
    [7, 26, 41, 63, 82, 63, 41, 26, 7],
    [4, 16, 26, 40, 52, 40, 26, 16, 4],
    [1, 4, 7, 10, 13, 10, 7, 4, 1],
  ];

  const kernelSize = kernel.length; // カーネルのサイズ
  const norm = kernel.flat().reduce((sum, v) => sum + v, 0); //カーネルの合計

  // 画像の端でカーネルが画像外を参照しないように座標を範囲内に収める関数
  const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);

  // 画像全体を走査
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;
      // カーネルの各要素を適用する
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          // カーネルの中心を基準に画像上の座標を計算
          const srcX = clamp(x + kx - Math.floor(kernelSize / 2), 0, width - 1);
          const srcY = clamp(
            y + ky - Math.floor(kernelSize / 2),
            0,
            height - 1
          );
          const idx = (srcY * width + srcX) * 4; // src は RGBA が [R, G, B, A, R, G, B, A, ...] と繰り返し並んでいるのでインデックスを4倍する
          const w = kernel[ky][kx]; // カーネルの重み
          r += src[idx] * w; // Rのインデックス = idx
          g += src[idx + 1] * w; // Gのインデックス = Rのインデックス + 1
          b += src[idx + 2] * w; // Bのインデックス = Rのインデックス + 2
        }
      }
      // RGB の出力結果をノルムで正規化して dst に格納
      const dstIdx = (y * width + x) * 4;
      dst[dstIdx] = r / norm;
      dst[dstIdx + 1] = g / norm;
      dst[dstIdx + 2] = b / norm;
      dst[dstIdx + 3] = src[dstIdx + 3]; // alpha (画像の透明度)は元の値を使用する
    }
  }

  // 処理結果を返す
  self.postMessage({ imageData: dst, width, height });
});
