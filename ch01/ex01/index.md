# 実行結果

![Alt text](image.png)

## メモ

npx ts-node ch01/ex01/hello.ts
で実行すると、
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"
が発生して失敗する。

node --loader ts-node/esm ch01/ex01/hello.ts
で実行すると成功する。
