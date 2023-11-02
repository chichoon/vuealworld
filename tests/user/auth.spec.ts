import { test, expect } from '@playwright/test';

const id = `a${Math.floor(Math.random() * 100000)}atest`;

test('User Register', async ({ page }) => {
  await page.goto('/register');
  await expect(page).toHaveURL('/register');

  await page.getByPlaceholder('Username').fill(id);
  await page.getByPlaceholder('Email').fill(`${id}@gmail.com`);
  await page.getByPlaceholder('Password').fill(id);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('/');
});

test('User Login and Logout', async ({ page }) => {
  await test.step('Login', async () => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');

    await page.getByPlaceholder('Email').fill(`${id}@gmail.com`);
    await page.getByPlaceholder('Password').fill(id);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/');

    const headerInfo = page.getByTestId('nav-userdata');
    await expect(headerInfo).toHaveText(id);
  });

  await test.step('Logout', async () => {
    const settingsBtn = page.getByRole('link', { name: 'Settings' });
    await expect(settingsBtn).toHaveAttribute('href', '/settings');

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Are you sure you want to logout?');
      await dialog.accept();
    });

    await settingsBtn.click();
    await expect(page).toHaveURL('/settings');

    await page.locator('.form-control').first().waitFor({ state: 'visible' });

    const logoutBtn = page.getByRole('button', { name: 'Or click here to logout.' });
    await logoutBtn.click();

    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });
});
