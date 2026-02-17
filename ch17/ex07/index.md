# TypeScriptのトランスパイルは`@babel/preset-typescript`や`tsc`によって可能だが、それぞれの違いを調べなさい。

## @babel/preset-typescript`

### 概要

Babel のプリセットとして提供される TypeScript トランスパイラ。

### メリット

- トランスパイルが高速である。
- Babel のプラグインを使用してコードの最適化を行うことができる。

### デメリット

- 型チェックが行われない。
- const enum など一部のTypeScript機能がサポートされていない。

## tsc (TypeScript Compiler)

### 概要

TypeScript公式のコンパイラ。

### メリット

- 完全な型チェックが行われる。
- TypeScriptの全機能がサポートされている。

### デメリット

- トランスパイル速度が遅い。
- Babel のプラグインを利用したコードの最適化が行えない。

## まとめ

- 基本的には tsc だけを使用すればよい。
- 設定が複雑になるが、Babel でトランスパイルを実行し、tsc で型チェックを並列実行するハイブリッドアプローチも可能ではある。

## 参考

- https://blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/#differences-between-babel-typescript
