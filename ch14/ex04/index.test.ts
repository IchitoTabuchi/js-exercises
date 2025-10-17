import { Hiragana } from './index.ts';

describe('Hiragana', () => {
  it('sets properties correctly', () => {
    const h = new Hiragana('あ');
    expect(h.char).toBe('あ');
    expect(h.code).toBe('あ'.charCodeAt(0));
  });

  it('evaluates as string', () => {
    const h = new Hiragana('あ');
    expect(`${h}`).toBe('あ');
    expect(String(h)).toBe('あ');
  });

  it('evaluates as number', () => {
    const h = new Hiragana('あ');
    expect(+h).toBe('あ'.charCodeAt(0));
    expect(Number(h)).toBe('あ'.charCodeAt(0));
  });

  it('uses string for default', () => {
    const h = new Hiragana('え');
    expect(h + '').toBe('え');
    expect(h + 'です').toBe('えです');
  });

  it('compares with relational operators', () => {
    const a = new Hiragana('あ');
    const o = new Hiragana('お');
    expect(a < o).toBe(true);
    expect(a > o).toBe(false);
    expect(o > a).toBe(true);
  });

  it('sorts by UTF-16 order', () => {
    const arr = ['お', 'あ', 'う', 'え', 'い'].map((c) => new Hiragana(c));
    arr.sort();
    expect(arr.map((h) => h.char)).toEqual(['あ', 'い', 'う', 'え', 'お']);
  });

  it('throws for non-hiragana input', () => {
    expect(() => new Hiragana('A')).toThrow();
    expect(() => new Hiragana('ア')).toThrow();
    expect(() => new Hiragana('あい')).toThrow();
  });
});
