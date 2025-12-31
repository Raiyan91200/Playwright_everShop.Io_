const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  async openThermosYellow() {
    await this.goto('/accessories/stainless-steel-thermos-yellow');
  }

  getMainImage() {
    return this.page.locator('.product-single-media img').first();
  }

  getAddToCartButton() {
    return this.page.getByRole('button', { name: 'ADD TO CART' });
  }

  getVariantOptionListFirst() {
    return this.page.locator('.variant-option-list a').first();
  }

  async clickMainImageIfVisible() {
    const mainImage = this.getMainImage();
    if (await mainImage.isVisible()) {
      await mainImage.click();
    }
  }

  async selectVariantByName(name) {
    const variantLink = this.page.getByRole('link', { name });
    if (await variantLink.isVisible()) {
      await variantLink.click();
      return true;
    }
    const textOption = this.page.getByText(name);
    if (await textOption.isVisible()) {
      await textOption.click();
      return true;
    }
    return false;
  }

  async selectFirstVariantIfAvailable() {
    const variantOption = this.getVariantOptionListFirst();
    if (await variantOption.count() > 0 && (await variantOption.isVisible())) {
      await variantOption.click({ force: true });
      await this.page.waitForTimeout(1000);
    }
  }

  async addToCartWithRetry(maxRetries = 2) {
    await this.page.waitForLoadState('networkidle');
    await this.selectFirstVariantIfAvailable();

    let added = false;
    for (let i = 0; i < maxRetries; i++) {
      const addResponsePromise = this.page
        .waitForResponse(
          (response) =>
            response.url().includes('/api/cart') &&
            response.request().method() === 'POST',
          { timeout: 5000 }
        )
        .catch(() => null);

      await this.getAddToCartButton().click();

      const response = await addResponsePromise;
      if (response && response.status() === 200) {
        added = true;
        break;
      }

      const errorMsg = await this.page
        .locator('.text-critical')
        .textContent()
        .catch(() => null);
      if (errorMsg && errorMsg.includes('variant')) {
        if ((await this.getVariantOptionListFirst().count()) > 0) {
          await this.getVariantOptionListFirst().click({ force: true });
          await this.page.waitForTimeout(1000);
        }
      } else {
        const successVisible = await this.page
          .getByText(/Just added to your cart|View Cart/i)
          .isVisible()
          .catch(() => false);
        if (successVisible) {
          added = true;
          break;
        }
      }
    }

    return added;
  }
}

module.exports = { ProductPage };
