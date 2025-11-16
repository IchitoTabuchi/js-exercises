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

    // const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    // const data = imageData.data;

    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }

    // filteredCtx.putImageData(imageData, 0, 0);

    const { width, height } = img;
    const srcImageData = originalCtx.getImageData(0, 0, width, height);
    const src = srcImageData.data; // RGBA

    const dst = new Uint8ClampedArray(src.length); // 0~255 の範囲に自動でクランプされる配列

    // 5x5 ガウシアンカーネル (係数合計 = 256)
    // （Pascal の二項係数 1 4 6 4 1 を外積して得られる近似）
    // 画像をぼかすための重み行列。中心ほど重みが大きい。

    // 5 x 5
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];

    // 9 x 9
    // const kernel = [
    //   [1, 4, 7, 10, 13, 10, 7, 4, 1],
    //   [4, 16, 26, 40, 52, 40, 26, 16, 4],
    //   [7, 26, 41, 63, 82, 63, 41, 26, 7],
    //   [10, 40, 63, 99, 128, 99, 63, 40, 10],
    //   [13, 52, 82, 128, 165, 128, 82, 52, 13],
    //   [10, 40, 63, 99, 128, 99, 63, 40, 10],
    //   [7, 26, 41, 63, 82, 63, 41, 26, 7],
    //   [4, 16, 26, 40, 52, 40, 26, 16, 4],
    //   [1, 4, 7, 10, 13, 10, 7, 4, 1],
    // ];

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
            const srcX = clamp(
              x + kx - Math.floor(kernelSize / 2),
              0,
              width - 1
            );
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

    const outImageData = new ImageData(dst, width, height);
    filteredCtx.putImageData(outImageData, 0, 0);
  });

  reader.readAsDataURL(file);
});
