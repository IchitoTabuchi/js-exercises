# デバッグ手順

1. デバッグしたい箇所にdebugger文を挿入する。

   ![Alt text](image.png)

2. 「--inspect-brk」句を加えてnode実行する。

![Alt text](image-1.png)

3. 「chrome://inspect」にアクセスする。

![Alt text](image-2.png)

4. 「Remote Target」に実行中のファイルが表示されるので、「inspect」を押下する。

![Alt text](image-3.png)

5. 右上の実行ボタンを押下すると、debugger文まで処理が進み、途中結果が出力される。

![Alt text](image-4.png)
