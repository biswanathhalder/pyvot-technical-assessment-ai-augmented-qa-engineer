import { chromium } from '@playwright/test';

async function auditCartFinancials() {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });

  console.log('============== FINANCIAL MATH AUDIT ==============');

  // Audit Buggy Build
  const pageBuggy = await browser.newPage();
  await pageBuggy.goto('https://with-bugs.practicesoftwaretesting.com/#/product/1');
  await pageBuggy.waitForSelector('[data-test="quantity"]');

  const buggyUnitPriceText = await pageBuggy.locator('[data-test="unit-price"]').innerText();
  await pageBuggy.locator('[data-test="quantity"]').fill('3');
  await pageBuggy.locator('[data-test="add-to-cart"]').click();
  await pageBuggy.waitForTimeout(1000);

  await pageBuggy.goto('https://with-bugs.practicesoftwaretesting.com/#/checkout');
  await pageBuggy.waitForTimeout(2000);

  const buggyCartHTML = await pageBuggy.evaluate(() => {
    const table = document.querySelector('table');
    return table ? table.innerText : document.body.innerText;
  });

  console.log('\n--- BUGGY CART TABLE CONTENT ---');
  console.log(buggyCartHTML);

  // Audit Clean Oracle Build
  const pageClean = await browser.newPage();
  await pageClean.goto('https://practicesoftwaretesting.com/#/product/01M417XEGE9XSQDB52K5CFM51S'); // Combination Pliers
  await pageClean.waitForSelector('[data-test="quantity"]');

  const cleanUnitPriceText = await pageClean.locator('[data-test="unit-price"]').innerText();
  await pageClean.locator('[data-test="quantity"]').fill('3');
  await pageClean.locator('[data-test="add-to-cart"]').click();
  await pageClean.waitForTimeout(1000);

  await pageClean.goto('https://practicesoftwaretesting.com/#/checkout');
  await pageClean.waitForTimeout(2000);

  const cleanCartHTML = await pageClean.evaluate(() => {
    const table = document.querySelector('table');
    return table ? table.innerText : document.body.innerText;
  });

  console.log('\n--- CLEAN CART TABLE CONTENT ---');
  console.log(cleanCartHTML);

  await browser.close();
}

auditCartFinancials();
