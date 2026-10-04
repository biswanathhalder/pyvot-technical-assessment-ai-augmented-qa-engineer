import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class CartPage extends BasePage {
  readonly linePrice: Locator;
  readonly cartSubtotal: Locator;

  constructor(page: any) {
    super(page);
    this.linePrice = page.locator('[data-test="line-price"]');
    this.cartSubtotal = page.locator('[data-test="cart-subtotal"]');
  }

  async openCartPage() {
    await this.page.goto('/#/checkout');
    await this.page.waitForTimeout(1000);
  }

  async getLinePrice(): Promise<number> {
    const text = await this.linePrice.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getCartSubtotal(): Promise<number> {
    const text = await this.cartSubtotal.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}
