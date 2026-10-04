import { chromium } from '@playwright/test';

async function auditCheckoutInvoice() {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const page = await browser.newPage();

  console.log('--- AUDITING CHECKOUT STEPS & PAYMENT MATH ---');

  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/product/1');
  await page.waitForSelector('[data-test="quantity"]');
  await page.locator('[data-test="quantity"]').fill('2');
  await page.locator('[data-test="add-to-cart"]').click();
  await page.waitForTimeout(1000);

  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/checkout');
  await page.waitForTimeout(1500);

  // Step 1: Cart Summary
  await page.locator('[data-test="proceed-1"]').click();
  await page.waitForTimeout(1000);

  // Step 2: Sign in / Guest check
  console.log('Step 2 URL:', page.url());
  const step2Text = await page.evaluate(() => document.body.innerText);
  console.log('Step 2 Snippet:', step2Text.slice(0, 300));

  await browser.close();
}

auditCheckoutInvoice();
