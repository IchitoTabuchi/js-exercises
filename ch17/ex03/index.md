# npm に同梱されている npx を利用することにはどのような利点があるのか説明しなさい。

## 概要

npx は Node Package eXecute の略で、Node.js パッケージを一時的に実行する場合や、インストールせずにコマンドラインツールを実行する場合などに使用される。

## ユースケース

- 一時的なパッケージのインストールと実行を行う場合

```bash
# create-react-app は React アプリを作成する場合にのみ使用できればよいので、npx で実行することでグローバルインストールせずに済み、ディスクスペースの節約になる。
npx create-react-app my-app
```

- パッケージの特定のバージョンを一時的に実行したい場合

```bash
# 例: ESLint の特定のバージョンを試したいときに、npx で実行することで環境汚染を防ぐことができる。
npx eslint@7.32.0 myfile.js
```

- ローカルにインストールされたパッケージを実行する場合

```bash
# 例: 実行可能ファイルへのパスを指定することなく、npx で簡単に実行できる。
npx eslint .
```

## 参考

- https://docs.npmjs.com/cli/v8/commands/npx
- https://www.geeklibrary.jp/counter-attack/npx/
