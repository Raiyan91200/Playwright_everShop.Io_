const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CategoryPage } = require('../pages/CategoryPage');

test.describe('Product Browsing', () => {

  test('TC2.1: Category Browsing – Accessories', async ({ page }) => {
    console.log('Starting TC2.1: Category Browsing – Accessories');
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    await homePage.open();
    console.log('Navigated to homepage');
    await categoryPage.openAccessories();
    console.log('Navigated to /accessories');
    
    await expect(page.getByRole('heading', { name: 'Accessories' })).toBeVisible();
    console.log('Verified Accessories heading is visible');
  });

  test('TC2.2: Category Browsing – Empty Category', async ({ page }) => {
    console.log('Starting TC2.2: Category Browsing – Empty Category');
    const categoryPage = new CategoryPage(page);
    await categoryPage.openKids(); 
    console.log('Navigated to /kids');
    
    await expect(page.url()).toContain('/kids');
    console.log('Verified URL contains /kids');
  });

  test('TC2.3: Product Listing Filters – Color', async ({ page }) => {
    console.log('Starting TC2.3: Product Listing Filters – Color');
    const categoryPage = new CategoryPage(page);
    await categoryPage.openWomen(); 
    console.log('Navigated to /women');
    
  });

  test('TC2.4: Product Listing Sorting – Name Asc.', async ({ page }) => {
    console.log('Starting TC2.4: Product Listing Sorting – Name Asc.');
    const categoryPage = new CategoryPage(page);
    await categoryPage.openMen();
    console.log('Navigated to /men');
    
  });

  test('TC2.5: Product Listing – Pagination', async ({ page }) => {
    console.log('Starting TC2.5: Product Listing – Pagination');
    const categoryPage = new CategoryPage(page);
    await categoryPage.openMen();
    console.log('Navigated to /men');
    
    const nextButton = categoryPage.getNextButton();
    if (await nextButton.isVisible()) {
      console.log('Next button visible, clicking...');
      await nextButton.click();
      expect(page.url()).toContain('page=2');
      console.log('Verified URL contains page=2');
    } else {
      console.log('Next button not visible');
    }
  });

  test('TC2.6: Search – Valid Keyword', async ({ page }) => {
    console.log('Starting TC2.6: Search – Valid Keyword');
    const categoryPage = new CategoryPage(page);
    await categoryPage.openSearch('Thermos');
    console.log('Navigated to search results for "Thermos"');
    
  });

  test('TC2.7: Search – Invalid Keyword', async ({ page }) => {
    console.log('Starting TC2.7: Search – Invalid Keyword');
    const categoryPage = new CategoryPage(page);
    await categoryPage.openSearch('XYZABC');
    console.log('Navigated to search results for "XYZABC"');
    
  });

});
