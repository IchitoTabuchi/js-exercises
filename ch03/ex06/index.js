// export const substring = (
//   str: string,
//   start: number = 0,
//   end: number = str.length
// ): string => {
//   start = Math.max(0, start);
//   end = end === undefined ? str.length : isNaN(end) ? 0 : Math.max(0, end);
//   if (start > end) [start, end] = [end, start];
//   return str.slice(start, end);
// };
export const slice = (str, start = 0, end = str.length) => {
    const length = str.length;
    start = Math.floor(Number.isNaN(start) ? 0 : start);
    end = Math.floor(Number.isNaN(end) ? 0 : end);
    start = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
    end = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);
    if (end < start)
        return '';
    let result = '';
    for (let i = start; i < end; i++)
        result += str[i];
    return result;
};
// export const padStart = (
//   str: string,
//   targetLength: number,
//   padString: string = ' '
// ): string => {
//   const padNeeded: number = targetLength - str.length;
//   if (padNeeded <= 0) return str;
//   return (
//     padString
//       .repeat(Math.ceil(padNeeded / padString.length))
//       .slice(0, padNeeded) + str
//   );
// };
// export const trim = (str: string): string => str.replace(/^\s+|\s+$/g, '');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCLHVCQUF1QjtBQUN2Qiw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCLGdDQUFnQztBQUNoQyw4RUFBOEU7QUFDOUUsa0RBQWtEO0FBQ2xELGtDQUFrQztBQUNsQyxLQUFLO0FBRUwsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQ25CLEdBQVcsRUFDWCxRQUFnQixDQUFDLEVBQ2pCLE1BQWMsR0FBRyxDQUFDLE1BQU0sRUFDaEIsRUFBRTtJQUNWLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFFMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRWxFLElBQUksR0FBRyxHQUFHLEtBQUs7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUU7UUFBRSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5ELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGLDRCQUE0QjtBQUM1QixpQkFBaUI7QUFDakIsMEJBQTBCO0FBQzFCLDRCQUE0QjtBQUM1QixpQkFBaUI7QUFDakIseURBQXlEO0FBQ3pELG9DQUFvQztBQUVwQyxhQUFhO0FBQ2IsZ0JBQWdCO0FBQ2hCLHlEQUF5RDtBQUN6RCxtQ0FBbUM7QUFDbkMsT0FBTztBQUNQLEtBQUs7QUFFTCw4RUFBOEUifQ==