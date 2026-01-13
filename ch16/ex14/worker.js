// ch15/ex10/worker.js を流用してworker threads用に修正
import { parentPort } from 'worker_threads';

// parentPort を使用するように修正
parentPort.on('message', (event) => {
  const { imageData, width, height } = event;

  const src = imageData;
  const dst = new Uint8ClampedArray(src.length);

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
  const kernelSize = kernel.length;
  const norm = kernel.flat().reduce((sum, v) => sum + v, 0);
  const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const srcX = clamp(x + kx - Math.floor(kernelSize / 2), 0, width - 1);
          const srcY = clamp(
            y + ky - Math.floor(kernelSize / 2),
            0,
            height - 1
          );
          const idx = (srcY * width + srcX) * 4;
          const w = kernel[ky][kx];
          r += src[idx] * w;
          g += src[idx + 1] * w;
          b += src[idx + 2] * w;
        }
      }
      const dstIdx = (y * width + x) * 4;
      dst[dstIdx] = r / norm;
      dst[dstIdx + 1] = g / norm;
      dst[dstIdx + 2] = b / norm;
      dst[dstIdx + 3] = src[dstIdx + 3];
    }
  }

  // parentPort を使用するように修正
  parentPort.postMessage({ imageData: dst, width, height });
});
