"use strict";
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
for (const key in obj)
    console.log(key, obj[key]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBRS9DLE1BQU0sS0FBSyxHQUFHO0lBQ1osQ0FBQyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQjtJQUN6QyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCO0lBQ3pDLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUI7SUFDNUMsR0FBRyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQjtDQUM3QyxDQUFDO0FBRUYsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVqQyx1Q0FBdUM7QUFDdkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO0FBRTVCLHFDQUFxQztBQUNyQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7QUFFMUIseUNBQXlDO0FBQ3pDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7QUFFL0Isa0NBQWtDO0FBQ2xDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtJQUNoQyxLQUFLLEVBQUUsU0FBUztJQUNoQixVQUFVLEVBQUUsS0FBSztDQUNsQixDQUFDLENBQUM7QUFFSCx1Q0FBdUM7QUFDdkMsR0FBRyxDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQztBQUUzQixLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUc7SUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyJ9