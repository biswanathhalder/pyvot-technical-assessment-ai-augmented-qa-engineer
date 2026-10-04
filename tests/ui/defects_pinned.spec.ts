import { test, expect } from '@playwright/test';
import { ProductPage } from '../../src/pages/ProductPage.js';
import { CartPage } from '../../src/pages/CartPage.js';
import { BasePage } from '../../src/pages/BasePage.js';

test.describe('🔴 UI Defect Pinning Suite (Deliberately Failing Bug Assertions)', () => {

  test('TC-FIN-001 [PIN BUG-UI-002]: Cart line item price must equal Unit Price x Quantity ($42.45)', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.openProductPage(1);

    const unitPrice = await productPage.getUnitPrice(); // 14.15
    const qty = 3;
    const expectedLinePrice = Number((unitPrice * qty).toFixed(2)); // 42.45

    await productPage.setQuantity(qty);
    await productPage.addToCart();

    const cartPage = new CartPage(page);
    await cartPage.openCartPage();

    const actualLinePrice = await cartPage.getLinePrice();
    
    // Strict financial assertion: Expected $42.45, Actual on Buggy UI is $00.00
    expect(actualLinePrice).toBe(expectedLinePrice);
  });

  test('TC-BVA-001 [PIN BUG-UI-003]: Quantity 0 must not increment cart item count', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.openProductPage(1);

    await productPage.setQuantity(0);
    await productPage.addToCart();

    const badge = await productPage.getCartBadgeCount();
    
    // Strict assertion: Cart badge must stay "0" (or empty), Buggy UI sets badge to "1"
    expect(badge === '' || badge === '0').toBe(true);
  });

  test('TC-UI-001 [PIN BUG-UI-004]: Top navigation link label must be spelled "Contact"', async ({ page }) => {
    const basePage = new BasePage(page);
    await page.goto('/#/');
    await page.waitForSelector('.card');

    const contactText = await basePage.getNavContactText();
    
    // Strict assertion: Expected "Contact", Actual on Buggy UI is "Contakt"
    expect(contactText.trim()).toBe('Contact');
  });

});
