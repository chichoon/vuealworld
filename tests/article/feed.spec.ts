import { expect, test } from '@playwright/test';
import { login } from '../utils/login';

test('User Feed test', async ({ page }) => {
  await login(page);
  await page.goto('/');
  await page.waitForSelector('text=Your Feed');

  const myFeedArticlesRequest = page.waitForResponse((res) => res.url().endsWith('/feed?limit=10'));
  const myFeedArticlesResponse = (await myFeedArticlesRequest).json();
  expect(myFeedArticlesResponse).toHaveProperty('articlesCount');
});
