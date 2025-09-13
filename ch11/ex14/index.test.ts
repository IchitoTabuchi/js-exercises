import { sortJapanese, toJapaneseDateString } from './index.ts';

describe('sortJapanese', () => {
  const cases: [string[], string[]][] = [
    [
      ['ぱ', 'ば', 'は'],
      ['ぱ', 'ば', 'は'],
    ],
    [
      ['か', 'が'],
      ['か', 'が'],
    ],
    [
      ['さ', 'ざ'],
      ['さ', 'ざ'],
    ],

    [
      ['っぽん', 'つき'],
      ['つき', 'っぽん'],
    ],
    [
      ['やま', 'ゃく'],
      ['ゃく', 'やま'],
    ],
    [
      ['ゆめ', 'ゅう'],
      ['ゅう', 'ゆめ'],
    ],
    [
      ['よる', 'ょっと'],
      ['ょっと', 'よる'],
    ],

    [
      ['あ', ''],
      ['', 'あ'],
    ],
    [
      ['', ''],
      ['', ''],
    ],
  ];

  for (const [input, expected] of cases) {
    it(`sorts ${JSON.stringify(input)} as ${JSON.stringify(expected)}`, () => {
      expect(sortJapanese(input)).toEqual(expected);
    });
  }

  it('returns empty array for empty input', () => {
    expect(sortJapanese([])).toEqual([]);
  });
});

describe('toJapaneseDateString', () => {
  const cases: [Date, string][] = [
    [new Date(2024, 3, 2), '令和6年4月2日'],
    [new Date(2019, 4, 1), '令和元年5月1日'],
    [new Date(1989, 0, 8), '平成元年1月8日'],
    [new Date(1988, 11, 31), '昭和63年12月31日'],
  ];

  for (const [date, expected] of cases) {
    it(`formats ${date.toDateString()} as ${expected}`, () => {
      expect(toJapaneseDateString(date)).toBe(expected);
    });
  }
});
