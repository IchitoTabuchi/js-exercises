/* eslint-disable no-constant-condition */
export async function retryWithExponentialBackoff(func, maxRetry) {
    let attempt = 0;
    while (true) {
        try {
            return await func();
        }
        catch (err) {
            if (attempt++ >= maxRetry)
                throw err;
            const delay = 1000 * 2 ** attempt;
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQ0FBMEM7QUFDMUMsTUFBTSxDQUFDLEtBQUssVUFBVSwyQkFBMkIsQ0FDL0MsSUFBc0IsRUFDdEIsUUFBZ0I7SUFFaEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUM7WUFDSCxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJLE9BQU8sRUFBRSxJQUFJLFFBQVE7Z0JBQUUsTUFBTSxHQUFHLENBQUM7WUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUM7WUFDbEMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyJ9