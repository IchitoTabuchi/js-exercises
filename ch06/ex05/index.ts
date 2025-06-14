// node --loader ts-node/esm ch06/ex05/index.ts

const proto = {
  1: 'proto number one', // プロパティ名が数値のプロパティ
  2: 'proto number two', // プロパティ名が数値のプロパティ
  one: 'proto string one', // プロパティ名が文字列のプロパティ
  two: 'proto string two', // プロパティ名が文字列のプロパティ
};

const obj = Object.create(proto);

// プロパティ名が数値かつプロトタイプの数値プロパティと同名でないプロパティ
obj[3] = 'own number three';

// プロパティ名が数値かつプロトタイプの数値プロパティと同名のプロパティ
obj[1] = 'own number one';

// プロパティ名が文字列かつプロトタイプの文字列プロパティと同名でないプロパティ
obj.three = 'own string three';

// 列挙不可かつプロトタイプの列挙可能プロパティと同名のプロパティ
Object.defineProperty(obj, 'two', {
  value: 'own two',
  enumerable: false,
});

// プロパティ名が文字列かつプロトタイプの文字列プロパティと同名のプロパティ
obj.one = 'own string one';

for (const key in obj) console.log(key, obj[key]);
