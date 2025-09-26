import { slice } from './index.ts';
// function substringTestCase(
//   str: string,
//   indexStart: number,
//   indexEnd?: number
// ): [string, number, number | undefined, string] {
//   return [str, indexStart, indexEnd, str.substring(indexStart, indexEnd)];
// }
function sliceTestCase(str, indexStart, indexEnd) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVuQyw4QkFBOEI7QUFDOUIsaUJBQWlCO0FBQ2pCLHdCQUF3QjtBQUN4QixzQkFBc0I7QUFDdEIsb0RBQW9EO0FBQ3BELDZFQUE2RTtBQUM3RSxJQUFJO0FBRUosU0FBUyxhQUFhLENBQ3BCLEdBQVcsRUFDWCxVQUFtQixFQUNuQixRQUFpQjtJQUVqQixPQUFPLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBRUQsNkJBQTZCO0FBQzdCLGlCQUFpQjtBQUNqQiwwQkFBMEI7QUFDMUIsdUJBQXVCO0FBQ3ZCLG9EQUFvRDtBQUNwRCxrRkFBa0Y7QUFDbEYsSUFBSTtBQUVKLHlEQUF5RDtBQUN6RCw4QkFBOEI7QUFDOUIsSUFBSTtBQUVKLE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQztBQUUzQix5QkFBeUI7QUFDekIsY0FBYztBQUNkLCtCQUErQjtBQUMvQixnQ0FBZ0M7QUFDaEMsaUNBQWlDO0FBQ2pDLGtDQUFrQztBQUNsQywyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLG1DQUFtQztBQUNuQyxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsK0VBQStFO0FBQy9FLGlFQUFpRTtBQUNqRSxNQUFNO0FBRU4sa0JBQWtCO0FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDUixhQUFhLENBQUMsR0FBRyxDQUFDO0lBQ2xCLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDdkIsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUN4QixhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2pDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDakMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QixhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQzFCLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxQixhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QixhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QixhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDMUIsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1QixhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUM7Q0FDaEMsQ0FBQyxDQUFDLHlCQUF5QixFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUU7SUFDcEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQyxDQUFDO0FBRUgsd0JBQXdCO0FBQ3hCLGNBQWM7QUFDZCxpQ0FBaUM7QUFDakMsNENBQTRDO0FBQzVDLGlDQUFpQztBQUNqQyx3Q0FBd0M7QUFDeEMsaUZBQWlGO0FBQ2pGLG1FQUFtRTtBQUNuRSxNQUFNO0FBRU4sb0JBQW9CO0FBQ3BCLGNBQWM7QUFDZCx1Q0FBdUM7QUFDdkMscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxrQ0FBa0M7QUFDbEMsNENBQTRDO0FBQzVDLHNDQUFzQztBQUN0QyxNQUFNIn0=