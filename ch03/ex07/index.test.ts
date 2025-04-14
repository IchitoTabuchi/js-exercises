// npm test ch03/ex07

import { equalArrays } from './index.ts';

test('ch03-ex07', () => {
  const x = { length: 1, 0: 1 };
  const y = [1];

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
