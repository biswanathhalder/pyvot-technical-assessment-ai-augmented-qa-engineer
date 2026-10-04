import { chromium } from '@playwright/test';

async function auditFullApp() {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🚀 FULL APP DEEP AUDIT STARTED...\n');

  // --- 1. Top Nav Bar Typos & Links ---
  console.log('--- 1. Testing Top Navigation ---');
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
  await page.waitForSelector('.card');
  const contactText = await page.locator('[data-test="nav-contact"]').innerText();
  console.log(`Contact Nav Link Text: "${contactText}" (Expected: "Contact")`);

  // --- 2. Add to Cart & Checkout Journey ---
  console.log('\n--- 2. Testing Product Add to Cart & Money Math ---');
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/product/1');
  await page.waitForSelector('[data-test="quantity"]');

  const unitPriceText = await page.locator('[data-test="unit-price"]').innerText();
  console.log(`Product 1 Unit Price: ${unitPriceText}`); // $14.15

  // Change quantity to 3
  await page.locator('[data-test="quantity"]').fill('3');
  await page.locator('[data-test="add-to-cart"]').click();
  await page.waitForTimeout(1000);

  // Navigate to Cart/Checkout
  await page.locator('[data-test="nav-cart"]').click();
  await page.waitForTimeout(1500);

  console.log('Cart Page URL:', page.url());
  
  // Inspect cart elements
  const linePrices = await page.locator('[data-test="line-price"]').allInnerTexts().catch(() => []);
  const cartSubtotal = await page.locator('[data-test="cart-subtotal"]').innerText().catch(() => 'N/A');
  console.log(`Cart Line Prices:`, linePrices);
  console.log(`Cart Subtotal:`, cartSubtotal);

  // --- 3. Checkout Wizard Steps ---
  console.log('\n--- 3. Testing Checkout Wizard ---');
  const proceedBtn1 = page.locator('[data-test="proceed-1"], button:has-text("Proceed to checkout")').first();
  if (await proceedBtn1.isVisible()) {
    await proceedBtn1.click();
    await page.waitForTimeout(1000);
    console.log('Moved to Step 2 URL:', page.url());
  }

  // --- 4. User Registration & Auth Check ---
  console.log('\n--- 4. Testing Registration & Login ---');
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/auth/register');
  await page.waitForSelector('[data-test="register-submit"]');

  // Test registration with invalid email format
  await page.locator('[data-test="first-name"]').fill('John');
  await page.locator('[data-test="last-name"]').fill('Doe');
  await page.locator('[data-test="email"]').fill('invalid-email-address');
  await page.locator('[data-test="password"]').fill('short');
  await page.locator('[data-test="register-submit"]').click();
  await page.waitForTimeout(1000);

  const regErrors = await page.locator('.alert, .invalid-feedback').allInnerTexts();
  console.log('Registration Validation Errors:', regErrors);

  await browser.close();
}

auditFullApp();
