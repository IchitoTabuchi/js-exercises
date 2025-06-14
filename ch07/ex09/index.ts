// node --loader ts-node/esm ch07/ex09/index.ts

const toUnicodeEscape = (str: string) =>
  Array.from(str)
    .map((ch) => {
      const cp = ch.codePointAt(0)!;
      return cp > 0xffff
        ? `\\u{${cp.toString(16)}}`
        : `\\u${cp.toString(16).padStart(4, '0')}`;
    })
    .join(' + ');

console.log('\n𠮷野家 => ', toUnicodeEscape('𠮷野家'));
console.log('"𠮷野家"[0] => ', '𠮷野家'[0]);

console.log('\n👨‍👨‍👧‍👧 => ', toUnicodeEscape('👨‍👨‍👧‍👧'));
console.log('"👨‍👨‍👧‍👧"[0] => ', '👨‍👨‍👧‍👧'[0]);
