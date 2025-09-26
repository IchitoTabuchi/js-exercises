# ディレクトリ構成

1. ex02/main
   `index.html`...「モジュールを読み込む」ボタンを表示する。
   `index.js`...ボタンを押下したときの処理として、`module.js`を動的インポートで読み込む。
2. ex02/module
   `module.js`...動的インポートで読み込まれるファイル

# 動作確認

1.  `npx serve -l 3000 ./ch15.01-03/ex02/main`を実行し、localhost:3000を起動する。
2.  以下のいずれかの方法で、CORS設定がONの状態でlocalhost:4000を起動する。

    - `--cors`オプションを付けてサーバーを起動する。(`npx serve -l 4000 --cors ./ch15.01-03/ex02/module`)
    - CORS設定を記述した`module/serve.js`を使用してサーバーを起動する。(`node ch15.01-03/ex02/module/server.js`)

3.  localhost:3000にアクセスし、開発者ツールのコンソールを開く。
4.  「モジュールを読み込む」ボタンを押下すると、コンソールに`module.js`の関数を実行した結果が表示される。
    ![alt text](image.png)

    (参考) CORS設定がOFFの場合は以下のエラーが表示される。
    ![alt text](image-1.png)
