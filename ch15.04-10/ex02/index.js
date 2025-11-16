const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');
const template = document.querySelector('#todo-template');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  input.value = '';

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector('li');
  const toggle = clone.querySelector('input');
  const label = clone.querySelector('label');
  const destroy = clone.querySelector('button');

  toggle.addEventListener('change', () => {
    // IMPORTANT: ChatGPT にはこの関数内のコードのみ変更してもらうこと
    li.classList.toggle('completed', toggle.checked);
    // Tailwindユーティリティで視覚的に完了状態を表現
    label.classList.toggle('line-through', toggle.checked);
    label.classList.toggle('opacity-60', toggle.checked);
    label.classList.toggle('text-violet-300', toggle.checked);
    if (!toggle.checked) {
      // 未完了時に初期色へ戻す
      label.classList.add('text-slate-100');
      label.classList.remove('text-violet-300');
    } else {
      label.classList.remove('text-slate-100');
    }
  });
  label.textContent = todo;
  destroy.addEventListener('click', () => {
    li.remove();
  });

  list.prepend(li);
});
