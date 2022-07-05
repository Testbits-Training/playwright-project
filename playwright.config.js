const { devices } = require('@playwright/test');


/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter:[ ['html', { outputFolder: 'my-report' }] ],
  use: {
    trace: 'on',
    launchOptions: {
      slowMo: 100,
      headless: false,
      }
  },
  globalSetup: require.resolve('./loginState'), //for save login
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};

module.exports = config;