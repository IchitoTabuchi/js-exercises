export const PolarPoint = (r: number, theta: number) => {
  let _r = r;
  let _theta = theta;

  return Object.create(
    {},
    {
      r: {
        get() {
          return _r;
        },
        set(v: number) {
          _r = v;
        },
        enumerable: true,
      },
      theta: {
        get() {
          return _theta;
        },
        set(v: number) {
          _theta = v;
        },
        enumerable: true,
      },
      x: {
        get() {
          return _r * Math.cos(_theta);
        },
        set(v: number) {
          if (Number.isNaN(v)) throw new Error('Invalid value for x: NaN');
          const y = _r * Math.sin(_theta);
          _r = Math.hypot(v, y);
          _theta = Math.atan2(y, v);
        },
        enumerable: true,
      },
      y: {
        get() {
          return _r * Math.sin(_theta);
        },
        set(v: number) {
          if (Number.isNaN(v)) throw new Error('Invalid value for y: NaN');
          const x = _r * Math.cos(_theta);
          _r = Math.hypot(x, v);
          _theta = Math.atan2(v, x);
        },
        enumerable: true,
      },
    }
  );
};
