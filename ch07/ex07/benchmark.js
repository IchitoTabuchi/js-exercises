// node --loader ts-node/esm ch07/ex07/benchmark.ts
////////////////////////////////////
// ソートアルゴリズムの実行時間比較 //
////////////////////////////////////
import { bubbleSort, heapSort, mergeSort, quickSort, selectionSort, } from './index.ts';
const sortingFunctions = {
    bubbleSort,
    selectionSort,
    heapSort,
    quickSort,
    mergeSort,
};
const defaultCompare = (a, b) => a - b;
const benchmarkSorts = (arraySize, trials = 1) => {
    const randomArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 10000));
    for (const [name, sortFn] of Object.entries(sortingFunctions)) {
        for (let t = 0; t < trials; t++) {
            const array = [...randomArray];
            const label = `${name} (trial ${t + 1})`;
            console.time(label);
            sortFn(array, defaultCompare);
            console.timeEnd(label);
        }
    }
};
benchmarkSorts(100000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVuY2htYXJrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmVuY2htYXJrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1EQUFtRDtBQUVuRCxvQ0FBb0M7QUFDcEMsc0JBQXNCO0FBQ3RCLG9DQUFvQztBQUVwQyxPQUFPLEVBQ0wsVUFBVSxFQUNWLFFBQVEsRUFDUixTQUFTLEVBQ1QsU0FBUyxFQUNULGFBQWEsR0FDZCxNQUFNLFlBQVksQ0FBQztBQUVwQixNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLFVBQVU7SUFDVixhQUFhO0lBQ2IsUUFBUTtJQUNSLFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQztBQUVGLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUV2RCxNQUFNLGNBQWMsR0FBRyxDQUFDLFNBQWlCLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBUSxFQUFFO0lBQzdELE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQ3pELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUNsQyxDQUFDO0lBRUYsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1FBQzlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoQyxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDL0IsTUFBTSxLQUFLLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDIn0=