import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // ブラウザ環境
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        Audio: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        // Node.js環境
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        // ES2021
        Promise: 'readonly',
        Set: 'readonly',
        Map: 'readonly',
        Symbol: 'readonly',
        // Jest
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        test: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Google JavaScript Style Guide
      // https://google.github.io/styleguide/jsguide.html

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
    },
  },
  // Prettierとの競合回避（フォーマットルールを無効化）
  prettier,
  {
    // lint対象外
    ignores: ['ex01/format_sample.js'],
  },
];
