import { test, expect } from '@playwright/test';

test.describe('UI Exploratory Bug Hunting', () => {
  
  test('Check Buggy UI Homepage & Product Details', async ({ page }) => {
    await page.goto('https://with-bugs.practicesoftwaretesting.com');
    await page.waitForLoadState('networkidle');

    // Print all product card titles and prices
    const productTitles = await page.locator('.card-title').allInnerTexts();
    const productPrices = await page.locator('[data-test="product-price"]').allInnerTexts();
    
    console.log('--- Buggy UI Homepage Products ---');
    productTitles.slice(0, 5).forEach((title, idx) => {
      console.log(`[${idx}] ${title.trim()} - Price: ${productPrices[idx]}`);
    });

    // Click on the first product
    await page.locator('.card').first().click();
    await page.waitForURL(/.*\/product\/.*/);

    const productTitle = await page.locator('[data-test="product-name"]').innerText();
    const productPrice = await page.locator('[data-test="unit-price"]').innerText();
    console.log(`Navigated to Product: ${productTitle} @ ${productPrice}`);

    // Try adding quantity 0
    const qtyInput = page.locator('[data-test="quantity"]');
    await qtyInput.fill('0');
    await page.locator('[data-test="add-to-cart"]').click();

    // Check toast or cart icon count
    const cartCount = await page.locator('[data-test="cart-quantity"]').innerText();
    console.log(`Cart count after adding Qty 0: "${cartCount}"`);
  });

  test('Check Clean UI Homepage & Product Details', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await page.waitForLoadState('networkidle');

    const productTitles = await page.locator('.card-title').allInnerTexts();
    const productPrices = await page.locator('[data-test="product-price"]').allInnerTexts();
    
    console.log('--- Clean UI Homepage Products ---');
    productTitles.slice(0, 5).forEach((title, idx) => {
      console.log(`[${idx}] ${title.trim()} - Price: ${productPrices[idx]}`);
    });
  });

});
