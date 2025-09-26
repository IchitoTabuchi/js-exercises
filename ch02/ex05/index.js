"use strict";
// 保存すると自動整形されるので、コメント形式で記載
// import * as fs from 'fs'
// class DefaultMap<K, V> extends Map<K, V> {
//   constructor(public defaultValue: any) {
//     super()
//   }
//   get(key: any) {
//     if (this.has(key)) return super.get(key)
//     else return this.defaultValue
//   }
// }
// class Histogram {
//   letterCounts: DefaultMap<string, number> = new DefaultMap(0)
//   totalLetters: number = 0
//   add(text: string): void {
//     text
//       .replace(/\s/g, '')
//       .toUpperCase()
//       .split('')
//       .forEach((character) => {
//         this.letterCounts.set(
//           character,
//           (this.letterCounts.get(character) || 0) + 1
//         )
//         this.totalLetters++
//       })
//   }
//   toString(): string {
//     return [...this.letterCounts]
//       .sort(([charA, countA], [charB, countB]) =>
//         countB === countA ? charA.localeCompare(charB) : countB - countA
//       )
//       .map(([char, count]) => ({
//         char,
//         percentage: (count / this.totalLetters) * 100,
//       }))
//       .filter(({ percentage }) => percentage >= 1)
//       .map(
//         ({ char, percentage }) =>
//           `${char}:${'#'.repeat(Math.round(percentage))}${percentage.toFixed(
//             2
//           )}`
//       )
//       .join('\n')
//   }
// }
// const histogramFromFile = async (filePath: string): Promise<Histogram> => {
//   const histogram = new Histogram()
//   const text = await fs.promises.readFile(filePath, 'utf-8')
//   histogram.add(text)
//   return histogram
// }
// const books: string[] = [
//   'gingatetsudono_yoru',
//   'hashire_merosu',
//   'wagahaiwa_nekodearu',
// ]
// for (const b of books) {
//   console.log()
//   console.log(b)
//   await histogramFromFile(`./ch01/ex08/${b}.txt`).then((h) => {
//     console.log(h.toString())
//   })
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQTJCO0FBRTNCLDJCQUEyQjtBQUUzQiw2Q0FBNkM7QUFDN0MsNENBQTRDO0FBQzVDLGNBQWM7QUFDZCxNQUFNO0FBRU4sb0JBQW9CO0FBQ3BCLCtDQUErQztBQUMvQyxvQ0FBb0M7QUFDcEMsTUFBTTtBQUNOLElBQUk7QUFFSixvQkFBb0I7QUFDcEIsaUVBQWlFO0FBQ2pFLDZCQUE2QjtBQUU3Qiw4QkFBOEI7QUFDOUIsV0FBVztBQUNYLDRCQUE0QjtBQUM1Qix1QkFBdUI7QUFDdkIsbUJBQW1CO0FBQ25CLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMsdUJBQXVCO0FBQ3ZCLHdEQUF3RDtBQUN4RCxZQUFZO0FBQ1osOEJBQThCO0FBQzlCLFdBQVc7QUFDWCxNQUFNO0FBRU4seUJBQXlCO0FBQ3pCLG9DQUFvQztBQUNwQyxvREFBb0Q7QUFDcEQsMkVBQTJFO0FBQzNFLFVBQVU7QUFDVixtQ0FBbUM7QUFDbkMsZ0JBQWdCO0FBQ2hCLHlEQUF5RDtBQUN6RCxZQUFZO0FBQ1oscURBQXFEO0FBQ3JELGNBQWM7QUFDZCxvQ0FBb0M7QUFDcEMsZ0ZBQWdGO0FBQ2hGLGdCQUFnQjtBQUNoQixnQkFBZ0I7QUFDaEIsVUFBVTtBQUNWLG9CQUFvQjtBQUNwQixNQUFNO0FBQ04sSUFBSTtBQUVKLDhFQUE4RTtBQUM5RSxzQ0FBc0M7QUFDdEMsK0RBQStEO0FBQy9ELHdCQUF3QjtBQUN4QixxQkFBcUI7QUFDckIsSUFBSTtBQUVKLDRCQUE0QjtBQUM1QiwyQkFBMkI7QUFDM0Isc0JBQXNCO0FBQ3RCLDJCQUEyQjtBQUMzQixJQUFJO0FBRUosMkJBQTJCO0FBQzNCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsa0VBQWtFO0FBQ2xFLGdDQUFnQztBQUNoQyxPQUFPO0FBQ1AsSUFBSSJ9