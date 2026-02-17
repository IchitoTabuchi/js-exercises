# ESLint と Prettier は昨今よく使われおり、併用されることもよくある。この二つを package.json に[scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts)を追加してそれぞれ実行できるようにしなさい。追加した Prettier の scripts 実行時は警告が表示されるだけでなく、コードの修正がされるようオプションで設定すること。

```json
"scripts": {
  "lint": "eslint ex01",
  "format": "prettier --write ex01" // --write オプションを追加して、コードの修正も行うようにする。
}
```

# [Prettier vs. Linters](https://prettier.io/docs/en/comparison.html)にあるように ESLint ではバグ検知のための検知を、フォーマットに関しては Prettier で行うようにすること。

# ESLint、Prettier の各種設定はプロジェクトで採用したスタイルによって設定すべき内容も変わるが、ここでは設定の練習として[Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)になるべく従うように設定しなさい。

## ESLintの設定

```js
      // 4.8.1 Block comment style
      'spaced-comment': ['error', 'always'], // コメントの後にスペース

      // 5.1 Local variable declarations
      'no-var': 'error', // varの使用禁止
      'prefer-const': 'error', // 再代入しない変数はconstを使用

      // 5.1.2 One variable per declaration
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 未使用変数の警告

      // 5.2.2 Do not use the variadic Array constructor
      'no-array-constructor': 'error', // Array()ではなく[]を使用

      // 5.3.2 Do not use the Object constructor
      'no-new-object': 'error', // Object()ではなく{}を使用

      // 5.5 関数
      'no-confusing-arrow': ['error', { allowParens: true }], // 紛らわしいアロー関数の禁止
      'prefer-rest-params': 'error', // argumentsではなくrestパラメータを使用
      'prefer-spread': 'error', // .apply()ではなくspread演算子を使用

      // 5.5.3 Arrow functions
      'prefer-arrow-callback': 'error', // アロー関数の使用を推奨

      // 5.6 文字列
      'prefer-template': 'error', // 文字列連結ではなくテンプレートリテラルを使用
      'no-useless-escape': 'error', // 不要なエスケープの禁止

      // 5.8 Control structures
      curly: ['error', 'all'], // すべての制御構造にブレースを使用

      // 5.11 Disallowed features
      'no-with': 'error', // with文の禁止
      'no-eval': 'error', // evalの禁止
      'no-implied-eval': 'error', // 暗黙的なevalの禁止
      'no-new-func': 'error', // new Function()の禁止
      'no-new-wrappers': 'error', // new String/Number/Booleanの禁止

      // 6.2 Rules by identifier type
      camelcase: ['error', { properties: 'never' }], // camelCase命名規則
      'new-cap': ['error', { capIsNew: false }], // コンストラクタは大文字開始
```

## Prettierの設定

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

`eslint-config-prettier`を使用することで、ESLintとPrettierの競合するルールを無効化し、両者を協調して使用できる。

# 実行確認用のファイルとして `ex01` に`format_sample.js` と `lint_sample.js` を用意した。それぞれのファイルに追加した scripts を実行し、lint の警告は修正しなさい。

`npm run lint` と `npm run format` を実行して、lint と format の両方を確認した。

## lint_sample.jsの修正

### 修正前

```javascript
let a, x, y;
const r = 10;

with (Math) {
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}
```

### 修正後

```javascript
const r = 10;

const a = Math.PI * r * r;
const x = r * Math.cos(Math.PI);
const y = r * Math.sin(Math.PI / 2);
```

# ただし `format_sample.js` は lint の警告を修正するのではなく、ESLint の設定で lint 対象から除外し、警告がでないようにすること。

`eslint.config.js`の`ignores`配列に`ex01/format_sample.js`を追加することで、このファイルをlint対象から除外した。
