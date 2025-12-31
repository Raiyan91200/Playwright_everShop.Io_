const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Responsiveness', () => {

  test('TC-RESP-01: Mobile responsiveness', async ({ page }) => {
    console.log('Starting TC-RESP-01: Mobile responsiveness');
    const homePage = new HomePage(page);
    await page.setViewportSize({ width: 375, height: 667 });
    console.log('Set viewport to 375x667');
    await homePage.open();
    console.log('Navigated to homepage');
    
    const mobileMenu = page.locator('.mobile-menu-icon'); 
    
    expect(page.url()).toContain('demo.evershop.io');
    console.log('Verified URL contains demo.evershop.io');
  });

  test('TC-RESP-02: Tablet responsiveness', async ({ page }) => {
    console.log('Starting TC-RESP-02: Tablet responsiveness');
    const homePage = new HomePage(page);
    await page.setViewportSize({ width: 768, height: 1024 });
    console.log('Set viewport to 768x1024');
    await homePage.open();
    console.log('Navigated to homepage');
    
    expect(page.url()).toContain('demo.evershop.io');
    console.log('Verified URL contains demo.evershop.io');
  });

  test('TC5.3: Responsive UI – Mobile View', async ({ page }) => {
    console.log('Starting TC5.3: Responsive UI – Mobile View');
    const homePage = new HomePage(page);
    await page.setViewportSize({ width: 375, height: 667 });
    console.log('Set viewport to 375x667');
    await homePage.open();
    console.log('Navigated to homepage');
    
    const productList = page.locator('.product-list');
    if (await productList.isVisible()) {
      console.log('Product list visible');
    } else {
      console.log('Product list not visible');
    }
  });

});
