/* eslint-disable @typescript-eslint/no-explicit-any */
export function addMyCall(f) {
    f.myCall = function (thisArg, ...args) {
        return this.bind(thisArg)(...args);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1REFBdUQ7QUFDdkQsTUFBTSxVQUFVLFNBQVMsQ0FBb0MsQ0FBSTtJQUU3RCxDQUNELENBQUMsTUFBTSxHQUFHLFVBRVQsT0FBWSxFQUNaLEdBQUcsSUFBbUI7UUFFdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyJ9