import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 10000, // Timeout for each test
  use: {
    baseURL: 'http://localhost:5173',
  },
};

export default config;