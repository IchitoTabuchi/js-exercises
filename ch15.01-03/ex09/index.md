# React の XSS 対策

JSX内の式埋め込みでは、基本的にHTMLとして解釈されないようエスケープが実行されるため、典型的な「入力値をそのまま HTML に埋め込んでしまう」系の XSS を防ぐことができる。

# React の XSS脆弱性

- `dangerouslySetInnerHTML` を使用した場合

  HTML をそのまま挿入するための仕組みあり、サニタイズされないため攻撃者が用意した悪意ある HTML/JavaScript を埋め込んでしまうと XSS が成立する。

- 危険な JavaScript を挿入した場合

  `eval` のような任意のコードがそのまま実行される脆弱性を持つ関数を使用すると、XSS が成立する可能性がある。

# 参考

https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de
