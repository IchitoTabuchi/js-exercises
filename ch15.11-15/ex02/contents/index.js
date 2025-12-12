const form = document.querySelector('#new-todo-form');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#new-todo');

const TIMEOUT_MS = 3000; // 3 秒以上経過してもレスポンスを受信できない場合はリクエストをキャンセルする
const maxRetry = 10; // 1/3 で 500 エラーを引き続けた場合に処理を終了する

// UIを無効化/有効化する関数
function setUIDisabled(disabled) {
  const submitButton = form.querySelector('button[type="submit"]');
  const checkboxes = document.querySelectorAll(
    '#todo-list input[type="checkbox"]'
  );
  const deleteButtons = document.querySelectorAll('#todo-list button');

  // フォームの入力欄と送信ボタン、チェックボックス、削除ボタンを無効化/有効化
  input.disabled = disabled;
  submitButton.disabled = disabled;
  checkboxes.forEach((checkbox) => (checkbox.disabled = disabled));
  deleteButtons.forEach((button) => (button.disabled = disabled));
}

// exponential backoffでリトライする fetch ラッパー関数 (ch11/ex16から流用)
const fetchWithRetryWithExponentialBackoff = async (url, options = {}) => {
  for (let attempt = 0; attempt <= maxRetry; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // 500番台のエラーでない場合は成功として返す
      if (response.status < 500 || response.status >= 600) return response;

      // 500番台エラー：最後の試行ならエラーをスロー
      if (attempt === maxRetry) {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      clearTimeout(timeoutId);

      // タイムアウトエラー
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      // その他のエラー：最後の試行ならスロー
      if (attempt === maxRetry) throw error;
    }

    // リトライ前に待機（tryでもcatchでもここに到達）
    const waitTime = 1000 * Math.pow(2, attempt);
    console.log(
      `Retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetry})`
    );
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  setUIDisabled(true);

  try {
    // GET /api/tasks でタスク一覧を取得（リトライ＆タイムアウト対応）
    const response = await fetchWithRetryWithExponentialBackoff('/api/tasks');

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
  } finally {
    setUIDisabled(false);
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

  setUIDisabled(true);

  try {
    // POST /api/tasks で新しいタスクを作成（リトライ＆タイムアウト対応）
    const response = await fetchWithRetryWithExponentialBackoff('/api/tasks', {
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
  } finally {
    setUIDisabled(false);
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

    setUIDisabled(true);

    try {
      // PATCH /api/tasks/{id} でタスクの状態を更新（リトライ＆タイムアウト対応）
      const response = await fetchWithRetryWithExponentialBackoff(
        `/api/tasks/${task.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

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
    } finally {
      setUIDisabled(false);
    }
  });

  const destroy = document.createElement('button');
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = '❌';

  // 削除ボタンクリック時にタスクを削除
  destroy.addEventListener('click', async () => {
    setUIDisabled(true);

    try {
      // DELETE /api/tasks/{id} でタスクを削除（リトライ＆タイムアウト対応）
      const response = await fetchWithRetryWithExponentialBackoff(
        `/api/tasks/${task.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }
      // 成功したらリストから要素を削除
      elem.remove();
    } catch (error) {
      alert(`Connection Error: ${error.message}`);
    } finally {
      setUIDisabled(false);
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
