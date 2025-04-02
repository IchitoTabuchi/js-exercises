class Point {
  constructor(
    public x: number,
    public y: number
  ) {}

  add(p: Point): void {
    this.x += p.x;
    this.y += p.y;
  }
}

export { Point };
