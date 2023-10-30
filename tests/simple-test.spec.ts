import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  const name = await page.innerText('.navbar-brand');
  expect(name).toBe('conduit');
});
