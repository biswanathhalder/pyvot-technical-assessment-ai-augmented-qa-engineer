import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: any) {
    super(page);
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitBtn = page.locator('[data-test="register-submit"]');
  }

  async openRegisterPage() {
    await this.page.goto('/#/auth/register');
    await this.page.waitForSelector('[data-test="register-submit"]');
  }

  async submitRegistration(data: { firstName?: string; lastName?: string; email?: string; password?: string }) {
    if (data.firstName) await this.firstNameInput.fill(data.firstName);
    if (data.lastName) await this.lastNameInput.fill(data.lastName);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.password) await this.passwordInput.fill(data.password);
    await this.submitBtn.click();
    await this.page.waitForTimeout(500);
  }

  async getValidationErrors(): Promise<string[]> {
    return await this.page.locator('.alert-danger, .invalid-feedback').allInnerTexts();
  }
}
