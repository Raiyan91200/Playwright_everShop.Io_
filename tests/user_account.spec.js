const { test } = require('@playwright/test');
const { AccountPage } = require('../pages/AccountPage');

test.describe('User Account', () => {

  test('TC4.1: User Registration', async ({ page }) => {
    console.log('Starting TC4.1: User Registration');
    const accountPage = new AccountPage(page);
    const email = `test${Date.now()}@example.com`;

    await accountPage.openRegister();
    console.log('Navigated to registration page');

    await accountPage.register('Test User', email, 'Password123');
    console.log(`Filled registration form with email: ${email}`);
  });

  test('TC4.2: Login (Valid)', async ({ page }) => {
    console.log('Starting TC4.2: Login (Valid)');
    const accountPage = new AccountPage(page);

    await accountPage.login('demo@evershop.io', '123456');
    console.log('Filled login form with valid credentials and submitted');
  });

  test('TC4.3: Login (Invalid)', async ({ page }) => {
    console.log('Starting TC4.3: Login (Invalid)');
    const accountPage = new AccountPage(page);

    await accountPage.login('fake@example.com', 'wrong');
    console.log('Filled login form with invalid credentials and submitted');
  });

  test('TC4.4: Logout', async ({ page }) => {
    console.log('Starting TC4.4: Logout');
    const accountPage = new AccountPage(page);

    await accountPage.login('demo@evershop.io', '123456');
    console.log('Logged in user to later perform logout (not yet implemented)');
  });

  test('TC4.5: Forgot Password', async ({ page }) => {
    console.log('Starting TC4.5: Forgot Password');
    const accountPage = new AccountPage(page);

    await accountPage.requestPasswordReset('demo@evershop.io');
    console.log('Requested password reset for demo@evershop.io');
  });

  test('TC4.6: Account Dashboard – Profile Update', async ({ page }) => {
    console.log('Starting TC4.6: Account Dashboard – Profile Update');
  });

  test('TC4.7: Account Dashboard – Order History', async ({ page }) => {
    console.log('Starting TC4.7: Account Dashboard – Order History');
  });

});
