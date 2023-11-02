import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('Article CRUD', async ({ page }) => {
  const title = `${Math.floor(Math.random() * 1000000)}Article`;
  await login(page);

  await test.step('Create Article', async () => {
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
    const article = page.locator('.article-preview').first();
    await article.waitFor({ state: 'visible' });
    await expect(article.getByRole('heading', { name: title })).toBeVisible();
  });

  await test.step('Read Article', async () => {
    await page.goto(`/article/${title}-${process.env.ID}`);
    await page.locator('.container > h1').first().waitFor({ state: 'visible' });
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
    await expect(page.locator('.author').first()).toBeVisible();
    await expect(page.locator('.col-md-12 > p')).toBeVisible();
    await expect(page.locator('.tag-default')).toBeVisible();
  });

  await test.step('Update Article', async () => {
    await page.getByRole('link', { name: 'Edit Article' }).first().click();
    await expect(page).toHaveURL(`/editor/${title}-${process.env.ID}`);
    await page.locator('.form-control').nth(1).fill('Test description updated');
    await page.locator('.form-control').nth(2).fill('Test body updated');

    await page.getByRole('button', { name: 'Edit Article' }).click();
    await page.locator('.container > h1').first().waitFor({ state: 'visible' });

    await expect(page.getByRole('heading', { name: title })).toBeVisible();
    await expect(page.locator('.col-md-12 > p')).toHaveText('Test body updated');
  });

  await test.step('Delete Article', async () => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Are you sure to delete this article?');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Delete Article' }).first().click();
    await expect(page).toHaveURL('/');
    await page.goto(`/article/${title}-${process.env.ID}`);
    await page.waitForTimeout(5000);
    await expect(page.locator('.container > h1').first()).not.toBeVisible();
  });
});
