import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class ProductPage extends BasePage {
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly unitPrice: Locator;

  constructor(page: any) {
    super(page);
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.unitPrice = page.locator('[data-test="unit-price"]');
  }

  async openProductPage(productId: number | string = 1) {
    await this.page.goto(`/#/product/${productId}`);
    await this.page.waitForSelector('[data-test="quantity"]');
  }

  async setQuantity(qty: number) {
    await this.quantityInput.fill(qty.toString());
  }

  async addToCart() {
    await this.addToCartBtn.click();
    await this.page.waitForTimeout(500);
  }

  async getUnitPrice(): Promise<number> {
    const text = await this.unitPrice.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}
