`writable: false`のプロパティに対して書き込みを行うと、エラーが発生する。（strictモード）

![Alt text](image.png)

`configurable: false`のプロパティに対して削除を行うと、エラーが発生する。（strictモード）

![Alt text](image-1.png)

`enumerable: false`のプロパティは列挙できない。

- `hasOwnProperty`でプロパティの存在は確認できる。
- `propertyIsEnumerable`の結果はfalseとなる。
- `Object.keys`でkeyを取り出せない。
- for文で無視される。

![Alt text](image-2.png)
