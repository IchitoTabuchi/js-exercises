export const retryWithExponentialBackoff = (func, maxRetry, callback) => {
    let attempt = 0;
    const tryFunc = () => {
        if (func())
            return callback(true);
        if (attempt++ >= maxRetry)
            return callback(false);
        setTimeout(tryFunc, 1000 * 2 ** attempt);
    };
    tryFunc();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRyxDQUN6QyxJQUFtQixFQUNuQixRQUFnQixFQUNoQixRQUFtQyxFQUM3QixFQUFFO0lBQ1IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRWhCLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtRQUNuQixJQUFJLElBQUksRUFBRTtZQUFFLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxFQUFFLElBQUksUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7SUFFRixPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQyJ9