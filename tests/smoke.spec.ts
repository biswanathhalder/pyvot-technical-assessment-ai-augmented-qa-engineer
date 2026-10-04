import { test, expect } from '@playwright/test';

test('Verify target buggy site loads', async ({ page }) => {
  await page.goto('https://with-bugs.practicesoftwaretesting.com');
  await expect(page).toHaveTitle(/Practice Software Testing/i);
});

test('Verify oracle clean site loads', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await expect(page).toHaveTitle(/Practice Software Testing/i);
});

test('Verify buggy REST API ping', async ({ request }) => {
  const response = await request.get('https://api-with-bugs.practicesoftwaretesting.com/products');
  expect(response.status()).toBe(200);
});
