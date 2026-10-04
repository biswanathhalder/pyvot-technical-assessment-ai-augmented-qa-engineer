import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://with-bugs.practicesoftwaretesting.com';
const API_URL = process.env.API_URL || 'https://api-with-bugs.practicesoftwaretesting.com';
const ORACLE_BASE_URL = process.env.ORACLE_BASE_URL || 'https://practicesoftwaretesting.com';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
    launchOptions: {
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    }
  },

  projects: [
    {
      name: 'ui-happy-path',
      testMatch: /.*happy_path\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL,
        launchOptions: {
          executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        }
      },
    },
    {
      name: 'ui-defects-pinned',
      testMatch: /.*defects_pinned\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL,
        launchOptions: {
          executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        }
      },
    },
    {
      name: 'api-suite',
      testMatch: /.*api_regression\.spec\.ts/,
      use: {
        baseURL: API_URL,
      }
    }
  ],
});
