# playwright-project

This project is about to show some samples of web automation test project using Playwright. For those who are new to automation testing, this sample project also will help you ease while learning Playwright online at your own pace.

The tested web application is called Orange HRM, which can be visited at https://opensource-demo.orangehrmlive.com/. This app is a mock website that was created for automation testers to practice their skills on. The website is meant to mimic a Human Resources Management (HRM) application. Inside this repository, you can choose the one with or without LamdaTest configuration.

## Getting started

**Prerequisites**

 - Node.Js v16 or later
 - VS Code
 - Playwright Test extension (VS Code)

**Installation**
-npm install


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

