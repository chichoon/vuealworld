import { expect, test } from '@playwright/test';
import { login } from '../utils/login';

test('User Profile Follow and Unfollow', async ({ page }) => {
  await login(page);

  await page.goto('/profile/Gerome');
  const header = page.locator('.col-xs-12 > h4').first();
  await header.waitFor({ state: 'visible' });
  await expect(header).toHaveText('Gerome');

  const followButton = page.getByRole('button', { name: ' Follow Gerome' });

  await test.step('Follow User', async () => {
    await followButton.click();
    await page.waitForTimeout(500);
    await expect(followButton).toHaveClass(/following/);
  });

  await test.step('Unfollow User', async () => {
    await followButton.click();
    await page.waitForTimeout(500);
    await expect(followButton).not.toHaveClass(/following/);
  });
});
