import { fibonacciIterator, fibonacciSequence } from './index.ts';
const compareFib = (n) => {
    const gen = fibonacciSequence();
    const iter = fibonacciIterator();
    for (let i = 0; i < n; i++) {
        const g = gen.next().value;
        const it = iter.next().value;
        if (g !== it)
            return false;
    }
    return true;
};
describe('fibonacciSequence vs fibonacciIterator', () => {
    const cases = [0, 1, 20, 100];
    for (const n of cases)
        test(`should return true for n=${n}`, () => {
            expect(compareFib(n)).toBe(true);
        });
});
// フィボナッチ数列の配列を使用して、fibonacciIterator自体が正しい値を返すかテストするのが正しい。
// fibonacciSequenceが間違っている可能性もあるため。
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRWxFLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBUyxFQUFXLEVBQUU7SUFDeEMsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztJQUNoQyxNQUFNLElBQUksR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0lBRWpDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQzNCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQUVGLFFBQVEsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7SUFDdEQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUU5QixLQUFLLE1BQU0sQ0FBQyxJQUFJLEtBQUs7UUFDbkIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7WUFDekMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsMkRBQTJEO0FBQzNELG9DQUFvQyJ9