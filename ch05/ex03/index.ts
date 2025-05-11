export const is31DayMonthIf = (month: string): boolean => {
  if (['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'].includes(month))
    return true;
  else if (['Feb', 'Apr', 'Jun', 'Sep', 'Nov'].includes(month)) return false;
  else throw new Error(`Invalid month: ${month}`);
};

export const is31DayMonthSwitch = (month: string): boolean => {
  switch (month) {
    case 'Jan':
    case 'Mar':
    case 'May':
    case 'Jul':
    case 'Aug':
    case 'Oct':
    case 'Dec':
      return true;
    case 'Feb':
    case 'Apr':
    case 'Jun':
    case 'Sep':
    case 'Nov':
      return false;
    default:
      throw new Error(`Invalid month: ${month}`);
  }
};
