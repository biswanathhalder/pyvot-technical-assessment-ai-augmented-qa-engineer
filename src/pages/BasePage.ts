import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getNavContactText(): Promise<string> {
    return await this.page.locator('[data-test="nav-contact"]').innerText();
  }

  async getCartBadgeCount(): Promise<string> {
    return await this.page.locator('[data-test="cart-quantity"]').innerText();
  }
}
