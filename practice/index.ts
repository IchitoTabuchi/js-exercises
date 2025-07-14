// node --loader ts-node/esm practice/index.ts

type ResponseBody = {
  date: Date;
};

// const strZ = '2025-06-24T01:30:00Z'; // UTC
// const strPlus9 = '2025-06-24T01:30:00+09:00'; // JST
const strNoZone = '2025-06-24T01:30:00'; // ローカルタイム

// const dateZ = new Date(strZ);
// const datePlus9 = new Date(strPlus9);
const dateNoZone = new Date(strNoZone); // PCローカルとして解釈される

// console.log('UTC date:', dateZ);
// console.log('JST date:', datePlus9);
console.log('Local date:', dateNoZone);
// console.log('UTC date:', dateZ.toISOString());
// console.log('JST date:', datePlus9.toISOString());
console.log('Local date:', dateNoZone.toISOString());

// console.log(dateZ.toLocaleString('en-US', { timeZone: 'Europe/London' }));
// console.log(datePlus9.toLocaleString('en-US', { timeZone: 'Europe/London' }));
console.log(dateNoZone.toLocaleString('en-US', { timeZone: 'Europe/London' }));

// console.log(dateZ.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
// console.log(datePlus9.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
console.log(dateNoZone.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));

const date = new Date();
console.log('Date object date string:', date);

const responseBody: ResponseBody = {
  date,
};
console.log('JSON property date string', responseBody);

console.log(
  'Localized date string:',
  new Date(responseBody.date).toLocaleString('en-GB', {
    timeZone: 'Asia/Tokyo',
  })
);
