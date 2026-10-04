import { chromium } from '@playwright/test';

async function inspectDOM() {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const page = await browser.newPage();

  console.log('--- Inspecting Buggy UI Product Page ---');
  await page.goto('https://with-bugs.practicesoftwaretesting.com');
  await page.waitForSelector('.card');

  // Click first card
  await page.locator('.card').first().click();
  await page.waitForTimeout(2000);

  console.log('Current URL after click:', page.url());
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Body Text snippet:', bodyText.slice(0, 500));

  // Find all data-test attributes
  const dataTests = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-test]'));
    return els.map(e => `${e.tagName.toLowerCase()}[data-test="${e.getAttribute('data-test')}"]`);
  });

  console.log('All data-test elements found on product page:', dataTests);

  await browser.close();
}

inspectDOM();
