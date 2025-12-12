// テキスト P609 ~ 610 のコードを Sierpinsliki Gasket 用に書き換え
const SQRT3 = Math.sqrt(3);
const EPSILON = 1e-9;

const clampUnit = (value) => (value < 0 ? 0 : value > 1 ? 1 : value);

const barycentricIterations = (x, y, maxIterations) => {
  const dx = x + 1;
  const dy = y;

  // 三角形の重心座標を計算
  const b = (3 * dx - dy * SQRT3) / 6;
  const c = (dy * SQRT3) / 3;
  const a = 1 - b - c;

  // 負の値が含まれている場合は三角形の外側とみなす
  if (a < -EPSILON || b < -EPSILON || c < -EPSILON) return 0;

  // 値が 0~1 の範囲に収まるように調整
  let u = clampUnit(a);
  let v = clampUnit(b);
  let w = clampUnit(c);

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // 三角形の内側に入ったら反復回数を返す
    if (u <= 0.5 && v <= 0.5 && w <= 0.5) return iteration + 1;

    // 重心座標を拡大してどのサブ三角形に入るかを判定
    if (u > 0.5) {
      u = 2 * u - 1;
      v = 2 * v;
      w = 2 * w;
    } else if (v > 0.5) {
      const nextU = 2 * u;
      const nextV = 2 * v - 1;
      const nextW = 2 * w;
      u = nextU;
      v = nextV;
      w = nextW;
    } else if (w > 0.5) {
      const nextU = 2 * u;
      const nextV = 2 * v;
      const nextW = 2 * w - 1;
      u = nextU;
      v = nextV;
      w = nextW;
    } else {
      return maxIterations;
    }

    // 値が 0~1 の範囲に収まるように調整
    u = clampUnit(u);
    v = clampUnit(v);
    w = clampUnit(w);
  }

  return maxIterations;
};

onmessage = function (message) {
  // キャンバス側で計算したタイル情報と中心座標を受け取り、各ピクセルの反復回数を算出する
  const { tile, x0, y0, perPixel, maxIterations } = message.data;
  const { width, height } = tile;

  const imageData = new ImageData(width, height);
  const iterations = new Uint32Array(imageData.data.buffer);

  let index = 0;
  let max = 0;
  let min = maxIterations;

  for (let row = 0; row < height; row++) {
    const y = y0 + row * perPixel;
    for (let column = 0; column < width; column++) {
      const x = x0 + column * perPixel;
      const mirroredY = 1.44 - y; // 出力上下の位置を調整
      const count = barycentricIterations(x, mirroredY, maxIterations);
      iterations[index++] = count;
      if (count > max) max = count;
      if (count < min) min = count;
    }
  }

  postMessage({ tile, imageData, min, max });
};
