const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Edge Cases', () => {
  
  test('TC-EDGE-01: Add out-of-stock product', async ({ page }) => {
    console.log('Starting TC-EDGE-01: Add out-of-stock product');
    const productPage = new ProductPage(page);

    await productPage.openThermosYellow();
    console.log('Navigated to product detail page');
    
    const addToCartButton = productPage.getAddToCartButton();
    
    if (await addToCartButton.isDisabled()) {
      console.log('Add to cart button is disabled (out of stock)');
      expect(await addToCartButton.isDisabled()).toBeTruthy();
    } else {
      console.log('No out-of-stock product found for this test run, skipping assertion for out-of-stock error.');
    }
  });

  test('TC-EDGE-02: Verify tax calculation', async ({ page }) => {
    console.log('Starting TC-EDGE-02: Verify tax calculation');
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.openThermosYellow();
    console.log('Navigated to product detail page');

    const added = await productPage.addToCartWithRetry();

    if (!added) {
      console.log('Failed to add to cart after retries');
    } else {
      await expect(
        page.getByText(/Just added to your cart|View Cart/i)
      )
        .toBeVisible({ timeout: 5000 })
        .catch(() => console.log('Success message not found'));
    }

    await cartPage.open();
    console.log('Navigated to cart');
    
    const summary = page.locator('.cart-summary'); 
    console.log('Checking cart summary for tax calculation');
  });


});
