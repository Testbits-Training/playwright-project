const { test, expect } = require('@playwright/test');

//Test Login Credentials
const VALID_USERNAME = "Admin";
const VALID_PASSWORD = "admin123";
const INVALID_USERNAME = "admi";
const INVALID_PASSWORD = "abc123";

//Search User
const VALID_USER = "John.Smith";
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
    await expect(page.locator('#spanMessage')).toHaveText('Invalid credentials');
  });

  test('(-) Login with invalid password', async ({page})=> {
    await page.locator('input[name="txtUsername"]').fill(VALID_USERNAME);
    await page.locator('input[name="txtPassword"]').fill(INVALID_PASSWORD);
    await page.locator('input[id=btnLogin]').click();
    await expect(page.locator('#spanMessage')).toHaveText('Invalid credentials');
  });

});

test.describe('Users',() => {
  test.use({ storageState: 'storageState.json'}); //for reuse sign in state (Take note group members)
  
    test.beforeEach(async ({page}) => {
      await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');  
    });

      test('(+) Users enter valid username', async ({page}) => {
        await page.locator('input[name="searchSystemUser\\[userName\\]"]').fill(VALID_USER);
        await page.locator('#searchBtn').click();
        const locator = page.locator('//a[text()=' + '"' + VALID_USER + '"]');
        await expect(locator).toHaveCount(1);
      });
 
      test('(-) Users enter invalid username', async ({page}) => {
        await page.locator('input[name="searchSystemUser\\[userName\\]"]').fill(INVALID_USER);
        await page.locator('text=Search').click();
        await expect(page.locator('//td[text()="No Records Found"]')).toHaveCount(1);

      });

      test('(-) Add users', async ({page}) => {
        await page.locator('input:has-text("Add")').click();
        await page.locator('select[name="systemUser\\[userType\\]"]').selectOption('1');
        await page.locator('input[name="systemUser\\[employeeName\\]\\[empName\\]"]').fill('Khaby Lame');
        
        if (await expect(page.locator('span[for="systemUser_employeeName_empName"]')).toHaveText('Employee does not exist') == true ){
          await page.goto('https://opensource-demo.orangehrmlive.com/index.php/pim/addEmployee');
          await page.locator('input[name="firstName"]').fill('Khaby');
          await page.locator('input[name="lastName"]').fill('Lame');
          await page.locator('input:has-text("Save")').click();
          await expect(page.locator('//h1[text()="Khaby Lame"]')).toHaveCount(1);
        };
        
        await page.locator('input[name="systemUser\\[userName\\]"]').fill('Khaby.Lame');
        await page.locator('input[name="systemUser\\[password\\]"]').fill('abcd1234');
        await page.locator('input[name="systemUser\\[confirmPassword\\]"]').fill('abcd1234');
        await page.locator('input:has-text("Save")').click();
        //await expect(page.locator('text=Successfully Saved')).toBeVisible;
      });

      test('(-) Delete users', async ({page}) => {
        await page.locator('input[name="searchSystemUser\\[userName\\]"]').fill('rebecca1');
        await page.locator('text=Search').click();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
        await page.locator('//a[text()="rebecca1"]//preceding::input[1]').check();
        await page.locator('input:has-text("Delete")').click();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
        //await expect(page.locator('text=Successfully Deleted Close')).toBeVisible;
      });
});


