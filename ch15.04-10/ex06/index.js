const template = document.createElement('template');
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector('#new-todo-form');
    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector('#new-todo');
    this.list = this.shadowRoot.querySelector('#todo-list');
    this.todos = [];

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.input.value.trim();
      if (!text) return;
      this.addTodo(text);
      this.input.value = '';
      this.input.focus();
    });
  }

  // 新しいTODOを追加
  addTodo(text) {
    this.todos.unshift({ id: crypto.randomUUID(), text, completed: false });
    this.render();
  }

  // TODOの完了状態を切り替え
  toggleTodo(id) {
    const t = this.todos.find((x) => x.id === id);
    if (!t) return;
    t.completed = !t.completed;
    this.render();
  }

  // TODOを削除
  removeTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.render();
  }

  // TODOリストを再描画
  render() {
    this.list.innerHTML = '';
    for (const t of this.todos) {
      // TODOアイテムの要素を作成
      const li = document.createElement('li');
      const row = document.createElement('div');
      row.className = 'row';
      row.style.cssText =
        'display:flex;align-items:center;gap:.6rem;padding:.4rem .65rem;';

      // チェックボックス、テキスト、削除ボタンを作成
      const toggle = document.createElement('input');
      toggle.type = 'checkbox';
      toggle.className = 'toggle';
      toggle.checked = t.completed;

      // TODOテキスト
      const span = document.createElement('span');
      span.className = 'text';
      span.style.flex = '1';
      span.textContent = t.text;
      if (t.completed) {
        span.style.textDecoration = 'line-through';
        span.style.opacity = '.6';
      }

      // 削除ボタン
      const btn = document.createElement('button');
      btn.className = 'destroy';
      btn.setAttribute('aria-label', 'delete');
      btn.textContent = '✕';

      // イベントリスナーを設定
      toggle.addEventListener('change', () => this.toggleTodo(t.id));
      btn.addEventListener('click', () => this.removeTodo(t.id));

      // 要素を組み立ててリストに追加
      row.append(toggle, span, btn);
      li.append(row);
      this.list.append(li);
    }
  }
}

customElements.define('todo-app', TodoApp);
