// node --loader ts-node/esm ch02/ex08/index.ts
import * as acorn from 'acorn';
import chalk from 'chalk';
const printAST = (node, indent = '', isLast = true) => {
    const marker = isLast ? '└──' : '├──';
    const nodeLabel = chalk.blueBright(node.type);
    let extra = '';
    if (node.type === 'Identifier')
        extra = ` (${chalk.green(node.name)})`;
    else if (node.type === 'Literal')
        extra = ` (${chalk.yellow(JSON.stringify(node.value))})`;
    console.log(indent + marker + ' ' + nodeLabel + extra);
    const newIndent = indent + (isLast ? '    ' : '│   ');
    const childKeys = Object.keys(node).filter((key) => typeof node[key] === 'object' && // 子ノード
        node[key] !== null && // nullもobject扱いなのでフィルタリング
        key !== 'loc' && // ノードがソースコードのどの行・列にあるか
        key !== 'range' // ノードがソースコードのどの文字インデックスの範囲にあるか
    );
    const children = childKeys
        .map((key) => node[key])
        .flat()
        .filter((child) => typeof child === 'object' && child !== null && 'type' in child);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQ0FBK0M7QUFFL0MsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRTFCLE1BQU0sUUFBUSxHQUFHLENBQ2YsSUFBUyxFQUNULFNBQWlCLEVBQUUsRUFDbkIsU0FBa0IsSUFBSSxFQUNoQixFQUFFO0lBQ1IsTUFBTSxNQUFNLEdBQVcsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM5QyxNQUFNLFNBQVMsR0FBVyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV0RCxJQUFJLEtBQUssR0FBVyxFQUFFLENBQUM7SUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVk7UUFBRSxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2xFLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTO1FBQzlCLEtBQUssR0FBRyxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBRTNELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBRXZELE1BQU0sU0FBUyxHQUFXLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5RCxNQUFNLFNBQVMsR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FDbEQsQ0FBQyxHQUFH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