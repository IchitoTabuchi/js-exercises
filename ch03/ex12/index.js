"use strict";
class Example {
    valueOf() {
        return 24;
    }
    toString() {
        return 'Hello, world!';
    }
}
const obj = new Example();
// console.log(Number(obj) + 1);
// console.log((obj as number) * 2);
// 以下もvalueofが呼ばれる
console.log(+obj);
console.log(obj + '');
// console.log(String(obj));
console.log(`${obj}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxPQUFPO0lBQ1gsT0FBTztRQUNMLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBRTFCLGdDQUFnQztBQUNoQyxvQ0FBb0M7QUFDcEMsa0JBQWtCO0FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUV0Qiw0QkFBNEI7QUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMifQ==