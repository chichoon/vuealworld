import { test, expect } from '@playwright/test';

import { login } from '../utils/login';

test('Profile Update', async ({ page }) => {
  const bioText = `${Math.random()}-Bio`;
  await login(page);

  await page.goto('/settings');
  const bio = page.locator('textarea').first();
  await bio.waitFor({ state: 'visible' });

  bio.fill(bioText);
  await page.getByRole('button', { name: 'Update Settings' }).click();
  await page.goto(`/profile/${process.env.USERNAME}`);
  await expect(page.locator('h4')).toHaveText(process.env.USERNAME);
  await expect(page.getByRole('paragraph').first()).toHaveText(bioText);
});
