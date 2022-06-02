const { test, expect, chromium } = require('@playwright/test');

//Test Login Credentials
const VALID_USERNAME = "Admin";
const VALID_PASSWORD = "admin123";
const INVALID_USERNAME = "admi";
const INVALID_PASSWORD = "abc123";

//Search User
const VALID_USER = "John.Smith";
const INVALID_USER = "Siti";

//Fill User Fields
const USER_FIELDS = [     
  '1',                      // Select Option Value = Admin
  'John',                   //First Name
  'Smith',                  //Second Name
  'Johasdwesssd1',          //Username
  'abcd1234'                //Password
];

test.describe('Login',()=>{ 

  test.beforeEach(async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
  });

  test('(+) Successfully Login with right credentials', async ({page})=> {
    await createLogin({page},VALID_USERNAME,VALID_PASSWORD);
    await expect(page.locator('.head')).toHaveText('Dashboard');
  });

  test('(-) Login with invalid username', async ({page})=> {
    await createLogin({page},INVALID_USERNAME,VALID_PASSWORD);
    await expect(page.locator('#spanMessage')).toHaveText('Invalid credentials');
  });

  test('(-) Login with invalid password', async ({page})=> {
    await createLogin({page},VALID_USERNAME,INVALID_PASSWORD);
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
        await expect(page.locator('//td[@class="left"]//a')).toHaveText(VALID_USER);
      });
 
      test('(-) Users enter invalid username', async ({page}) => {
        await page.locator('input[name="searchSystemUser\\[userName\\]"]').fill(INVALID_USER);
        await page.locator('text=Search').click();
        await expect(page.locator('td[colspan="5"]')).toHaveText('No Records Found');

      });

      test('(-) Add users', async ({page}) => {
        await page.locator('input:has-text("Add")').click();
        await page.locator('select[name="systemUser\\[userType\\]"]').selectOption(USER_FIELDS[0]);
        await page.locator('input[name="systemUser\\[employeeName\\]\\[empName\\]"]').fill(USER_FIELDS[1] + ' ' + USER_FIELDS[2]);
        await page.locator('input[name="systemUser\\[userName\\]"]').fill(USER_FIELDS[3]);
        await page.locator('input[name="systemUser\\[password\\]"]').fill(USER_FIELDS[4]);
        await page.locator('input[name="systemUser\\[confirmPassword\\]"]').fill(USER_FIELDS[4]);
        await page.locator('#btnSave').click();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
        await expect(page.locator('text=Successfully Saved Close')).toBeVisible();
    

      });

      test('(-) Delete users', async ({page}) => {
        await page.locator('input[name="searchSystemUser\\[employeeName\\]\\[empName\\]"]').fill(USER_FIELDS[3]);
        await page.locator('text=Search').click();
        await page.locator('//a[text()='+ '"' + USER_FIELDS[3] + '"]//preceding::input[1]').check();
        await page.locator('#btnDelete').click();
        await page.locator('#dialogDeleteBtn').click();
        await expect(page.locator('text=Successfully Deleted Close')).toBeVisible();
      });
});

//sambung sini Arif
test.describe('Employment status',() => {
  test.use({ storageState: 'storageState.json'});

  test('(-) Add employment status', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await page.locator('input:has-text("Add")').click();
    await page.locator('input[name="empStatus\\[name\\]"]').fill('ana');
    await page.locator('input:has-text("Save")').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await expect(page.locator('text=Successfully Saved Close')).toBeVisible();
  });

  test('(-) Delete employment status', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await page.locator('//a[text()="ana"]//preceding::input[1]').check();
    await page.locator('input:has-text("Delete")').click();
     await page.locator('#dialogDeleteBtn').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await expect(page.locator('text=Successfully Deleted Close')).toBeVisible();
  });

});

  test('(-) Delete multiple employment status', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await page.locator('//a[text()="ana"]//preceding::input[1]').check();
    await page.locator('//a[text()="ana2"]//preceding::input[1]').check();
    await page.locator('input:has-text("Delete")').click();
     await page.locator('#dialogDeleteBtn').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await expect(page.locator('text=Successfully Deleted Close')).toBeVisible();
  });

  test('(-) Add existing employment status', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await page.locator('input:has-text("Add")').click();
    await page.locator('input[name="empStatus\\[name\\]"]').fill('ana');
    await page.locator('input:has-text("Save")').click();
    await expect(page.locator('text=Already exists')).toBeVisible();
    
  });

  test.describe('Add Employee',() => {
    test.use({ storageState: 'storageState.json'});
  
    test('(-) Add employee', async ({page}) => {
      await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
      await page.locator('input:has-text("Add")').click();
      await page.locator('input[name="empStatus\\[name\\]"]').fill('ana');
      await page.locator('input:has-text("Save")').click();
      await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
      await expect(page.locator('text=Successfully Saved Close')).toBeVisible();
    });
});


async function createLogin({page}, username, password) {
  await page.locator('input[name="txtUsername"]').fill(username);
  await page.locator('input[name="txtPassword"]').fill(password);
  await page.locator('input[id=btnLogin]').click();
}



