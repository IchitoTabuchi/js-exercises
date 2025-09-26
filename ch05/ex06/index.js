// node --loader ts-node/esm ch05/ex06/index.ts
export const tryCatchFinallyWithError = () => {
    try {
        console.log('try');
        throw new Error();
    }
    catch (err) {
        console.log('catch');
    }
    finally {
        console.log('finally');
    }
    console.log('after try-catch-finally');
};
export const tryCatchFinallyWithoutError = () => {
    try {
        console.log('try');
    }
    catch (err) {
        console.log('catch');
    }
    finally {
        console.log('finally');
    }
    console.log('after try-catch-finally');
};
console.log('\ntry-catch-finally with an error');
tryCatchFinallyWithError();
console.log('\ntry-catch-finally without an error');
tryCatchFinallyWithoutError();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQ0FBK0M7QUFFL0MsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUcsR0FBUyxFQUFFO0lBQ2pELElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO1lBQVMsQ0FBQztRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxHQUFTLEVBQUU7SUFDcEQsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztZQUFTLENBQUM7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQ2pELHdCQUF3QixFQUFFLENBQUM7QUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3BELDJCQUEyQixFQUFFLENBQUMifQ==