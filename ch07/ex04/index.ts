// node --loader ts-node/esm ch07/ex04/index.ts

const data = [
  { name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20 },
  { name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60 },
  { name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30 },
  { name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60 },
  { name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40 },
  { name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80 },
  { name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50 },
  { name: 'Justin', class: 'C', math: 80, chemistry: 40, geography: 30 },
  { name: 'Mallet', class: 'C', math: 60, chemistry: 70, geography: 90 },
];

// 1
const totalMath: number = data.reduce((sum, d) => sum + d.math, 0);

// 2
const classAChemistries: number[] = data
  .filter((d) => d.class === 'A')
  .map((s) => s.chemistry);
const averageChemistry: number =
  classAChemistries.reduce((sum, d) => sum + d, 0) / classAChemistries.length;

// 3
const classCTotals: number[] = data
  .filter((d) => d.class === 'C')
  .map((d) => d.math + d.chemistry + d.geography);
const averageTotalC =
  classCTotals.reduce((sum, t) => sum + t, 0) / classCTotals.length;

// 4
const topStudentName: string = data
  .map((d) => ({
    name: d.name,
    total: d.math + d.chemistry + d.geography,
  }))
  .reduce((max, d) => (d.total > max.total ? d : max)).name;

// 5
const averageGeo: number =
  data.reduce((sum, d) => sum + d.geography, 0) / data.length;
const averageGeoSquare: number =
  data.reduce((sum, d) => sum + d.geography ** 2, 0) / data.length;
const geoStandardDeviation: number =
  (averageGeoSquare - averageGeo ** 2) ** 0.5;

console.log('total math score :', totalMath); // 530
console.log('average chemistry score of class A :', averageChemistry); // 45
console.log('average total score of class C :', averageTotalC); // 170.66...
console.log('top score student name :', topStudentName); // Frank
console.log('geography standard deviation :', geoStandardDeviation); // 22.33...
