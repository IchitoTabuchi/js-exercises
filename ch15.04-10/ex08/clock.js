const clock = document.querySelector('#clock'); // 時計の SVG 要素を取得
const handsGroup = clock.querySelector('.hands'); // 針をまとめるグループ要素を取得
let secondhand = clock.querySelector('.secondhand'); // 秒針の要素を取得

// 秒針の要素が存在しない場合は新たに作成して handsGroup に追加
if (!secondhand) {
  secondhand = document.createElementNS('http://www.w3.org/2000/svg', 'line'); // SVG に要素を追加する際は createElementNS を使用する
  secondhand.setAttribute('class', 'secondhand');
  secondhand.setAttribute('x1', '50');
  secondhand.setAttribute('y1', '50');
  secondhand.setAttribute('x2', '50');
  secondhand.setAttribute('y2', '18');
  secondhand.setAttribute('stroke', 'red');
  secondhand.setAttribute('stroke-width', '1.5');
  secondhand.setAttribute('stroke-linecap', 'round');
  handsGroup.appendChild(secondhand);
}

// 教科書のコードを写経
(function updateClock() {
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes() + sec / 60;
  const hour = (now.getHours() % 12) + min / 60;
  const secangle = sec * 6;
  const minangle = min * 6;
  const hourangle = hour * 30;

  const minhand = document.querySelector('#clock .minutehand');
  const hourhand = document.querySelector('#clock .hourhand');

  secondhand.setAttribute('transform', `rotate(${secangle}, 50, 50)`); // 秒針の回転を追加
  minhand.setAttribute('transform', `rotate(${minangle}, 50, 50)`);
  hourhand.setAttribute('transform', `rotate(${hourangle}, 50, 50)`);

  setTimeout(updateClock, 1000); // 1秒ごとに更新するように変更
})();
