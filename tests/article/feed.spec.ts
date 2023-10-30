import { expect, test } from '@playwright/test';
import { login } from '../utils/login';

test('User Feed test', async ({ page }) => {
  await login(page);
  await page.goto('/');
  await page.waitForSelector('text=Your Feed');

  const myFeedArticlesRequest = await page.waitForResponse((res) => res.url().endsWith('/feed?limit=10'));
  const myFeedArticlesResponse = await myFeedArticlesRequest.json();
  expect(myFeedArticlesResponse).toHaveProperty('articlesCount');

  const articlesCountFromResponse = myFeedArticlesResponse.articlesCount;
  const paginationList = await page.getByTestId('pagination-button').all();
  const pageButton = paginationList[paginationList.length - 1];
  await pageButton.click();

  await page.waitForResponse((res) => res.url().endsWith(`/feed?offset=${(paginationList.length - 1) * 10}&limit=10`));
  await page.waitForTimeout(2000);
  const articlesCount = (await page.getByTestId('article-preview').count()) + (paginationList.length - 1) * 10;
  expect(articlesCount).toEqual(articlesCountFromResponse);
});
