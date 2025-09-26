// applyを使う。理由オブジェクトのメソッドが渡されたときに、thisが参照できないというエラーが発生するため。
export function any(...predicates) {
    return (arg) => predicates.some((fn) => fn(arg));
}
export function catching(fn, errorHandler) {
    return (arg) => {
        try {
            return fn(arg);
        }
        catch (e) {
            return errorHandler(e);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFFM0QsTUFBTSxVQUFVLEdBQUcsQ0FDakIsR0FBRyxVQUFzQztJQUV6QyxPQUFPLENBQUMsR0FBTSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FDdEIsRUFBaUIsRUFDakIsWUFBbUM7SUFFbkMsT0FBTyxDQUFDLEdBQU0sRUFBRSxFQUFFO1FBQ2hCLElBQUksQ0FBQztZQUNILE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNILENBQUMsQ0FBQztBQUNKLENBQUMifQ==