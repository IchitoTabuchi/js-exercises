"use strict";
// node --loader ts-node/esm ch04/ex07/index.ts
/*
 * undefined ==> undefined
 * null ==> object
 * オブジェクト ==> object
 * NaN ==> number
 * 数値 ==> number
 * 関数 ==> function
 */
console.log('typeof undefined:', typeof undefined);
console.log('typeof null:', typeof null);
console.log('typeof {}:', typeof {});
console.log('typeof NaN:', typeof NaN);
console.log('typeof 42:', typeof 42);
console.log('typeof function() {}:', typeof function () { });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBRS9DOzs7Ozs7O0dBT0c7QUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sU0FBUyxDQUFDLENBQUM7QUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQztBQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLE9BQU8sY0FBYSxDQUFDLENBQUMsQ0FBQyJ9