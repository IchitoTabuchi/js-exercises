import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * ヘルパー関数
 */

// ToDo を 1 件作成する関数
function addTodo(content) {
  const form = document.querySelector('#new-todo-form');
  const input = document.querySelector('#new-todo');
  input.value = content;
  form.dispatchEvent(new window.Event('submit'));
}

// チェックボックスの状態を変更する関数
function setTodoCompleted(label, completed) {
  const checkbox = Array.from(document.querySelectorAll('#todo-list li'))
    .find((li) => li.querySelector('label')?.textContent === label)
    .querySelector('input[type="checkbox"]');
  checkbox.checked = completed;
  checkbox.dispatchEvent(new window.Event('change'));
}

// URL ハッシュを切り替えてフィルタを変える関数
const changeFilter = async (hash) => {
  window.location.hash = hash;
  window.dispatchEvent(new window.Event('hashchange'));
};

// 現在表示されている ToDo のラベル一覧を配列で取得
const getRenderedLabels = () =>
  Array.from(document.querySelectorAll('#todo-list li label')).map(
    (label) => label.textContent
  );

describe('ToDo アプリ', () => {
  let dom;
  let originalGlobals;
  const registeredListeners = [];

  beforeEach(async () => {
    // テスト用に JSDOM を用いてブラウザ互換の環境を構築
    jest.resetModules();
    dom = new JSDOM(
      readFileSync(
        path.join(path.dirname(fileURLToPath(import.meta.url)), 'index.html'),
        'utf-8'
      ),
      {
        url: `http://localhost`,
      }
    );

    // index.js 内で追加される hashchange リスナーをテスト終了時に削除するために保存
    const originalAddEventListener = dom.window.addEventListener.bind(
      dom.window
    );
    dom.window.addEventListener = (type, listener, options) => {
      registeredListeners.push({ type, listener, options });
      return originalAddEventListener(type, listener, options);
    };

    // オリジナルのグローバルオブジェクトを保存
    originalGlobals = {
      window: global.window,
      document: global.document,
      HTMLElement: global.HTMLElement,
      Node: global.Node,
      Event: global.Event,
      CustomEvent: global.CustomEvent,
      location: global.location,
    };

    // グローバルオブジェクトを JSDOM のものに差し替え
    global.window = dom.window;
    global.document = dom.window.document;
    global.HTMLElement = dom.window.HTMLElement;
    global.Node = dom.window.Node;
    global.Event = dom.window.Event;
    global.CustomEvent = dom.window.CustomEvent;
    global.location = dom.window.location;

    // テスト対象を読み込む
    await import('./index.js');
  });

  // テスト完了後は元のグローバルオブジェクトを復元
  afterEach(() => {
    // 記録しておいたイベントリスナーを外してから JSDOM を破棄
    registeredListeners.forEach(({ type, listener, options }) => {
      dom.window.removeEventListener(type, listener, options);
    });
    dom?.window.close();
    if (originalGlobals.window === undefined) delete global.window;
    else global.window = originalGlobals.window;
    if (originalGlobals.document === undefined) delete global.document;
    else global.document = originalGlobals.document;
    if (originalGlobals.HTMLElement === undefined) delete global.HTMLElement;
    else global.HTMLElement = originalGlobals.HTMLElement;
    if (originalGlobals.Node === undefined) delete global.Node;
    else global.Node = originalGlobals.Node;
    if (originalGlobals.Event === undefined) delete global.Event;
    else global.Event = originalGlobals.Event;
    if (originalGlobals.CustomEvent === undefined) delete global.CustomEvent;
    else global.CustomEvent = originalGlobals.CustomEvent;
    if (originalGlobals.location === undefined) delete global.location;
    else global.location = originalGlobals.location;
  });

  it('All フィルタ (初期状態を含む) は完了済み・未完了を区別せず全件を表示すること', async () => {
    // 未完了と完了済みの ToDo を作成
    addTodo('仕様書を読む');
    addTodo('単体テストを書く');
    setTodoCompleted('仕様書を読む', true);

    // ハッシュが設定されていない状態で、2 件とも表示されていること
    expect(getRenderedLabels()).toEqual(['仕様書を読む', '単体テストを書く']);

    // 明示的に #/ を選択した場合も同じ結果になること
    await changeFilter('#/');
    expect(getRenderedLabels()).toEqual(['仕様書を読む', '単体テストを書く']);
  });

  it('Add ボタン押下時に未完了の ToDo が 1 件追加されること', () => {
    // ToDo を作成
    addTodo('仕様書を読む');

    // リストに未完了の li が 1 件表示されていること
    const items = document.querySelectorAll('#todo-list li');
    expect(items).toHaveLength(1);

    const item = items[0];
    expect(item.classList.contains('completed')).toBe(false);
    expect(item.querySelector('label')?.textContent).toBe('仕様書を読む');
    expect(item.querySelector('input[type="checkbox"]')?.checked).toBe(false);
  });

  it('チェックボックスをオンにすると完了状態が反映されること', () => {
    // ToDo を作成
    addTodo('仕様書を読む');

    // チェックボックスをオンにすると、完了状態が反映されていること
    setTodoCompleted('仕様書を読む', true);
    const updated = document.querySelector('#todo-list li');
    expect(updated.classList.contains('completed')).toBe(true);
    expect(updated.querySelector('input[type="checkbox"]').checked).toBe(true);

    // 再度チェックボックスをオフにすると、未完了へ戻せること
    setTodoCompleted('仕様書を読む', false);
    const reversed = document.querySelector('#todo-list li');
    expect(reversed.classList.contains('completed')).toBe(false);
    expect(reversed.querySelector('input[type="checkbox"]').checked).toBe(
      false
    );
  });

  it('削除ボタンで指定した ToDo のみが取り除かれること', () => {
    // 複数の ToDo を作成
    addTodo('仕様書を読む');
    addTodo('単体テストを書く');

    // 先頭アイテムの削除ボタンをクリック
    document
      .querySelector('#todo-list li button.destroy')
      .dispatchEvent(new window.Event('click'));

    // 後から追加したタスク 1 件のみが残存していること
    expect(getRenderedLabels()).toEqual(['単体テストを書く']);
  });

  it('Active フィルタを押下すると未完了タスクのみが表示され、チェックボックスの状態変化にも追随すること', async () => {
    // 未完了と完了済みの ToDo を作成
    addTodo('仕様書を読む');
    addTodo('単体テストを書く');
    setTodoCompleted('仕様書を読む', true);

    // URL ハッシュを #/active に変更してhashchange イベントを発火
    await changeFilter('#/active');

    // 未完了タスクのみが表示されること
    expect(getRenderedLabels()).toEqual(['単体テストを書く']);

    // フィルタ表示中にチェックを入れると、直ちにリストから除外されること
    setTodoCompleted('単体テストを書く', true);
    expect(getRenderedLabels()).toEqual([]);

    // All に切り替えてから再度未完にすると、active でも再表示されること
    await changeFilter('#/');
    expect(getRenderedLabels()).toEqual(['仕様書を読む', '単体テストを書く']);
    setTodoCompleted('単体テストを書く', false);
    await changeFilter('#/active');
    expect(getRenderedLabels()).toEqual(['単体テストを書く']);
  });

  it('Completed フィルタを押下すると完了済みタスクのみが表示され、チェックボックスの状態変化にも追随すること', async () => {
    // 未完了と完了済みの ToDo を作成
    addTodo('仕様書を読む');
    addTodo('単体テストを書く');
    setTodoCompleted('仕様書を読む', true);

    // URL ハッシュを #/completed に変更してhashchange イベントを発火
    await changeFilter('#/completed');

    // 完了済みタスクのみが表示されること
    expect(getRenderedLabels()).toEqual(['仕様書を読む']);

    // フィルタ表示中にチェックを外すと、直ちにリストから除外されること
    setTodoCompleted('仕様書を読む', false);
    expect(getRenderedLabels()).toEqual([]);

    // All に切り替えてから再度完了させると、Completed でも再表示されること
    await changeFilter('#/');
    expect(getRenderedLabels()).toEqual(['仕様書を読む', '単体テストを書く']);
    setTodoCompleted('仕様書を読む', true);
    await changeFilter('#/completed');
    expect(getRenderedLabels()).toEqual(['仕様書を読む']);
  });
});
