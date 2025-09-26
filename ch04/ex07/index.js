"use strict";
// node --loader ts-node/esm ch04/ex07/index.ts
function set42(key) {
    eval(`${key} = 42;`);
}
set42("(()=>{ while(true) console.log('danger!!!!!!!!!!') })()");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQStDO0FBRS9DLFNBQVMsS0FBSyxDQUFDLEdBQVc7SUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBRUQsS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUMifQ==