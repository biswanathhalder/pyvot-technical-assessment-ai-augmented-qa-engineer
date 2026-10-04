import { test, expect } from '@playwright/test';

test.describe('Deep Comparative UI & Money Math Audit', () => {

  test('BUG AUDIT 1: Quantity Input BVA (0, Negative, Exceeding Stock)', async ({ page }) => {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/product/1');
    await page.waitForSelector('[data-test="quantity"]');

    // 1. Qty = 0
    await page.locator('[data-test="quantity"]').fill('0');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(500);
    const badgeAfter0 = await page.locator('[data-test="cart-quantity"]').innerText();
    console.log('[BUG AUDIT] Cart Badge after Qty=0:', badgeAfter0);

    // 2. Qty = -5
    await page.locator('[data-test="quantity"]').fill('-5');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(500);
    const badgeAfterNeg = await page.locator('[data-test="cart-quantity"]').innerText();
    console.log('[BUG AUDIT] Cart Badge after Qty=-5:', badgeAfterNeg);
  });

  test('BUG AUDIT 2: Cart Page Financial Math & Subtotals', async ({ page }) => {
    // Add product to cart
    await page.goto('https://with-bugs.practicesoftwaretesting.com/product/1');
    await page.waitForSelector('[data-test="quantity"]');
    await page.locator('[data-test="quantity"]').fill('3');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.waitForTimeout(500);

    // Go to Cart
    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForURL(/.*\/checkout/);
    await page.waitForSelector('[data-test="product-price"]', { timeout: 10000 }).catch(() => null);

    const priceText = await page.locator('[data-test="product-price"]').innerText().catch(() => 'N/A');
    const qtyVal = await page.locator('[data-test="product-quantity"]').inputValue().catch(() => page.locator('[data-test="product-quantity"]').innerText().catch(() => 'N/A'));
    const lineTotalText = await page.locator('[data-test="line-price"]').innerText().catch(() => 'N/A');
    const subtotalText = await page.locator('[data-test="cart-subtotal"]').innerText().catch(() => 'N/A');

    console.log(`[BUG AUDIT CART]: Price=${priceText}, Qty=${qtyVal}, LineTotal=${lineTotalText}, Subtotal=${subtotalText}`);
  });

  test('BUG AUDIT 3: Search Filtering & Reset Behavior', async ({ page }) => {
    await page.goto('https://with-bugs.practicesoftwaretesting.com');
    await page.waitForSelector('[data-test="search-query"]');

    // Search query
    await page.locator('[data-test="search-query"]').fill('Pliers');
    await page.locator('[data-test="search-submit"]').click();
    await page.waitForTimeout(1000);

    const countAfterSearch = await page.locator('.card').count();
    console.log(`[BUG AUDIT SEARCH] Found ${countAfterSearch} results for "Pliers"`);
  });

  test('BUG AUDIT 4: User Registration Form Constraints', async ({ page }) => {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/auth/register');
    await page.waitForSelector('[data-test="register-submit"]');

    // Submit empty form
    await page.locator('[data-test="register-submit"]').click();
    await page.waitForTimeout(500);
    
    // Check validation error messages
    const errors = await page.locator('.alert-danger, .invalid-feedback, .alert').allInnerTexts();
    console.log(`[BUG AUDIT REGISTRATION] Validation errors count: ${errors.length}`, errors);
  });

});
