import { test, expect } from '@playwright/test';

function randomIDGenerator() {
  return `a${Math.random()}atest`;
}

test('Register, Login, Logout test', async ({ page }) => {
  const id = randomIDGenerator();
  await test.step('Register', async () => {
    await page.goto('/register');
    await expect(page).toHaveURL('/register');

    await page.getByPlaceholder('Username').fill(`${id}`);
    await page.getByPlaceholder('Email').fill(`${id}@gmail.com`);
    await page.getByPlaceholder('Password').fill(`${id}`);
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page).toHaveURL('/');
  });

  await test.step('Login', async () => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');

    await page.getByPlaceholder('Email').fill(`${id}@gmail.com`);
    await page.getByPlaceholder('Password').fill(`${id}`);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/');

    const headerInfo = page.getByTestId('nav-userdata');
    await expect(headerInfo).toHaveText(`${id}`);
  });

  await test.step('Logout', async () => {
    await page.goto(`/profile/${id}`);
  });
});
