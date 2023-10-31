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

  await test.step('Login and Logout', async () => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');

    await page.getByPlaceholder('Email').fill(`${id}@gmail.com`);
    await page.getByPlaceholder('Password').fill(`${id}`);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/');

    const headerInfo = page.getByTestId('nav-userdata');
    await expect(headerInfo).toHaveText(`${id}`);

    const settingsBtn = page.getByRole('link', { name: 'Settings' });
    await expect(settingsBtn).toHaveAttribute('href', '/settings');

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Are you sure you want to logout?');
      await dialog.accept();
    });

    await settingsBtn.click();
    await expect(page).toHaveURL('/settings');

    await page.waitForSelector('.form-control');
    const logoutBtn = page.getByRole('button', { name: 'Or click here to logout.' });
    await logoutBtn.click();

    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });
});
