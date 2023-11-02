import { expect, test } from '@playwright/test';
import { login } from '../utils/login';

test('Article Like and Dislike', async ({ page }) => {
  await login(page);

  await page.locator('text=Global Feed').waitFor({ state: 'visible' });
  await page.locator('text=Global Feed').click();
  await page.locator('.article-preview').first().waitFor({ state: 'visible' });

  const paginationList = await page.getByTestId('pagination-button').all();
  await paginationList[paginationList.length - 1].click();

  await test.step('Like Article', async () => {
    const article = page.locator('.article-preview').first();
    await article.waitFor({ state: 'visible' });
    const likeButton = article.locator('.btn-outline-primary');
    await likeButton.click();
    await expect(likeButton).toHaveClass(/favorited/);
  });

  await test.step('Dislike Article', async () => {
    const article = page.locator('.article-preview').first();
    await article.waitFor({ state: 'visible' });
    const likeButton = article.locator('.btn-outline-primary');
    await likeButton.click();
    await expect(likeButton).not.toHaveClass(/favorited/);
  });
});
