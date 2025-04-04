// npm test ch03/ex04

describe('Hundred Points Symbol Emoji Tests', () => {
  const emoji = '💯';
  const utf16 = '\uD83D\uDCAF';
  const utf32 = '\u{0001F4AF}';

  test('💯 emoji length should be 2', () => {
    expect(emoji.length).toBe(2);
  });

  test('UTF-16 representation should match emoji', () => {
    expect(utf16).toBe(emoji);
  });

  test('UTF-32 representation should match emoji', () => {
    expect(utf32).toBe(emoji);
  });
});
