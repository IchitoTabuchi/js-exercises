import { expect, test } from '@playwright/test';

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole('textbox').fill(todo);
  await page.getByRole('button', { name: 'Add' }).click();
  // IndexedDBの書き込みが完了するまで少し待機
  await page.waitForTimeout(100);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  await page.getByRole('listitem').nth(index).getByRole('checkbox').check();
  // IndexedDBの書き込みが完了するまで少し待機
  await page.waitForTimeout(100);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
  await page
    .getByRole('listitem')
    .nth(index)
    .getByRole('button', { name: '❌' })
    .click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole('listitem').count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole('listitem').nth(index);
}

test.describe('IndexedDB版ToDoアプリ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ch15.11-15/ex05');
    // IndexedDBをクリア
    await page.evaluate(
      () =>
        new Promise((resolve) => {
          const request = indexedDB.deleteDatabase('todo-db');
          request.onsuccess = () => resolve();
          request.onerror = () => resolve();
          request.onblocked = () => resolve();
        })
    );
    await page.reload();
  });

  test('デフォルトではToDoが0件', async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test('ToDoを追加できる', async ({ page }) => {
    await addToDo(page, 'Test Task 1');

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText('Test Task 1');
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS('text-decoration-line', 'none');
  });

  test('複数のToDoを追加できる', async ({ page }) => {
    await addToDo(page, 'Task 1');
    await addToDo(page, 'Task 2');
    await addToDo(page, 'Task 3');

    expect(await countToDos(page)).toBe(3);

    // 新しいものが上に来るので、逆順で確認
    const todo1 = queryToDo(page, 0);
    await expect(todo1.getByText('Task 3')).toBeVisible();

    const todo2 = queryToDo(page, 1);
    await expect(todo2.getByText('Task 2')).toBeVisible();

    const todo3 = queryToDo(page, 2);
    await expect(todo3.getByText('Task 1')).toBeVisible();
  });

  test('ToDoをチェックして完了にできる', async ({ page }) => {
    await addToDo(page, 'Task to complete');

    const todo = queryToDo(page, 0);
    const label = todo.getByText('Task to complete');
    await expect(label).toHaveCSS('text-decoration-line', 'none');

    // チェックボックスをチェック
    await checkToDo(page, 0);

    // 取り消し線が付くことを確認
    await expect(label).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('ToDoを削除できる', async ({ page }) => {
    await addToDo(page, 'Task to delete');

    expect(await countToDos(page)).toBe(1);

    // 削除ボタンをクリック
    await deleteToDo(page, 0);

    // リストから削除されることを確認
    expect(await countToDos(page)).toBe(0);
  });

  test('空のToDoは追加できない', async ({ page }) => {
    // 空文字列で送信
    await page.getByRole('textbox').fill('');
    await page.getByRole('button', { name: 'Add' }).click();

    // ToDoが追加されないことを確認
    expect(await countToDos(page)).toBe(0);

    // スペースのみの文字列で送信
    await page.getByRole('textbox').fill('   ');
    await page.getByRole('button', { name: 'Add' }).click();

    // ToDoが追加されないことを確認
    expect(await countToDos(page)).toBe(0);
  });

  test('ページをリロードしてもToDoが保持される', async ({ page }) => {
    await addToDo(page, 'Persistent Task');

    expect(await countToDos(page)).toBe(1);

    // ページをリロード
    await page.reload();

    // ToDoが保持されていることを確認
    expect(await countToDos(page)).toBe(1);
    const todo = queryToDo(page, 0);
    await expect(todo.getByText('Persistent Task')).toBeVisible();
  });

  test('複数のToDoを追加してリロードしても全て保持される', async ({ page }) => {
    await addToDo(page, 'Task 1');
    await addToDo(page, 'Task 2');
    await addToDo(page, 'Task 3');

    expect(await countToDos(page)).toBe(3);

    // ページをリロード
    await page.reload();

    // 全てのToDoが保持されることを確認
    expect(await countToDos(page)).toBe(3);
    await expect(queryToDo(page, 0).getByText('Task 3')).toBeVisible();
    await expect(queryToDo(page, 1).getByText('Task 2')).toBeVisible();
    await expect(queryToDo(page, 2).getByText('Task 1')).toBeVisible();
  });

  test('完了状態もリロード後に保持される', async ({ page }) => {
    await addToDo(page, 'Task 1');
    await addToDo(page, 'Task 2');

    // Task 2を完了にする
    await checkToDo(page, 0);

    // ページをリロード
    await page.reload();

    // 完了状態が保持されることを確認
    expect(await countToDos(page)).toBe(2);
    const todo = queryToDo(page, 0);
    const checkbox = todo.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
    const label = todo.getByText('Task 2');
    await expect(label).toHaveCSS('text-decoration-line', 'line-through');
  });

  test('複数タブ間でToDoが同期される', async ({ page, context }) => {
    // page(= page1)はbeforeEachで初期化済み
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // page1でToDoを追加
    await page.getByRole('textbox').fill('Synced Task');
    await page.getByRole('button', { name: 'Add' }).click();

    // page1でToDoが表示されることを確認（DOMに追加されるまで待つ）
    await expect(page.getByText('Synced Task')).toBeVisible();
    await page.waitForTimeout(200); // IndexedDB書き込み完了を待つ

    // 2つ目のページを開く（IndexedDBは共有されているので同じデータが表示されるはず）
    const page2 = await context.newPage();
    await page2.goto('/ch15.11-15/ex05');
    await page2.waitForLoadState('domcontentloaded');
    await page2.waitForTimeout(1000); // IndexedDB初期化とデータ読み込みを待つ

    // page2でもToDoが表示されることを確認（IndexedDBから読み込まれる）
    const count = await page2.getByRole('listitem').count();
    expect(count).toBe(1);
    await expect(page2.getByText('Synced Task')).toBeVisible();

    await page2.close();
  });

  test('一方のタブで削除すると他方のタブにも反映される', async ({
    page,
    context,
  }) => {
    // page(= page1)はbeforeEachで初期化済み
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // ToDoを追加
    await page.getByRole('textbox').fill('Task to sync delete');
    await page.getByRole('button', { name: 'Add' }).click();
    await page.waitForTimeout(200); // 追加完了を待つ

    // page1でToDoを削除
    await page.getByRole('button', { name: '❌' }).click();
    await page.waitForTimeout(200); // IndexedDB削除完了を待つ

    // page1で削除されたことを確認
    expect(await page.getByRole('listitem').count()).toBe(0);

    // 2つ目のページを開く（IndexedDBにはデータが残っていないはず）
    const page2 = await context.newPage();
    await page2.goto('/ch15.11-15/ex05');
    await page2.waitForLoadState('domcontentloaded');
    await page2.waitForTimeout(1000); // IndexedDB初期化とデータ読み込みを待つ

    // page2でもToDoが表示されないことを確認（IndexedDBから読み込まれる）
    const count = await page2.getByRole('listitem').count();
    expect(count).toBe(0);

    await page2.close();
  });

  test('IndexedDBが使用できない場合でもエラーが発生しない', async ({
    page,
  }) => {
    // IndexedDBを無効化
    await page.addInitScript(() =>
      Object.defineProperty(window, 'indexedDB', {
        get() {
          throw new Error('IndexedDB is disabled');
        },
      })
    );

    await page.goto('/ch15.11-15/ex05');

    // エラーアラートが表示されることを確認
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('IndexedDB');
      await dialog.accept();
    });

    // 少し待機してエラー処理が完了するのを待つ
    await page.waitForTimeout(1000);
  });
});
