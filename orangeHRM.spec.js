const { test, expect } = require('@playwright/test');

//Test Login Credentials
const VALID_USERNAME = "Admin";
const VALID_PASSWORD = "admin123";
const INVALID_USERNAME = "admi";
const INVALID_PASSWORD = "abc123";

//Search User
const VALID_USER = "john.smith";
const INVALID_USER = "Siti";

//Fill User Fields
const USER_FIELDS = [];

test.describe('Login',()=>{ 

  test.beforeEach(async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
  });

  test('(+) Successfully Login with right credentials', async ({page})=> {
    await page.locator('input[name="txtUsername"]').fill(VALID_USERNAME);
    await page.locator('input[name="txtPassword"]').fill(VALID_PASSWORD);
    await page.locator('input[id=btnLogin]').click();
    await expect(page.locator('.head')).toHaveText('Dashboard');
  });

  test('(-) Login with invalid username', async ({page})=> {
    await page.locator('input[name="txtUsername"]').fill(INVALID_USERNAME);
    await page.locator('input[name="txtPassword"]').fill(VALID_PASSWORD);
    await page.locator('input[id=btnLogin]').click();
    await expect(page.locator('text=Invalid credentials')).toBeVisible;
  });

  test('(-) Login with invalid password', async ({page})=> {
    await page.locator('input[name="txtUsername"]').fill(VALID_USERNAME);
    await page.locator('input[name="txtPassword"]').fill(INVALID_PASSWORD);
    await page.locator('input[id=btnLogin]').click();
    await expect(page.locator('text=Invalid credentials')).toBeVisible;
  });

});

test.describe('Users',() => {
  test.use({ storageState: 'storageState.json'}); //for reuse sign in state (Take note group members)
  
    test.beforeEach(async ({page}) => {
      await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');  
    });

      test('(+) Users enter valid username', async ({page}) => {
        await page.locator('input[name="searchSystemUser\\[userName\\]"]').fill(VALID_USER);
        await page.locator('text=Search').click();
        await expect(page.locator('text=John.Smith')).toBeVisible;
      });

      test('(-) Users enter invalid username', async ({page}) => {
        await page.locator('input[name="searchSystemUser\\[userName\\]"]').fill(INVALID_USER);
        await page.locator('text=Search').click();
        await expect(page.locator('text=No Records Found')).toBeVisible;
      });

      test('(-) Add users', async ({page}) => {
      // fill code
      });

      test('(-) Delete users', async ({page}) => {
      // fill code
      });
});


