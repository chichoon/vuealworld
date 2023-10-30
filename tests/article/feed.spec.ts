import { expect, test } from '@playwright/test';
import { login } from '../utils/login';

test('User Feed test', async ({ page }) => {
  await login(page);
  await page.goto('/');
  await page.waitForSelector('text=Your Feed');

  const myFeedArticlesRequest = page.waitForResponse((res) => res.url().endsWith('/feed?limit=10'));
  const myFeedArticlesResponse = await (await myFeedArticlesRequest).json();
  expect(myFeedArticlesResponse).toHaveProperty('articlesCount');

  await page.waitForTimeout(3000);
  const articlesCountFromResponse = myFeedArticlesResponse.articlesCount;
  const paginationList = await page.getByTestId('pagination-button').all();
  const pageButton = paginationList[paginationList.length - 1];
  await pageButton.click();

  await page.waitForTimeout(5000);
  // TODO: 여기 안됨
  const articlesCount = (await page.getByTestId('article-list').count()) + (paginationList.length - 1) * 10;
  expect(articlesCount).toEqual(articlesCountFromResponse);
});
