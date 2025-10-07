export class Hiragana {
  #char: string;
  #code: number;

  constructor(char: string) {
    if (!/^[\u3041-\u3096]$/.test(char))
      throw new Error(
        'Specified character is not a single hiragana character.'
      );

    this.#char = char;
    this.#code = char.charCodeAt(0);
  }

  get char() {
    return this.#char;
  }

  get code() {
    return this.#code;
  }

  [Symbol.toPrimitive](type: string) {
    if (type === 'number') return this.#code;
    return this.#char;
  }
}
