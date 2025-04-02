import { Point } from './index.ts';

describe('Point class', () => {
  test('add method should correctly add x and y values', () => {
    const point1 = new Point(1, 2);
    const point2 = new Point(3, 4);

    point1.add(point2);

    expect(point1.x).toBe(4);
    expect(point1.y).toBe(6);
  });
});
