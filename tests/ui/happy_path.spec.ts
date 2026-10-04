import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage.js';
import { ProductPage } from '../../src/pages/ProductPage.js';
import { RegisterPage } from '../../src/pages/RegisterPage.js';

test.describe('🟢 UI Happy Path & Feature Integrity Suite (Passing Specs)', () => {

  test('TC-CAT-001: Search product catalog returns filtered list', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();

    await homePage.searchProduct('Pliers');
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-BVA-002: Add item to cart with valid quantity (1)', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.openProductPage(1);

    await productPage.setQuantity(1);
    await productPage.addToCart();

    const badge = await productPage.getCartBadgeCount();
    expect(badge).toBe('1');
  });

  test('TC-REG-001: Form validation triggers on invalid email & short password', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.openRegisterPage();

    await registerPage.submitRegistration({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'invalid-email',
      password: '123'
    });

    const errors = await registerPage.getValidationErrors();
    expect(errors.some(err => err.includes('invalid') || err.includes('minimal'))).toBe(true);
  });

});
