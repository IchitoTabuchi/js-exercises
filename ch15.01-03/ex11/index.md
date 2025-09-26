# スクリプト

```js
// 1. htmlのpタグ要素を生成しなさい。また、ボタン要素の直後の位置にpタグ要素を配置しなさい。
const p = document.createElement('p');
btn.insertAdjacentElement('afterend', p);

randomEventTarget.addEventListener('random', (e) => {
  // 2. 生成済みのpタグ要素のテキストに、イベントの保持する乱数値を代入しなさい。
  p.textContent = `Random Value: ${e.detail}`;
});

// 3. ボタンにイベントリスナを追加し、ボタン押下するごとに乱数値を変更しなさい。変更にはRandomEventTargetのtriggerメソッドを利用しなさい。
btn.addEventListener('click', () => randomEventTarget.trigger());

// 4. RandomEventTargetのtriggerメソッドによってイベントを発生させて、ページ読み込み時に乱数値を表示しなさい。
randomEventTarget.trigger();
```

# 動作確認

<video controls src="20250923-0714-19.7779063.mp4" title="Title"></video>
