import {
  countWeekdays,
  getDaysInMonth,
  getFirstDayOfLastMonth,
  getWeekday,
} from './index.ts';

describe('getDaysInMonth', () => {
  const cases = [
    { year: 2020, month: 2, expected: 29 },
    { year: 2021, month: 2, expected: 28 },
    { year: 2021, month: 1, expected: 31 },
    { year: 2021, month: 4, expected: 30 },
  ];

  cases.forEach(({ year, month, expected }) => {
    it(`returns ${expected} for ${year}-${month}`, () => {
      expect(getDaysInMonth(year, month)).toBe(expected);
    });
  });
});

describe('countWeekdays', () => {
  const cases = [
    { start: '2025-08-18', end: '2025-08-24', expected: 5 },
    { start: '2025-08-23', end: '2025-08-24', expected: 0 },
    { start: '2025-08-22', end: '2025-08-25', expected: 2 },
    { start: '2025-08-18', end: '2025-08-18', expected: 1 },
  ];

  cases.forEach(({ start, end, expected }) => {
    it(`counts weekdays from ${start} to ${end}`, () => {
      expect(countWeekdays(start, end)).toBe(expected);
    });
  });
});

describe('getWeekday', () => {
  const cases = [
    { date: '2025-08-18', locale: 'en-US', expected: 'Monday' },
    { date: '2025-08-18', locale: 'ja-JP', expected: '月曜日' },
    { date: '2025-08-17', locale: 'en-US', expected: 'Sunday' },
  ];

  cases.forEach(({ date, locale, expected }) => {
    it(`returns weekday for ${date} in ${locale}`, () => {
      expect(getWeekday(date, locale)).toBe(expected);
    });
  });
});

describe('getFirstDayOfLastMonth', () => {
  it('returns a Date object', () => {
    const d = getFirstDayOfLastMonth();
    expect(d).toBeInstanceOf(Date);
  });

  it('returns 1st day of last month at 00:00:00', () => {
    const d = getFirstDayOfLastMonth();
    const now = new Date();
    const expectedMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const expectedYear =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    expect(d.getFullYear()).toBe(expectedYear);
    expect(d.getMonth()).toBe(expectedMonth);
    expect(d.getDate()).toBe(1);
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
    expect(d.getSeconds()).toBe(0);
    expect(d.getMilliseconds()).toBe(0);
  });
});
