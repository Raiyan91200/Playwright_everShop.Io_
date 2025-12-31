const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CategoryPage } = require('../pages/CategoryPage');
const { BasePage } = require('../pages/BasePage');

test.describe('Accessibility', () => {

  test('TC-A11Y-01: Keyboard navigation', async ({ page }) => {
    console.log('Starting TC-A11Y-01: Keyboard navigation');
    const homePage = new HomePage(page);
    await homePage.open();
    console.log('Navigated to homepage');
    
    await page.keyboard.press('Tab');
    console.log('Pressed Tab key');
    
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    console.log(`Focused element tag: ${focused}`);
    expect(focused).not.toBeNull();
  });

  test('TC-A11Y-02: Image alt text validation', async ({ page }) => {
    console.log('Starting TC-A11Y-02: Image alt text validation');
    const categoryPage = new CategoryPage(page);
    await categoryPage.openAccessories();
    console.log('Navigated to /accessories');
    await categoryPage.openFirstProduct();
    console.log('Clicked on first accessory product');
    
    const basePage = new BasePage(page);
    const images = basePage.getImages();
    const count = await images.count();
    console.log(`Found ${count} images on the page`);
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      console.log(`Image ${i + 1} alt text: ${alt}`);
      expect(alt).not.toBeNull(); 
    }
  });

  test('TC5.4: Accessibility – Keyboard Nav', async ({ page }) => {
    console.log('Starting TC5.4: Accessibility – Keyboard Nav');
    const homePage = new HomePage(page);
    await homePage.open();
    console.log('Navigated to homepage');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    console.log('Pressed Tab key twice');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    console.log(`Focused element tag: ${focused}`);
    expect(focused).toBeTruthy();
  });

  test('TC5.5: Accessibility – Image Alt', async ({ page }) => {
    console.log('Starting TC5.5: Accessibility – Image Alt');
    const homePage = new HomePage(page);
    await homePage.open();
    console.log('Navigated to homepage');
    const basePage = new BasePage(page);
    const images = basePage.getImages();
    const count = await images.count();
    console.log(`Found ${count} images on the page`);
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      console.log(`Image ${i + 1} alt text: ${alt}`);
      expect(alt).not.toBeNull();
    }
  });

});
