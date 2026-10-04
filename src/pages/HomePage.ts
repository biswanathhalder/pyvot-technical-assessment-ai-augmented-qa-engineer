import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchSubmitBtn: Locator;
  readonly productCards: Locator;

  constructor(page: any) {
    super(page);
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmitBtn = page.locator('[data-test="search-submit"]');
    this.productCards = page.locator('.card');
  }

  async openHomePage() {
    await this.page.goto('/#/');
    await this.page.waitForSelector('.card');
  }

  async searchProduct(query: string) {
    await this.searchInput.fill(query);
    await this.searchSubmitBtn.click();
    await this.page.waitForTimeout(500);
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }
}
