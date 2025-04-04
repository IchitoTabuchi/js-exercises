const obj = { name: 'Taro', age: '26', city: 'Tokyo' };

console.log('Property Names:');
for (const key in obj) {
  console.log(key);
}

console.log('Property Values:');
for (const key in obj) {
  console.log(obj[key as keyof typeof obj]);
}
