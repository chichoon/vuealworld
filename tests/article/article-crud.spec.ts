import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

const title = `${Math.floor(Math.random() * 1000000)}Article`;

test('Article Creation', async ({ page }) => {
  await login(page);

  await page.getByRole('link', { name: 'New Article' }).click();
  await page.waitForURL('/editor');

  await page.getByPlaceholder('Article Title').fill(title);
  await page.getByPlaceholder("What's this article about?").fill('Test description');
  await page.getByPlaceholder('Write your article (in markdown)').fill('Test body');
  await page.getByPlaceholder('Enter tags').fill('test');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'test' })).toBeVisible();

  await page.getByRole('button', { name: 'Publish Article' }).click();
  await page.waitForURL('/');

  await page.getByRole('button', { name: 'Global Feed' }).click();
  await page.locator('.article-preview').first().waitFor({ state: 'visible' });
  const article = page.getByTestId('article-preview').first();
  expect(article.getByRole('heading', { name: title })).toBeVisible();
});

test('Article Read', async ({ page }) => {
  await page.goto(`/article/${title}-${process.env.ID}`);
  await page.locator('.container > h1').first().waitFor({ state: 'visible' });
  expect(page.getByRole('heading', { name: title })).toBeVisible();
  expect(page.locator('.author').first()).toBeVisible();
  expect(page.locator('.col-md-12 > p')).toBeVisible();
  expect(page.locator('.tag-default')).toBeVisible();
});
