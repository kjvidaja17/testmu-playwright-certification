import { defineConfig } from '@playwright/test';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'node:path';

import type {
  TestMuOptions,
} from './src/fixtures/testmu.fixture';

loadEnv({
  path: resolve(process.cwd(), '.env'),
  quiet: true,
});

export default defineConfig<TestMuOptions>({
  testDir: './tests',

  timeout: 60_000,

  expect: {
    timeout: 10_000,
  },

  fullyParallel: true,
  workers: 2,
  retries: 0,

  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'playwright-report',
      },
    ],
  ],

  projects: [
    {
      name: 'macOS Monterey - Chromium',

      use: {
        testMuBrowserName: 'pw-chromium',
        testMuBrowserVersion: '133',
        testMuPlatform: 'macOS Monterey',
      },
    },

    {
      name: 'Windows 10 - Firefox',

      use: {
        testMuBrowserName: 'pw-firefox',
        testMuBrowserVersion: '134',
        testMuPlatform: 'Windows 10',
      },
    },
  ],
});