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
const USER = [     
  '1',                      // Select Option Value = Admin
  'John',                   // First Name
  'Smith',                  // Second Name
  'Johasdwesssd1',          // Username
  'abcd1234'                // Password
];

//KPI
const JOB_TITLE = '23'; //HR Manager
const VALID_KPI = "Automation testing";
const VALID_MIN_RATING = "0";
const VALID_MAX_RATING = "100";
const INVALID_MIN_RATING = "150";



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
        await page.locator('select[name="systemUser\\[userType\\]"]').selectOption(USER[0]);
        await page.locator('input[name="systemUser\\[employeeName\\]\\[empName\\]"]').fill(USER[1] + ' ' + USER[2]);
        await page.locator('input[name="systemUser\\[userName\\]"]').fill(USER[3]);
        await page.locator('input[name="systemUser\\[password\\]"]').fill(USER[4]);
        await page.locator('input[name="systemUser\\[confirmPassword\\]"]').fill(USER[4]);
        await page.locator('#btnSave').click();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/viewSystemUsers');
        await expect(page.locator('text=Successfully Saved Close')).toBeVisible();
      });

      test('(-) Delete users', async ({page}) => {
        await page.locator('input[name="searchSystemUser\\[employeeName\\]\\[empName\\]"]').fill(USER[3]);
        await page.locator('text=Search').click();
        await page.locator('//a[text()='+ '"' + USER[3] + '"]//preceding::input[1]').check();
        await page.locator('#btnDelete').click();
        await page.locator('#dialogDeleteBtn').click();
        await expect(page.locator('text=Successfully Deleted Close')).toBeVisible();
      });
});

//Eql

test.describe(' Search Key Performance Indicators',() =>{
  test.use({ storageState: 'storageState.json'});

  test.beforeEach(async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/performance/searchKpi');  
  });

  test('(+) Sort the list base on job title', async({page}) =>{
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/performance/searchKpi');
    await page.locator('select[name="kpi360SearchForm\\[jobTitleCode\\]"]').selectOption(JOB_TITLE);
    await page.locator('input:has-text("Search")').click();
    await expect(page.locator('(//td[@class="left"])[2]')).toHaveText('HR Manager');
  });

});


test.describe(' Add New Key Performance Indicator',() => {
  test.use({ storageState: 'storageState.json'}); //for reuse sign in state (Take note group members)
  
  test.beforeEach(async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/performance/saveKpi');
  });

  test('(+) Insert New KPI',async ({page}) => {
    await addKPI({page}, JOB_TITLE , VALID_KPI , VALID_MIN_RATING , VALID_MAX_RATING);
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/performance/searchKpi');
    await expect(page.locator('text=Successfully Saved Close')).toBeVisible();
  });

  test('(-) Entered Invalid Min/Max ratings',async ({page}) => {
    await addKPI({page}, JOB_TITLE , VALID_KPI , INVALID_MIN_RATING , VALID_MAX_RATING);
    await expect(page.locator("xpath=(//span[@for='defineKpi360_minRating'])[1]")).toHaveText("Should be less than 100");
    await expect(page.locator("xpath=(//span[@for='defineKpi360_maxRating'])[1]")).toHaveText("Max rating should be greater than Min rating");
  });

  test('(-) User Enter Non Numeric Character',async ({page}) => {
    await addKPI({page}, JOB_TITLE , VALID_KPI , 'test' , 'test');
    await expect(page.locator("xpath=(//span[@for='defineKpi360_minRating'])[1]")).toHaveText("Should be greater than 0");
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

  test('(-) Add existing employment status', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await page.locator('input:has-text("Add")').click();
    await page.locator('input[name="empStatus\\[name\\]"]').fill('Freelance');
    await page.locator('input:has-text("Save")').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await expect(page.locator('text=Already exists')).toBeVisible();
  });

  test('(-) Delete employment status', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await page.locator('//a[text()="ana"]//preceding::input[1]').check();
    await page.locator('input:has-text("Delete")').click();
     await page.locator('#dialogDeleteBtn').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/admin/employmentStatus');
    await expect(page.locator('text=Successfully Deleted Close')).toBeVisible();
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

});

//Lailatul paste here
//lailatul 

test.describe('Search My Records',() => {
  test.use({ storageState: 'storageState.json'}); //for reuse sign in state (Take note group members)

  test('(+) Successfully shows the record', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/attendance/viewMyAttendanceRecord');
    await page.locator('input[name="attendance\\[date\\]"]').fill('2021-05-09');
    await page.locator('input[name="attendance\\[date\\]"]').press('Enter');
    await expect(page.locator('#noRecordsColumn')).toHaveText('No attendance records to display');
  });

});

test.describe('Punch In and Punch Out',() => {
  test.use({ storageState: 'storageState.json'}); //for reuse sign in state (Take note group members)

  test('(+) Punch in successfully recorded', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/attendance/punchIn');
    await page.locator('input[name="attendance\\[date\\]"]').fill('2022-07-14');
    await page.locator('input[name="attendance\\[date\\]"]').press('Enter');
    await page.locator('input[name="attendance\\[time\\]"]').fill('10:00');
    await page.locator('textarea[name="attendance\\[note\\]"]').click();
    await page.locator('textarea[name="attendance\\[note\\]"]').fill('Shift A');
    await page.locator('input:has-text("In")').click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/index.php/attendance/punchOut');
  });

  test('(+) Punch out successfully recorded', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/index.php/attendance/punchOut');
    await page.locator('input[name="attendance\\[date\\]"]').fill('2022-07-14');
    await page.locator('input[name="attendance\\[date\\]"]').press('Enter');
    await page.locator('input[name="attendance\\[time\\]"]').fill('15:00');
    await page.locator('textarea[name="attendance\\[note\\]"]').click();
    await page.locator('textarea[name="attendance\\[note\\]"]').fill('Shift A');
    await page.locator('input:has-text("Out")').click();
    await expect(page.locator('text=Successfully Saved Close')).toBeVisible();
  });

});

async function createLogin({page}, username, password) {
  await page.locator('input[name="txtUsername"]').fill(username);
  await page.locator('input[name="txtPassword"]').fill(password);
  await page.locator('input[id=btnLogin]').click();
}

async function addKPI({page}, jobtitle, kpi, minRating, maxRating ) {
  await page.locator('select[name="defineKpi360\\[jobTitleCode\\]"]').selectOption(jobtitle);
  await page.locator('input[name="defineKpi360\\[keyPerformanceIndicators\\]"]').fill(kpi);
  await page.locator('input[name="defineKpi360\\[minRating\\]"]').fill(minRating);
  await page.locator('input[name="defineKpi360\\[maxRating\\]"]').fill(maxRating);
  await page.locator('input:has-text("Save")').click();
}
 

