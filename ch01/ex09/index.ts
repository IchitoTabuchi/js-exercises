import * as fs from 'fs';

class DefaultMap<K, V> extends Map<K, V> {
  constructor(public defaultValue: any) {
    super();
  }

  get(key: any) {
    if (this.has(key)) return super.get(key);
    else return this.defaultValue;
  }
}

class WordHistogram {
  letterCounts: DefaultMap<string, number> = new DefaultMap(0);
  totalLetters: number = 0;

  add(text: string): void {
    [...text.toLowerCase().matchAll(/\w+|\$[\d.]+|\S+/g)].forEach(
      ([character]) => {
        this.letterCounts.set(
          character,
          (this.letterCounts.get(character) || 0) + 1
        );
        this.totalLetters++;
      }
    );
  }

  toString(): string {
    return [...this.letterCounts]
      .sort(([charA, countA], [charB, countB]) =>
        countB === countA ? charA.localeCompare(charB) : countB - countA
      )
      .map(([char, count]) => ({
        char,
        percentage: (count / this.totalLetters) * 100,
      }))
      .filter(({ percentage }) => percentage >= 0.5)
      .map(
        ({ char, percentage }) =>
          `${char.padStart(10)}: ${'#'.repeat(
            Math.round(10 * percentage)
          )} ${percentage.toFixed(2)}%`
      )
      .join('\n');
  }
}

const histogramFromFile = async (filePath: string): Promise<WordHistogram> => {
  const histogram = new WordHistogram();
  const text = await fs.promises.readFile(filePath, 'utf-8');
  histogram.add(text);
  return histogram;
};

const books: string[] = ['Hamlet', 'Macbeth', 'Romeo and Juliet'];

for (const b of books) {
  console.log();
  console.log(b);
  await histogramFromFile(`./ch01/ex09/${b}.txt`).then((h) => {
    console.log(h.toString());
  });
}
