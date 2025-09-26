"use strict";
// node --loader ts-node/esm practice/index.ts
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
const responseBody = {
    date,
};
console.log('JSON property date string', responseBody);
console.log('Localized date string:', new Date(responseBody.date).toLocaleString('en-GB', {
    timeZone: 'Asia/Tokyo',
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOENBQThDO0FBTTlDLDhDQUE4QztBQUM5Qyx1REFBdUQ7QUFDdkQsTUFBTSxTQUFTLEdBQUcscUJBQXFCLENBQUMsQ0FBQyxVQUFVO0FBRW5ELGdDQUFnQztBQUNoQyx3Q0FBd0M7QUFDeEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7QUFFekQsbUNBQW1DO0FBQ25DLHVDQUF1QztBQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2QyxpREFBaUQ7QUFDakQscURBQXFEO0FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBRXJELDZFQUE2RTtBQUM3RSxpRkFBaUY7QUFDakYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFL0UsMEVBQTBFO0FBQzFFLDhFQUE4RTtBQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUU1RSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFOUMsTUFBTSxZQUFZLEdBQWlCO0lBQ2pDLElBQUk7Q0FDTCxDQUFDO0FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUV2RCxPQUFPLENBQUMsR0FBRyxDQUNULHdCQUF3QixFQUN4QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtJQUNsRCxRQUFRLEVBQUUsWUFBWTtDQUN2QixDQUFDLENBQ0gsQ0FBQyJ9