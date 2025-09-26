"use strict";
// node --loader ts-node/esm ch06/ex04/index.ts
const obj = { foo: 0 };
Object.defineProperty(obj, 'foo', {
    value: 123,
    writable: false,
    enumerable: false,
    configurable: false,
});
console.log('Initial value:', obj.foo); // 123
// obj.foo = 456; // TypeError: Cannot assign to read only property 'foo' of object '#<Object>'が発生する。(writable: false → 上書き不可)
// delete obj.foo; // TypeError: Cannot delete property 'foo' of #<Object>が発生する。（configurable: false → 削除不可）
console.log('hasOwnProperty:', obj.hasOwnProperty('foo')); // true
console.log('propertyIsEnumerable:', obj.propertyIsEnumerable('foo')); // false (enumerable: false → 列挙不可)
console.log('Object.keys:', Object.keys(obj)); // [] (enumerable: false → 列挙不可)
for (const key in obj)
    console.log('for...in:', key); // 出力されない (enumerable: false → 列挙不可)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBSS9DLE1BQU0sR0FBRyxHQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBRTVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtJQUNoQyxLQUFLLEVBQUUsR0FBRztJQUNWLFFBQVEsRUFBRSxLQUFLO0lBQ2YsVUFBVSxFQUFFLEtBQUs7SUFDakIsWUFBWSxFQUFFLEtBQUs7Q0FDcEIsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNO0FBRTlDLDhIQUE4SDtBQUU5SCw0R0FBNEc7QUFFNUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO0FBRWxFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7QUFFMUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0NBQWdDO0FBRS9FLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRztJQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsb0NBQW9DIn0=