const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

const DB_NAME = 'todo-db';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

let db = null;
let nextId = 1;

// indexedDB を開く
const openDB = async () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Failed to open database:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // オブジェクトストアが存在しない場合は作成
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('completed', 'completed', { unique: false });
      }
    };
  });

// すべての ToDo を取得
const getAllTodos = async () =>
  new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

// ToDo を追加
const addTodo = async (text) => {
  const todo = {
    id: nextId++,
    text: text,
    completed: false,
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.add(todo);

    request.onsuccess = () => {
      // 他のタブに変更を通知
      broadcastChange('add', todo);
      resolve(todo);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// ToDo の完了状態を更新
const updateTodoStatus = async (id, completed) =>
  new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.get(id);

    request.onsuccess = () => {
      const todo = request.result;
      if (todo) {
        todo.completed = completed;
        const updateRequest = objectStore.put(todo);

        updateRequest.onsuccess = () => {
          // 他のタブに変更を通知
          broadcastChange('update', todo);
          resolve(todo);
        };

        updateRequest.onerror = () => {
          reject(updateRequest.error);
        };
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

// ToDo を削除
const deleteTodo = async (id) =>
  new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      // 他のタブに変更を通知
      broadcastChange('delete', { id });
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

// BroadcastChannel を使って他のタブに変更を通知
const channel = new BroadcastChannel('todo-channel');

const broadcastChange = async (type, data) =>
  channel.postMessage({ type, data });

// 他のタブからの変更を受信
channel.onmessage = async (event) => {
  const { type, data } = event.data;
  if (type === 'add') renderTodo(data);
  else if (type === 'update') updateTodoInDOM(data);
  else if (type === 'delete') removeTodoFromDOM(data.id);
};

// ToDo をリストに表示
const renderTodo = (todo) => {
  const elem = document.createElement('li');
  elem.dataset.id = todo.id;

  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = todo.completed;
  toggle.addEventListener('change', async () => {
    label.style.textDecorationLine = toggle.checked ? 'line-through' : 'none';
    await updateTodoStatus(todo.id, toggle.checked);
  });

  const label = document.createElement('label');
  label.textContent = todo.text;
  label.style.textDecorationLine = todo.completed ? 'line-through' : 'none';

  const destroy = document.createElement('button');
  destroy.textContent = '❌';
  destroy.addEventListener('click', async () => {
    elem.remove();
    await deleteTodo(todo.id);
  });

  elem.append(toggle, label, destroy);
  list.prepend(elem);
};

// DOM内のToDoを更新
const updateTodoInDOM = (todo) => {
  const elem = list.querySelector(`li[data-id="${todo.id}"]`);
  if (elem) {
    const toggle = elem.querySelector('input[type="checkbox"]');
    const label = elem.querySelector('label');

    toggle.checked = todo.completed;
    label.style.textDecorationLine = todo.completed ? 'line-through' : 'none';
  }
};

// DOM内のToDoを削除
const removeTodoFromDOM = (id) => {
  const elem = list.querySelector(`li[data-id="${id}"]`);
  if (elem) elem.remove();
};

// すべての ToDo を画面に表示
const renderAllTodos = async () => {
  list.innerHTML = '';
  const todos = await getAllTodos();

  // 最大IDを取得して nextId を設定
  if (todos.length > 0) nextId = Math.max(...todos.map((t) => t.id)) + 1;

  // ToDo を順番に追加（新しいものが上に来るように）
  for (let i = 0; i < todos.length; i++) renderTodo(todos[i]);
};

// 初期化処理
const initialize = async () => {
  try {
    await openDB();
    await renderAllTodos();
  } catch (error) {
    console.error('Failed to initialize:', error);
    alert(
      'IndexedDBの初期化に失敗しました。ブラウザがIndexedDBをサポートしているか確認してください。'
    );
  }
};

initialize();

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (input.value.trim() === '') {
    return;
  }
  const todo = input.value.trim();
  input.value = '';

  try {
    const newTodo = await addTodo(todo);
    renderTodo(newTodo);
  } catch (error) {
    console.error('Failed to add todo:', error);
    alert('ToDoの追加に失敗しました。');
  }
});
