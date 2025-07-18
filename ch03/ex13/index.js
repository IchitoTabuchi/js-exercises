// node ch03/ex13/index.js

const date1 = new Date('2024-01-12T00:00:00Z');

console.log(date1, date1.toString(), date1 == date1.toString());
console.log(date1, date1.getTime(), date1 == date1.getTime());

console.log(date1, date1.toString(), date1 >= date1.toString());
console.log(date1, date1.getTime(), date1 >= date1.getTime());

console.log(
  date1,
  new Date(date1.getTime()).toString(),
  date1 == new Date(date1.getTime()).toString()
);

console.log(
  date1.getTime(),
  date1.toString(),
  date1.getTime() == date1.getTime()
);
