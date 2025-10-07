export class IgnoreAccentPattern {
  #regex: RegExp;

  constructor(pattern: string | RegExp) {
    if (pattern instanceof RegExp)
      this.#regex = new RegExp(
        IgnoreAccentPattern.normalize(pattern.source), // source を normalize して RegExp 化
        pattern.flags // フラグはそのまま使用
      );
    else this.#regex = new RegExp(IgnoreAccentPattern.normalize(pattern)); // 文字列の場合はそのまま normalize して RegExp 化
  }

  // Unicode 正規化して分解し、 `\u0300-\u036f` の範囲を取り除く
  private static normalize = (str: string): string =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // normalize してから search する
  [Symbol.search] = (str: string): number =>
    IgnoreAccentPattern.normalize(str).search(this.#regex);

  // normalize してから match する
  [Symbol.match] = (str: string): RegExpMatchArray | null =>
    IgnoreAccentPattern.normalize(str).match(this.#regex);
}
