export const littleToBig = (a: Uint32Array): Uint32Array =>
  new Uint32Array(
    a.map(
      (v) =>
        ((v & 0xff) << 24) |
        ((v & 0xff00) << 8) |
        ((v >>> 8) & 0xff00) |
        (v >>> 24)
    )
  );

export const bigToLittle = (a: Uint32Array): Uint32Array => littleToBig(a);

// 出題意図としてはDataViewのバイトオーダーを変換する関数を実装です。

export const littleToBigDataView = (a: Uint32Array): Uint32Array => {
  const buf = new ArrayBuffer(a.length * 4);
  const view = new DataView(buf);

  a.forEach((_, i) => {
    const val = new DataView(a.buffer).getUint32(i * 4, true); // little endian 読み込み
    view.setUint32(i * 4, val, false); // big endian 書き込み
  });

  return new Uint32Array(buf);
};

export const bigToLittleDataView = (a: Uint32Array): Uint32Array => {
  const buf = new ArrayBuffer(a.length * 4);
  const view = new DataView(buf);

  a.forEach((_, i) => {
    const val = new DataView(a.buffer).getUint32(i * 4, false); // big endian 読み込み
    view.setUint32(i * 4, val, true); // little endian 書き込み
  });

  return new Uint32Array(buf);
};
