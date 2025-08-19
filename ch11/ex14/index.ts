export const sortJapanese = (arr: string[]): string[] => {
  const collator = new Intl.Collator('ja', { sensitivity: 'base' });
  return [...arr].sort(collator.compare);
};

export const toJapaneseDateString = (date: Date): string => {
  const parts = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return `${map.era}${map.year}年${map.month}月${map.day}日`;
};
