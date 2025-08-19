export const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();

export const countWeekdays = (startDate: string, endDate: string): number => {
  let count = 0;
  for (
    let d = new Date(startDate);
    d <= new Date(endDate);
    d.setDate(d.getDate() + 1)
  ) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) count++;
  }
  return count;
};

export const getWeekday = (date: string, locale: string): string =>
  new Date(date).toLocaleDateString(locale, { weekday: 'long' });

export const getFirstDayOfLastMonth = (): Date => {
  const now = new Date();
  const firstThisMonth = new Date(
    now.getFullYear(),
    now.getDate() > 0 ? now.getMonth() : now.getMonth() + 1,
    1
  );
  const lastMonth = new Date(firstThisMonth.getTime() - 86_400_000);
  return new Date(
    lastMonth.getFullYear(),
    lastMonth.getDate() > 0 ? lastMonth.getMonth() : lastMonth.getMonth() + 1,
    1
  );
};
