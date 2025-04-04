// node ch03/ex15/index.cjs

for (let i = 0; i < 10; i++) {
  (function () {
    let i = 100;
  })();
  console.log(i);
}
console.log(i);

for (var i = 0; i < 10; i++) {
  (function () {
    var i = 100;
  })();
  console.log(i);
}
console.log(i);

// 非strictモードで実行するために拡張子は.cjsにすること
for (i = 0; i < 10; i++) {
  (function () {
    i = 100;
  })();
  console.log(i);
}
console.log(i);
