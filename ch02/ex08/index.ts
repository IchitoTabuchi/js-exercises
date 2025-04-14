// node --loader ts-node/esm ch02/ex08/index.ts

import * as acorn from 'acorn';
import chalk from 'chalk';

const printAST = (
  node: any,
  indent: string = '',
  isLast: boolean = true
): void => {
  const marker: string = isLast ? '└──' : '├──';
  const nodeLabel: string = chalk.blueBright(node.type);

  let extra: string = '';
  if (node.type === 'Identifier') extra = ` (${chalk.green(node.name)})`;
  else if (node.type === 'Literal')
    extra = ` (${chalk.yellow(JSON.stringify(node.value))})`;

  console.log(indent + marker + ' ' + nodeLabel + extra);

  const newIndent: string = indent + (isLast ? '    ' : '│   ');

  const childKeys: string[] = Object.keys(node).filter(
    (key) =>
      typeof node[key] === 'object' && // 子ノード
      node[key] !== null && // nullもobject扱いなのでフィルタリング
      key !== 'loc' && // ノードがソースコードのどの行・列にあるか
      key !== 'range' // ノードがソースコードのどの文字インデックスの範囲にあるか
  );

  const children: any[] = childKeys
    .map((key) => node[key])
    .flat()
    .filter(
      (child) => typeof child === 'object' && child !== null && 'type' in child
    );

  children.forEach((child, index) => {
    printAST(child, newIndent, index === children.length - 1);
  });
};

const code = `
let a
a
=
3
console.log(a)
`;

const code2 = `
let a; a = 3; console.log(a);
`;

const ast = acorn.parse(code, { ecmaVersion: 2020 });
const json1 = JSON.stringify(ast, null, 2);
console.log(chalk.bold('AST of code1:'));
console.log(json1);
console.log(chalk.bold('\nAST Tree View (code 1):\n'));
printAST(ast);

const ast2 = acorn.parse(code2, { ecmaVersion: 2020 });
const json2 = JSON.stringify(ast2, null, 2);
console.log(chalk.bold('\nAST of code2:'));
console.log(json2);
console.log(chalk.bold('\nAST Tree View (code 2):\n'));
printAST(ast2);

// 以下は旧問題の回答

// import * as acorn from 'acorn';
// import type { Token } from 'acorn';

// export const removeSemicolons = (code: string): string => {
//   const tokens: Token[] = [];

//   acorn.parse(code, {
//     ecmaVersion: 'latest',
//     onToken: tokens,
//   });

//   let result = '';
//   let lastIndex = 0;

//   for (const token of tokens) {
//     if (token.type.label === ';') {
//       result += code.slice(lastIndex, token.start);
//       lastIndex = token.end;
//     }
//   }

//   result += code.slice(lastIndex);

//   return result;
// };

// const input = `
// let a = 1;
// let b = 2;
// console.log(a + b);
// `;

// console.log('Before:\n' + input);
// console.log('\nAfter:\n' + removeSemicolons(input));
