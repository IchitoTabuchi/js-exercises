const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

document.addEventListener('DOMContentLoaded', async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    // GET /api/tasks でタスク一覧を取得
    const response = await fetch('/api/tasks');
    if (!response.ok) {
      // エラーレスポンスの場合はメッセージを表示
      const error = await response.json();
      alert(`Error: ${error.message}`);
      return;
    }
    const data = await response.json();
    // 取得したタスクをそれぞれリストに追加
    data.items.forEach((task) => appendToDoItem(task));
  } catch (error) {
    alert(`Connection Error: ${error.message}`);
  }
});

form.addEventListener('submit', async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // ANSWER: フォーム送信によるページリロードを防ぐため。
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === '') {
    return;
  }

  // new-todo の中身は空にする
  input.value = '';

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    // POST /api/tasks で新しいタスクを作成
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ name: todo }),
    });
    if (!response.ok) {
      // エラーレスポンスの場合はメッセージを表示
      const error = await response.json();
      alert(`Error: ${error.message}`);
      return;
    }
    // 成功したらタスクをリストに追加
    const task = await response.json();
    appendToDoItem(task);
  } catch (error) {
    alert(`Connection Error: ${error.message}`);
  }
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement('li');

  const label = document.createElement('label');
  label.textContent = task.name;
  label.style.textDecorationLine = 'none';

  const toggle = document.createElement('input');
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = 'checkbox';
  toggle.checked = task.status === 'completed';
  // 初期状態の設定
  label.style.textDecorationLine =
    task.status === 'completed' ? 'line-through' : 'none';

  // チェックボックス変更時にタスクの状態を更新
  toggle.addEventListener('change', async () => {
    const newStatus = toggle.checked ? 'completed' : 'active';
    try {
      // PATCH /api/tasks/{id} でタスクの状態を更新
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        // エラー時はチェックボックスを元に戻す
        toggle.checked = !toggle.checked;
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }
      // 成功したらスタイルを更新
      label.style.textDecorationLine =
        newStatus === 'completed' ? 'line-through' : 'none';
    } catch (error) {
      // エラー時はチェックボックスを元に戻す
      toggle.checked = !toggle.checked;
      alert(`Connection Error: ${error.message}`);
    }
  });

  const destroy = document.createElement('button');
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = '❌';

  // 削除ボタンクリック時にタスクを削除
  destroy.addEventListener('click', async () => {
    try {
      // DELETE /api/tasks/{id} でタスクを削除
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }
      // 成功したらリストから要素を削除
      elem.remove();
    } catch (error) {
      alert(`Connection Error: ${error.message}`);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
