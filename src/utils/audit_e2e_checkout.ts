import { chromium } from '@playwright/test';
import axios from 'axios';

async function completeOrderAudit() {
  const BUGGY_API = 'https://api-with-bugs.practicesoftwaretesting.com';
  
  const testEmail = `checkout_order_${Date.now()}@example.com`;
  const password = 'Password123!';
  
  await axios.post(`${BUGGY_API}/users/register`, {
    first_name: 'Test',
    last_name: 'Customer',
    address: '100 Main Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postcode: '10001',
    phone: '2125551234',
    dob: '1995-05-15',
    email: testEmail,
    password: password
  });

  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const page = await browser.newPage();

  // Login
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/auth/login');
  await page.waitForSelector('[data-test="email"]');
  await page.locator('[data-test="email"]').fill(testEmail);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-submit"]').click();
  await page.waitForTimeout(1500);

  // Add Product to Cart
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/product/1');
  await page.waitForSelector('[data-test="quantity"]');
  await page.locator('[data-test="quantity"]').fill('2');
  await page.locator('[data-test="add-to-cart"]').click();
  await page.waitForTimeout(1000);

  // Checkout Steps
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/checkout');
  await page.waitForTimeout(1000);

  await page.locator('[data-test="proceed-1"]').click();
  await page.waitForTimeout(1000);

  await page.locator('[data-test="proceed-2"]').click();
  await page.waitForTimeout(1000);

  await page.locator('[data-test="proceed-3"]').click();
  await page.waitForTimeout(1000);

  // Step 4: Payment - Select Bank Transfer
  await page.locator('select[data-test="payment-method"]').selectOption('bank-transfer');
  await page.waitForTimeout(500);

  // Fill payment fields if needed
  await page.locator('[data-test="bank-name"]').fill('National Bank').catch(() => null);
  await page.locator('[data-test="account-name"]').fill('John Doe').catch(() => null);
  await page.locator('[data-test="account-number"]').fill('123456789').catch(() => null);

  // Click Finish
  await page.locator('[data-test="finish"]').click();
  await page.waitForTimeout(3000);

  console.log('Final Page URL:', page.url());
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\n--- CONFIRMATION & INVOICE PAGE TEXT ---');
  console.log(bodyText.slice(0, 800));

  await browser.close();
}

completeOrderAudit();
