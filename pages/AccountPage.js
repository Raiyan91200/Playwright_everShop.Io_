const { BasePage } = require('./BasePage');

class AccountPage extends BasePage {
  async openRegister() {
    await this.goto('/account/register');
  }

  async openLogin() {
    await this.goto('/account/login');
  }

  async register(fullName, email, password) {
    await this.openRegister();
    await this.page.locator('input[name="full_name"]').fill(fullName);
    await this.page.locator('input[name="email"]').fill(email);
    await this.page.locator('input[name="password"]').fill(password);
    const signUpButton = this.page.getByRole('button', { name: /sign up/i });
    if (await signUpButton.isVisible()) {
      await signUpButton.click();
    } else {
      await this.page.locator('button.primary').click();
    }
  }

  async login(email, password) {
    await this.openLogin();
    await this.page.locator('input[name="email"]').fill(email);
    await this.page.locator('input[name="password"]').fill(password);
    const signInBtn = this.page.getByRole('button', { name: /sign in/i });
    if (await signInBtn.isVisible()) {
      await signInBtn.click();
    } else {
      await this.page.locator('button[type="submit"]').click();
    }
  }

  async openForgotPassword() {
    await this.openLogin();
    await this.page.getByRole('link', { name: 'Forgot your password?' }).click();
  }

  async requestPasswordReset(email) {
    await this.openForgotPassword();
    const emailInput = this.page.locator('input[name="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill(email);
      const resetBtn = this.page.getByRole('button', { name: 'RESET PASSWORD' });
      if (await resetBtn.isVisible()) {
        await resetBtn.click();
      } else {
        const submitBtn = this.page.locator('button[type="submit"]');
        if (await submitBtn.isVisible()) {
          await submitBtn.click();
        }
      }
    }
  }
}

module.exports = { AccountPage };
