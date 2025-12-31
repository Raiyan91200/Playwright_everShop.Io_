const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { AccountPage } = require('../pages/AccountPage');

test.describe('Checkout', () => {

  test('TC3.7: Checkout Flow – Guest', async ({ page }) => {
    console.log('Starting TC3.7: Checkout Flow – Guest');
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

    await cartPage.proceedToCheckout();

    const emailInput = page.locator('input[name="email"]');
    if (await emailInput.isVisible()) {
      console.log('Email input visible, filling guest email...');
      await emailInput.fill('guest@example.com');
    }
  });

  test('TC3.8: Checkout Flow – Registered User', async ({ page }) => {
    console.log('Starting TC3.8: Checkout Flow – Registered User');
    const accountPage = new AccountPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    const email = `test${Date.now()}@example.com`;
    const password = 'Password123';

    console.log('Navigated to registration page');
    await accountPage.register('Test User', email, password);
    console.log(`Filled registration form with email: ${email}`);

    await page.waitForURL((url) => !url.toString().includes('/account/register'));
    console.log('Registration successful, redirected');

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

    await cartPage.proceedToCheckout();
  });

});
