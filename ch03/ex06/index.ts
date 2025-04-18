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
  const length = str.length;

  start = Math.floor(Number.isNaN(start) ? 0 : start);
  end = Math.floor(Number.isNaN(end) ? 0 : end);

  start = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
  end = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);

  if (end < start) return '';

  let result = '';
  for (let i = start; i < end; i++) result += str[i];

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
