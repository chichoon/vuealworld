import { Page, expect } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL('/login');

  await page.getByPlaceholder('Email').fill(process.env.EMAIL);
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/');

  await expect(page.getByTestId('nav-userdata')).toHaveText(process.env.USERNAME);
}
