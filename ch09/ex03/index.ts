export const PositiveNumber = (x: number) => {
  if (Number.isNaN(x) || x <= 0) throw new Error('require : x > 0');

  let _x = x;

  return {
    getX: () => _x,
    setX: (newX: number) => {
      if (Number.isNaN(newX) || newX <= 0) throw new Error('require : x > 0');
      _x = newX;
    },
  };
};
