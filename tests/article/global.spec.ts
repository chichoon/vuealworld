import test, { expect } from '@playwright/test';
import { login } from '../utils/login';

test('Global Feed test', async ({ page }) => {
  await login(page);
  await page.goto('/');
  await page.waitForSelector('text=Global Feed');

  await page.getByRole('button', { name: 'Global Feed' }).click();
  const globalFeedArticlesRequest = await page.waitForResponse((res) => res.url().endsWith('/articles?limit=10'));
  const globalFeedArticlesResponse = await globalFeedArticlesRequest.json();
  expect(globalFeedArticlesResponse).toHaveProperty('articlesCount');

  const articlesCountFroResponse = globalFeedArticlesResponse.articlesCount;
  const paginationList = await page.getByTestId('pagination-button').all();
  const pageButton = paginationList[paginationList.length - 1];
  await pageButton.click();

  await page.waitForResponse((res) =>
    res.url().endsWith(`/articles?offset=${(paginationList.length - 1) * 10}&limit=10`),
  );
  await page.waitForTimeout(2000);
  const articlesCount = (await page.getByTestId('article-preview').count()) + (paginationList.length - 1) * 10;
  expect(articlesCount).toEqual(articlesCountFroResponse);
});
