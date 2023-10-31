import { Page, expect, test } from '@playwright/test';
import { login } from '../utils/login';

async function testArticlesCountFromPath(page: Page, path: string) {
  const articlesRequest = await page.waitForResponse((res) => res.url().endsWith(`${path}?limit=10`));
  const articlesResponse = await articlesRequest.json();
  expect(articlesResponse).toHaveProperty('articlesCount');

  const articlesCountFromResponse = articlesResponse.articlesCount;
  const paginationList = await page.getByTestId('pagination-button').all();
  const pageButton = paginationList[paginationList.length - 1];
  await pageButton.click();

  await page.waitForResponse((res) =>
    res.url().endsWith(`${path}?offset=${(paginationList.length - 1) * 10}&limit=10`),
  );
  await page.waitForTimeout(2000);
  const articlesCount = (await page.getByTestId('article-preview').count()) + (paginationList.length - 1) * 10;
  expect(articlesCount).toEqual(articlesCountFromResponse);
}

test('User Feed test', async ({ page }) => {
  await login(page);
  await page.goto('/');
  await page.waitForSelector('text=Your Feed');

  await testArticlesCountFromPath(page, '/feed');
});

test('Global Feed test', async ({ page }) => {
  await login(page);
  await page.goto('/');
  await page.waitForSelector('text=Global Feed');

  await testArticlesCountFromPath(page, '/articles');
});
