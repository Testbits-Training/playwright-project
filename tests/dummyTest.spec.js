const {expect} = require('@playwright/test');


test.describe('Multilingual', () => {
    test('test', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/');
        await page.locator('strong:has-text("English")').click();
        await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Main_Page');
        await page.locator('text=Main Page From Wikipedia, the free encyclopedia Jump to navigation Jump to searc').click();
        await page.locator('div[role="main"] >> text=MediaWiki').click();
        await expect(page).toHaveURL('https://www.mediawiki.org/wiki/MediaWiki');
        await page.locator('main[role="main"] >> text=multilingual').click();
        await expect(page).toHaveURL('https://www.mediawiki.org/wiki/Localisation');
        await page.locator('text=Language names reference').click();
        await expect(page).toHaveURL('https://www.mediawiki.org/wiki/Manual:Language#lang-code');
      });
});

test.describe('Special Log', () =>{
    test('test', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/');
        await page.locator('strong:has-text("English")').click();
        await expect(page).toHaveURL('https://en.wikipedia.org/wiki/Main_Page');
        await page.locator('text=Main Page From Wikipedia, the free encyclopedia Jump to navigation Jump to searc').click();
        await page.locator('div[role="main"] >> text=MediaWiki').click();
        await expect(page).toHaveURL('https://www.mediawiki.org/wiki/MediaWiki');
        await page.locator('main[role="main"] >> text=multilingual').click();
        await expect(page).toHaveURL('https://www.mediawiki.org/wiki/Localisation');
        await page.locator('text=Language names reference').click();
        await expect(page).toHaveURL('https://www.mediawiki.org/wiki/Manual:Language#lang-code');
      });
})


