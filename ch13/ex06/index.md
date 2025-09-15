# Deferred

- jQueryで非同期処理を扱うための独自オブジェクトで、ES6でPromiseが標準非同期処理として導入される以前に使用されていた。

| 特徴                 | jQuery.Deferred                             | ES6 Promise                                 |
| -------------------- | ------------------------------------------- | ------------------------------------------- |
| 状態変更             | `resolve()` / `reject()` で外部から変更可能 | コンストラクタ内でのみ `resolve` / `reject` |
| メソッド             | `.done()`, `.fail()`, `.always()`           | `.then()`, `.catch()`, `.finally()`         |
| 標準仕様             | 独自実装                                    | 標準仕様                                    |
| 後方互換性           | jQuery 1.x / 2.x                            | ES6 対応ブラウザ                            |
| 複数 Deferred の統合 | `$.when()`                                  | `Promise.all()`, `Promise.race()`           |
