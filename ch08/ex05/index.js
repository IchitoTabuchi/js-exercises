export const sequenceToObject = (...values) => {
    if (values.length % 2)
        throw new Error('Invalid number of arguments. Expected even number of elements.');
    const result = {};
    for (let i = 0; i < values.length; i += 2) {
        const key = values[i];
        const value = values[i + 1];
        if (typeof key !== 'string')
            throw new Error(`Key at index ${i} is not a string: ${key}`);
        result[key] = value;
    }
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxDQUM5QixHQUFHLE1BQWlCLEVBQ0ssRUFBRTtJQUMzQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNuQixNQUFNLElBQUksS0FBSyxDQUNiLGdFQUFnRSxDQUNqRSxDQUFDO0lBRUosTUFBTSxNQUFNLEdBQTRCLEVBQUUsQ0FBQztJQUUzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDMUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFNUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=