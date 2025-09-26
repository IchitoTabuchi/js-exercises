import { expect, test } from '@playwright/test';

test.describe('Product filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/ch15-1/ex14/index.html');
  });

  test('should show all products when "all" is selected', async ({ page }) => {
    await page.selectOption('[data-testid="select"]', 'all');
    await expect(page.locator('[data-testid="food1"]')).toBeVisible();
    await expect(page.locator('[data-testid="stationery1"]')).toBeVisible();
    await expect(page.locator('[data-testid="stationery2"]')).toBeVisible();
  });

  test('should show only food products when "food" is selected', async ({
    page,
  }) => {
    await page.selectOption('[data-testid="select"]', 'food');
    await expect(page.locator('[data-testid="food1"]')).toBeVisible();
    await expect(page.locator('[data-testid="stationery1"]')).toBeHidden();
    await expect(page.locator('[data-testid="stationery2"]')).toBeHidden();
  });

  test('should show only stationery products when "stationery" is selected', async ({
    page,
  }) => {
    await page.selectOption('[data-testid="select"]', 'stationery');
    await expect(page.locator('[data-testid="food1"]')).toBeHidden();
    await expect(page.locator('[data-testid="stationery1"]')).toBeVisible();
    await expect(page.locator('[data-testid="stationery2"]')).toBeVisible();
  });
});
