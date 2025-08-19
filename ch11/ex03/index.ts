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
