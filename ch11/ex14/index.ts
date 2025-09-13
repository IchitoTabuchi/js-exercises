export const sortJapanese = (arr: string[]): string[] =>
  [...arr].sort(new Intl.Collator('ja', { sensitivity: 'base' }).compare);

export const toJapaneseDateString = (date: Date): string =>
  new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    dateStyle: 'long',
  }).format(date);
