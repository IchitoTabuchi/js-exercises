export type Complex = {
  re: number;
  im: number;
};

export const add = (a: Complex, b: Complex): Complex => {
  return {
    re: a.re + b.re,
    im: a.im + b.im,
  };
};

export const sub = (a: Complex, b: Complex): Complex => {
  return {
    re: a.re - b.re,
    im: a.im - b.im,
  };
};

export const mul = (a: Complex, b: Complex): Complex => {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
};

export const div = (a: Complex, b: Complex): Complex => {
  const denominator = b.re * b.re + b.im * b.im;
  if (!denominator) throw new Error('Division by zero');
  return {
    re: (a.re * b.re + a.im * b.im) / denominator,
    im: (a.im * b.re - a.re * b.im) / denominator,
  };
};
