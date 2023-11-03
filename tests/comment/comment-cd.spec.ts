import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('Comment CD', async ({ page }) => {
  const commentText = `${Math.floor(Math.random() * 1000000)} Random Comment`;
  await login(page);

  await page.goto('/');
  const article = page.locator('.article-preview').first();
  await article.waitFor({ state: 'visible' });
  await article.locator('.preview-link').click();
  await page.locator('.container > h1').first().waitFor({ state: 'visible' });

  await test.step('Create Comment', async () => {
    await page.getByPlaceholder('Write a comment...').fill(commentText);
    await page.getByRole('button', { name: 'Post Comment' }).click();
    await page.waitForTimeout(5000);
    await expect(page.getByText(commentText)).toBeVisible();
  });

  await test.step('Delete Comment', async () => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Are you sure to delete this comment?');
      await dialog.accept();
    });

    const commentBlock = page.locator('.card').filter({ has: page.getByText(commentText) });
    const deleteBtn = commentBlock.locator('.delete-button');
    await deleteBtn.click();
    await page.waitForTimeout(5000);
    await expect(commentBlock).not.toBeVisible();
  });
});
