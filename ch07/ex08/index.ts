// ゼロ幅接合子：\u200Dで表され、複数の絵文字を結合して一つの絵文字にする。
// Intl.Segmenter：文字を書式素単位（復号文字を一つ文字で扱う）で処理する。

export const reverse = (str: string): string => {
  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
  const segments = Array.from(segmenter.segment(str), (s) => s.segment);
  return segments.reverse().join('');
};
