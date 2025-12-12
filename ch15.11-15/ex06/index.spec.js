import { expect, test } from '@playwright/test';

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole('textbox').fill(todo);
  await page.getByRole('button', { name: 'Add' }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  await page.getByRole('listitem').nth(index).getByRole('checkbox').check();
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

test.describe('sessionStorage版ToDoアプリ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ch15.11-15/ex06');
    await page.evaluate(() => sessionStorage.clear());
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

  test('sessionStorageが使用できない場合でもエラーが発生しない', async ({
    page,
  }) => {
    // sessionStorageを無効化
    await page.addInitScript(() => {
      Object.defineProperty(window, 'sessionStorage', {
        get() {
          throw new Error('sessionStorage is disabled');
        },
      });
    });

    await page.goto('/ch15.11-15/ex06');

    // ToDoを追加できることを確認（エラーが発生しない）
    await page.getByRole('textbox').fill('Test Task');
    await page.getByRole('button', { name: 'Add' }).click();

    // リストに追加されることを確認
    const count = await page.getByRole('listitem').count();
    expect(count).toBe(1);

    // ただしリロード後は消える（sessionStorageが使えないため）
    await page.reload();
    const countAfterReload = await page.getByRole('listitem').count();
    expect(countAfterReload).toBe(0);
  });
});
