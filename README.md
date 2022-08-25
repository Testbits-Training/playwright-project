# playwright-project

This project is about to show some samples of web automation test project using Playwright. For those who are new to automation testing, this sample project also will help you ease while learning Playwright online at your own pace.

The tested web application is called Orange HRM, which can be visited at https://opensource-demo.orangehrmlive.com/. This app is a mock website that was created for automation testers to practice the automation testing. The website is meant to mimic a Human Resources Management (HRM) application. Inside this repository, you can choose the one with or without LamdaTest configuration.

## Getting started

**Prerequisites**

 - Node.Js v16 or later
 - VS Code
 - Playwright Test extension (VS Code)

**Installation**

    
   ```
    npm install
   ```
   
   It is recommended to relaunch the VS code after the installation.
    
**Running Test**
-   Running all tests
    
    ```
    npx playwright test
    ```
    
-   Running a single test file
    
    ```
    npx playwright test landing-page.spec.ts
    ```
    
-   Run a set of test files
    
    ```
    npx playwright test tests/todo-page/ tests/landing-page/
    ```
    
-   Run files that have  `landing`  or  `login`  in the file name
    
    ```
    npx playwright test landing login
    ```
    
-   Run the test with the title
    
    ```
    npx playwright test -g "add a todo item"
    ```
    
-   Running tests in headed mode
    
    ```
    npx playwright test landing-page.spec.ts --headed
    ```
    
-   Running Tests on specific browsers
    
    ```
    npx playwright test landing-page.ts --project=chromium
    ```

Reference: https://playwright.dev/docs/running-tests

## HTML Reporter

The HTML Reporter shows you a full report of your tests allowing you to filter the report by browsers, passed tests, failed tests, skipped tests and flaky tests. By default, the HTML report is opened automatically if some of the tests failed.

```
npx playwright show-report
```




## Playwright key features in this project

- Group of test case using test.describe
- Reuse authenticated state using .json file
- Assertion to verify web object elements to approve test cases
- get external data sources from .xlsx file by using .xlsx npm modules
- designing test cases using BDD Test Framework (Cucumber intergration)

## List of test cases in this project

There are 10 test cases provided for this Playwright project:

1. Login
2. Users
3. Employee List
4. Search Key Performance Indicator
5. Add New Key Performance Indicator
6. Delete Key Performance Indicator
7. Employment Status
8. Search My Record
9. Punch In and Punch Out
10. Employee Records

