import { is31DayMonthIf, is31DayMonthSwitch } from './index.ts';

describe.each([
  ['is31DayMonthIf', is31DayMonthIf],
  ['is31DayMonthSwitch', is31DayMonthSwitch],
])('%s', (_, is31DayMonth) => {
  test.each([
    ['Jan', true],
    ['Feb', false],
    ['Mar', true],
    ['Apr', false],
    ['May', true],
    ['Jun', false],
    ['Jul', true],
    ['Aug', true],
    ['Sep', false],
    ['Oct', true],
    ['Nov', false],
    ['Dec', true],
  ])('returns %s => %s', (month, expected) => {
    expect(is31DayMonth(month)).toBe(expected);
  });

  test('throws on invalid month', () => {
    expect(() => is31DayMonth('Abc')).toThrow('Invalid month: Abc');
    expect(() => is31DayMonth('')).toThrow('Invalid month: ');
    expect(() => is31DayMonth('JAN')).toThrow('Invalid month: JAN');
  });
});
