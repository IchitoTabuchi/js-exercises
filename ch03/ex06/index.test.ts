import { slice } from './index.ts';

// function substringTestCase(
//   str: string,
//   indexStart: number,
//   indexEnd?: number
// ): [string, number, number | undefined, string] {
//   return [str, indexStart, indexEnd, str.substring(indexStart, indexEnd)];
// }

function sliceTestCase(
  str: string,
  indexStart?: number,
  indexEnd?: number
): [string, number | undefined, number | undefined, string] {
  return [str, indexStart, indexEnd, str.slice(indexStart, indexEnd)];
}

// function padStartTestCase(
//   str: string,
//   targetLength: number,
//   padString?: string
// ): [string, number, string | undefined, string] {
//   return [str, targetLength, padString, str.padStart(targetLength, padString)];
// }

// function trimTestCase(str: string): [string, string] {
//   return [str, str.trim()];
// }

const str = 'Hello World!';

// // tests for substring
// test.each([
//   substringTestCase(str, 2),
//   substringTestCase(str, -3),
//   substringTestCase(str, 100),
//   substringTestCase(str, -100),
//   substringTestCase(str, 0, str.length),
//   substringTestCase(str, str.length, 0),
//   substringTestCase(str, 2, 7),
//   substringTestCase(str, 7, 2),
//   substringTestCase(str, 3, 3),
//   substringTestCase(str, 2, 100),
//   substringTestCase(str, 100, 2),
//   substringTestCase(str, 2, -3),
//   substringTestCase(str, -3, 2),
//   substringTestCase(str, 2, NaN),
//   substringTestCase(str, NaN, 2),
//   substringTestCase(str, 2.3, 6.7),
//   substringTestCase(str, 2, Infinity),
// ])('substring(%p, %p, %p) => %p', (str, indexStart, indexEnd, expected) => {
//   expect(substring(str, indexStart, indexEnd)).toBe(expected);
// });

// tests for slice
test.each([
  sliceTestCase(str),
  sliceTestCase(str, 2),
  sliceTestCase(str, -3),
  sliceTestCase(str, 100),
  sliceTestCase(str, -100),
  sliceTestCase(str, 0, str.length),
  sliceTestCase(str, str.length, 0),
  sliceTestCase(str, 2, 7),
  sliceTestCase(str, 7, 2),
  sliceTestCase(str, 3, 3),
  sliceTestCase(str, 2, 100),
  sliceTestCase(str, 100, 2),
  sliceTestCase(str, 2, -3),
  sliceTestCase(str, -3, 2),
  sliceTestCase(str, 2, NaN),
  sliceTestCase(str, NaN, 2),
  sliceTestCase(str, 2.3, 6.7),
  sliceTestCase(str, 2, Infinity),
])('slice(%p, %p, %p) => %p', (str, indexStart, indexEnd, expected) => {
  expect(slice(str, indexStart, indexEnd)).toBe(expected);
});

// // tests for padStart
// test.each([
//   padStartTestCase('abc', 10),
//   padStartTestCase('abcdefghijklmn', 10),
//   padStartTestCase('abc', -3),
//   padStartTestCase('abc', 10, '123'),
// ])('padStart(%p, %p, %p) => %p', (str, targetLength, padString, expected) => {
//   expect(padStart(str, targetLength, padString)).toBe(expected);
// });

// // tests for trim
// test.each([
//   trimTestCase('   Hello World!  '),
//   trimTestCase('   Hello World!'),
//   trimTestCase('Hello World!   '),
//   trimTestCase('Hello World!'),
// ])('trim(%p) => %p', (str, expected) => {
//   expect(trim(str)).toBe(expected);
// });
