# playwright-project

This project is about to show some samples of web automation test project using Playwright. For those who are new to automation testing, this sample project also will help you ease while learning Playwright online at your own pace.

The tested web application is called Orange HRM, which can be visited at https://opensource-demo.orangehrmlive.com/. This app is a mock website that was created for automation testers to practice their skills on. The website is meant to mimic a Human Resources Management (HRM) application.

# Getting started

## Prerequisites

>* Visual Studio Code
>* Node.js 16.15
>* playwright
>* playwright/Test
>* xlsx module

* Playwright has its own test runner for end-to-end tests, we call it Playwright Test.
  <br /> 
  <br /> 
* Install the VS Code extension from the marketplace.
<br /> 
  <br /> 
If you don't have the Playwright Test npm package installed in your project, or if you are starting with a new testing project, "Install Playwright" action will help you get started.
   <br /> 
  <br />  
* Install Playwright (Alternative)

Run from your project's root directory in Visual Studio Code
   
> `npm i -D @playwright/test`
> `npm i -D playwright      `
> `npx playwright install   `

* There are some test cases which using test data from .xlsx files. So we need to install xlsx modules.

> `npm install xlsx`







Playwright doesn't come with the built-in support for BDD so we are going to use the help of another tool Cucumber
   
`npm i -D @cucumber/cucumber@7.3.1 @cucumber/pretty-formatter`


 End Introduction & Installation

## Playwright key features in this project

- Group of test case using test.describe
- Reuse authenticated state using .json file
- Assertion to verify web object elements to approve test cases
- get external data sources from .xlsx file by using .xlsx npm modules
- designing test cases using BDD Test Framework (Cucumber intergration)

// List of test cases

// Test execution / test run