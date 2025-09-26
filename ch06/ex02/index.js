"use strict";
// node --loader ts-node/esm ch06/ex02/index.ts
const parent = {
    uniqueProperty: 'uniqueProperty',
};
const child = Object.create(parent);
console.log(Object.getPrototypeOf(child) === parent); // => true
console.log(child.uniqueProperty); // => "uniqueProperty"
console.log(child.hasOwnProperty('uniqueProperty')); // => false
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBRS9DLE1BQU0sTUFBTSxHQUFHO0lBQ2IsY0FBYyxFQUFFLGdCQUFnQjtDQUNqQyxDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVO0FBRWhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO0FBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXIn0=