const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');
const template = document.querySelector('#todo-template');

// { content: "...", completed: true or false } の配列
let todos = []; // const から let に変更

// フィルタ関数のマッピング
const filters = {
  '#/active': (todo) => !todo.completed,
  '#/completed': (todo) => todo.completed,
};
// フィルタ選択状態で画面更新を行うと hash が残るため、リロード時にフィルタを再適用する
let todoFilter = filters[window.location.hash] || (() => true);

function renderTodos(todos) {
  list.innerHTML = '';
  // フィルタの適用は必ず renderTodos 呼び出し時に行うこと
  // (フィルタ適用状態でチェックボックスを切り替えた場合に対応するため)
  todos.filter(todoFilter).forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    const toggle = clone.querySelector('input');
    const label = clone.querySelector('label');
    const destroy = clone.querySelector('button');

    li.classList.toggle('completed', todo.completed);
    toggle.addEventListener('change', () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener('click', () => {
      todos.splice(index, 1);
      deleteTodo(todo.content);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  input.value = '';

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

window.addEventListener('hashchange', () => {
  // フィルタを更新して再描画
  todoFilter = filters[window.location.hash] || (() => true);
  renderTodos(todos);
});

function deleteTodo(content) {
  todos = todos.filter((t) => t.content !== content);
}
