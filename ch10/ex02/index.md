# AMD (Asynchronous Module Definition)

RequireJS などで採用された方式。

define(["dep1", "dep2"], function (dep1, dep2) { ... }) のように依存関係を非同期で読み込み可能。

ブラウザ側でモジュール形式が使えるようにした仕様

## AMDの課題

- 記述が冗長
- サーバ側と互換性が無い
- 多くの細かいファイルをロードするため、HTTP1.1ではパフォーマンスに影響あり

# UMD (Universal Module Definition)

AMD と CommonJS を両立させる目的で作られた方式。

どの環境（Node.js, ブラウザ, RequireJS など）でも同じモジュールが使えるようにラップした形。

ライブラリ配布のためによく使われていた。

# SystemJS / System.register

ES Modules が正式導入される前のES5で、モジュールを統一的に扱うためのローダ仕様。

System.register([...], function (\_export) { ... }) のように書かれる。

ES Module 互換を意識して設計された。

# 参考

https://zenn.dev/ebi_yu/scraps/db4c7d1f3e883a
