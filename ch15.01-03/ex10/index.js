const div = document.getElementById('editor-front');
const input = document.getElementById('editor-back');

// 1. div 要素をクリックすると input 要素が focus される
div.addEventListener('click', () => input.focus());

// 2. div 要素は通常白色で input 要素に focus されると灰色 (silver)になる (input 要素から focus が外れると白色に戻る)
div.style.backgroundColor = 'white';
input.addEventListener('focus', () => (div.style.backgroundColor = 'silver'));
input.addEventListener('blur', () => (div.style.backgroundColor = 'white'));

// 3. input 要素に入力された text は div 要素にも表示される
input.addEventListener('input', () => (div.textContent = input.value));
