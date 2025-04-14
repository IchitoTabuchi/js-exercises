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

export const slice = (
  str: string,
  start: number = 0,
  end: number = str.length
): string => {
  start = start < 0 ? Math.max(str.length + start, 0) : start;
  end = end < 0 ? Math.max(str.length + end, 0) : end;
  return str.slice(start, end);
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
