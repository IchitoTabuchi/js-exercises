"use strict";
// node --inspect-brk --loader ts-node/esm ch05/ex11/index.ts
const sum = (a, b) => {
    const result = a + b;
    debugger; // debugger文を挿入
    return result;
};
console.log(sum(5, 7));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkRBQTZEO0FBRTdELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFO0lBQ25DLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsUUFBUSxDQUFDLENBQUMsZUFBZTtJQUN6QixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9