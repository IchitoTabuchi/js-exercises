export class PolarPoint {
  constructor(
    private _r: number,
    private _theta: number
  ) {}

  get r() {
    return this._r;
  }

  set r(v: number) {
    this._r = v;
  }

  get theta() {
    return this._theta;
  }

  set theta(v: number) {
    this._theta = v;
  }

  get x() {
    return this._r * Math.cos(this._theta);
  }

  set x(v: number) {
    if (Number.isNaN(v)) throw new Error('Invalid value for x: NaN');
    const y = this.y;
    this._r = Math.hypot(v, y);
    this._theta = Math.atan2(y, v);
  }

  get y() {
    return this._r * Math.sin(this._theta);
  }

  set y(v: number) {
    if (Number.isNaN(v)) throw new Error('Invalid value for y: NaN');
    const x = this.x;
    this._r = Math.hypot(x, v);
    this._theta = Math.atan2(v, x);
  }
}
