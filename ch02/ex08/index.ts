import * as acorn from 'acorn';
import type { Token } from 'acorn';

export const removeSemicolons = (code: string): string => {
  const tokens: Token[] = [];

  acorn.parse(code, {
    ecmaVersion: 'latest',
    onToken: tokens,
  });

  let result = '';
  let lastIndex = 0;

  for (const token of tokens) {
    if (token.type.label === ';') {
      result += code.slice(lastIndex, token.start);
      lastIndex = token.end;
    }
  }

  result += code.slice(lastIndex);

  return result;
};

const input = `
let a = 1;
let b = 2;
console.log(a + b);
`;

console.log('Before:\n' + input);
console.log('\nAfter:\n' + removeSemicolons(input));
