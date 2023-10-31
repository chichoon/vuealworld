import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('Article Creation test', async ({ page }) => {
  const SID = Math.random().toString();
  await login(page);

  await page.getByRole('link', { name: 'New Article' }).click();
  await page.waitForURL('/editor');

  await page.getByPlaceholder('Article Title').fill(SID);
  await page.getByPlaceholder("What's this article about?").fill('Test description');
  await page.getByPlaceholder('Write your article (in markdown)').fill('Test body');
  await page.getByPlaceholder('Enter tags').fill('test');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'test' })).toBeVisible();

  await page.getByRole('button', { name: 'Publish Article' }).click();
  await page.waitForURL('/');
  //   await page.waitForResponse((res) => res.url().endsWith('/feed?limit=10'));

  await page.getByRole('button', { name: 'Global Feed' }).click();
  await page.waitForTimeout(2000);
  const article = page.getByTestId('article-preview').nth(0);
  expect(article.getByRole('heading', { name: SID })).toBeVisible();
});
