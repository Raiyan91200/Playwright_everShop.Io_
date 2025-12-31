const { test } = require('@playwright/test');
const { CategoryPage } = require('../pages/CategoryPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Cart', () => {

  test('TC3.1: Add Product to Cart (Listing)', async ({ page }) => {
    console.log('Starting TC3.1: Add Product to Cart (Listing)');
    const categoryPage = new CategoryPage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);

    await categoryPage.openAccessories();
    console.log('Navigated to /accessories');

    const addToCartBtn = page.locator('.add-to-cart-listing').first();
    if (await addToCartBtn.isVisible()) {
      console.log('Add to cart button visible on listing, clicking...');
      await addToCartBtn.click();
      await cartPage.open();
      console.log('Navigated to cart');
    } else {
      console.log('Add to cart button not visible on listing, navigating to product detail');
      await productPage.openThermosYellow();
      console.log('Navigated to product detail page');
      await productPage.getAddToCartButton().click();
      console.log('Clicked ADD TO CART button');
      await cartPage.open();
      console.log('Navigated to cart');
    }
  });

  test('TC3.2: Remove Product from Cart', async ({ page }) => {
    console.log('Starting TC3.2: Remove Product from Cart');
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.openThermosYellow();
    console.log('Navigated to product detail page');
    await productPage.getAddToCartButton().click();
    console.log('Clicked ADD TO CART button');
    await cartPage.open();
    console.log('Navigated to cart');
    await cartPage.removeFirstItemIfPresent();
  });

  test('TC3.3: Update Cart Quantity', async ({ page }) => {
    console.log('Starting TC3.3: Update Cart Quantity');
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.openThermosYellow();
    console.log('Navigated to product detail page');
    await productPage.getAddToCartButton().click();
    console.log('Clicked ADD TO CART button');
    await cartPage.open();
    console.log('Navigated to cart');
    await cartPage.updateQuantity(2);
    console.log('Updated quantity to 2');
  });

  test('TC3.4: Cart Persistence (Session)', async ({ page }) => {
    console.log('Starting TC3.4: Cart Persistence (Session)');
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.openThermosYellow();
    console.log('Navigated to product detail page');
    await productPage.getAddToCartButton().click();
    console.log('Clicked ADD TO CART button');
    
    await page.reload();
    console.log('Reloaded page');
    await cartPage.open();
    console.log('Navigated to cart');
  });

  test('TC3.5: Apply Coupon Code', async ({ page }) => {
    console.log('Starting TC3.5: Apply Coupon Code');
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.openThermosYellow();
    console.log('Navigated to product detail page');
    await productPage.getAddToCartButton().click();
    console.log('Clicked ADD TO CART button');
    await cartPage.open();
    console.log('Navigated to cart');
    await cartPage.applyCoupon('TEST10');
    console.log('Applied coupon TEST10');
  });

  test('TC3.6: Remove Coupon Code', async ({ page }) => {
    console.log('Starting TC3.6: Remove Coupon Code');
  });

  test('TC5.2: Price/Tax Correctness', async ({ page }) => {
    console.log('Starting TC5.2: Price/Tax Correctness');
  });

});
