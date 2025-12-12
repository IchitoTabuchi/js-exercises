const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

const STORAGE_KEY = 'todo-list';

// localStorage が利用可能かチェックする関数
function isLocalStorageAvailable() {
  try {
    const test = '__localStorage_availability_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// ToDo のデータ構造: { id: number, text: string, completed: boolean }
let todos = [];
let nextId = 1;

// localStorage から ToDo リストを読み込む
function loadTodos() {
  if (!isLocalStorageAvailable()) return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      todos = data.todos || [];
      nextId = data.nextId || 1;
    }
  } catch (e) {
    console.error('Failed to load todos from localStorage:', e);
  }
}

// localStorage に ToDo リストを保存する
function saveTodos() {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ todos, nextId }));
  } catch (e) {
    console.error('Failed to save todos to localStorage:', e);
  }
}

// ToDo を追加する
function addTodo(text) {
  const todo = {
    id: nextId++,
    text: text,
    completed: false,
  };
  todos.push(todo);
  saveTodos();
  return todo;
}

// ToDo の完了状態を更新する
function updateTodoStatus(id, completed) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = completed;
    saveTodos();
  }
}

// ToDo を削除する
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
}

// ToDo をリストに表示する
function renderTodo(todo) {
  const elem = document.createElement('li');
  elem.dataset.id = todo.id;

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = todo.completed;
  toggle.addEventListener('change', () => {
    label.style.textDecorationLine = toggle.checked ? 'line-through' : 'none';
    updateTodoStatus(todo.id, toggle.checked);
  });

  const label = document.createElement('label');
  label.textContent = todo.text;
  label.style.textDecorationLine = todo.completed ? 'line-through' : 'none';

  const destroy = document.createElement('button');
  destroy.textContent = '❌';
  destroy.addEventListener('click', () => {
    elem.remove();
    deleteTodo(todo.id);
  });

  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

// すべての ToDo を画面に表示する
function renderAllTodos() {
  // 既存の要素をすべて削除
  list.innerHTML = '';
  // ToDo を順番に追加（新しいものが上に来るように）
  for (let i = 0; i < todos.length; i++) {
    renderTodo(todos[i]);
  }
}

// 初期化処理
loadTodos();
renderAllTodos();

// 他のタブでの変更を検知して同期する
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    loadTodos();
    renderAllTodos();
  }
});

form.addEventListener('submit', (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault(); // Answer: フォーム送信によるページリロードを防ぐため

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = '';

  // ToDo を追加して画面に表示
  const newTodo = addTodo(todo);
  renderTodo(newTodo);
});
