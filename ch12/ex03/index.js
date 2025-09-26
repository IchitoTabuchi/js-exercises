export function* resettableCounter() {
    let count = 0;
    while (true) {
        try {
            yield count++;
        }
        catch (e) {
            if (e === 'reset')
                count = -1; // 次のyieldで0にするため
            else
                throw e;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFNBQVMsQ0FBQyxDQUFDLGlCQUFpQjtJQUNoQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDO1lBQ0gsTUFBTSxLQUFLLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxLQUFLLE9BQU87Z0JBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCOztnQkFDM0MsTUFBTSxDQUFDLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMifQ==