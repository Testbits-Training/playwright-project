
const { Given, When, Then } = require("@cucumber/playwright");
const { test, expect } = require('@playwright/test');

Given('user navigate to Language page', async function ({page}) {
    test.use({ storageState: 'storageState.json'});
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/viewLanguages');
});