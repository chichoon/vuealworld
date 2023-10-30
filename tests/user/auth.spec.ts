import { test, expect } from '@playwright/test';

test('Register and Login test', async ({ page }) => {
  await page.goto('/register');
  await expect(page).toHaveURL('/register');

  const SID = Math.random();
  await page.getByPlaceholder('Username').fill(`aaatest${SID}`);
  await page.getByPlaceholder('Email').fill(`aaatest${SID}@gmail.com`);
  await page.getByPlaceholder('Password').fill(`aaatest${SID}`);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('/');

  await page.goto('/login');
  await expect(page).toHaveURL('/login');

  await page.getByPlaceholder('Email').fill(`aaatest${SID}@gmail.com`);
  await page.getByPlaceholder('Password').fill(`aaatest${SID}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/');

  const headerInfo = page.getByTestId('nav-userdata');
  await expect(headerInfo).toHaveText(`aaatest${SID}`);
});
