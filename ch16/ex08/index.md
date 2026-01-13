# GitHub の REST API を利用して Issue を操作するコマンドラインツールを実装しなさい。最低限以下の要件を満たすこと。

- 入力はコマンドライン引数から受け取る
- Issue を作成できる
- 指定した Issue をクローズできる
- オープンな Issue の Id と Title の一覧を表示できる
- `-h`または`--help`オプションで使い方が確認できる
- `-v`または`--verbose`オプションで HTTP ログを出力する

## コマンド

### コマンドラインツールの起動

```bash
node index.js
```

### Issue の作成

```bash
create "Issue title" "Issue body"
```

![alt text](image-2.png)

#### Issueのクローズ

```bash
close "Issue の ID"
```

![alt text](image-4.png)

#### オープンな Issue の Id と Title の一覧の表示

```bash
list
```

![alt text](image-3.png)

### ヘルプの表示

```bash
-h
--help
```

![alt text](image.png)

### Verboseモード (HTTPリクエスト/レスポンスのログを表示)

```bash
-v
--verbose
```

![alt text](image-1.png)

### コマンドラインツールの終了

```bash
exit
quit
```
