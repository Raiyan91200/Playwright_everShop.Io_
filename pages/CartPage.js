const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  async open() {
    await this.goto('/cart');
  }

  getRemoveButton() {
    return this.page.getByText('Remove').first();
  }

  getRemoveLink() {
    return this.page.locator('a[href*="remove"]').first();
  }

  getQuantityInput() {
    return this.page.locator('input[name="qty"]');
  }

  getCouponInput() {
    return this.page.locator('input[name="coupon"]');
  }

  getCheckoutLink() {
    return this.page.getByRole('link', { name: /checkout/i });
  }

  async removeFirstItemIfPresent() {
    const removeBtn = this.getRemoveButton();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      return;
    }
    const removeLink = this.getRemoveLink();
    if (await removeLink.isVisible()) {
      await removeLink.click();
    }
  }

  async updateQuantity(quantity) {
    const qtyInput = this.getQuantityInput();
    if (await qtyInput.isVisible()) {
      await qtyInput.fill(String(quantity));
      await qtyInput.press('Enter');
    }
  }

  async applyCoupon(code) {
    const couponInput = this.getCouponInput();
    if (await couponInput.isVisible()) {
      await couponInput.fill(code);
      const applyButton = this.page.getByRole('button', { name: 'Apply' });
      await applyButton.click();
    }
  }

  async proceedToCheckout() {
    const checkoutBtn = this.getCheckoutLink();
    if (await checkoutBtn.isVisible()) {
      await checkoutBtn.click();
      return;
    }
    const textBtn = this.page.getByText(/checkout/i).first();
    if (await textBtn.isVisible()) {
      await textBtn.click();
      return;
    }
    await this.page.locator('a[href*="checkout"]').first().click();
  }
}

module.exports = { CartPage };
