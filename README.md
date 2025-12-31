# Automation New – Playwright + Allure Test Suite

Automation New is an end-to-end UI testing project for `https://demo.evershop.io`, powered by [Playwright Test](https://playwright.dev/) and the Page Object Model (POM). 

It is designed to be:

- Fast to run locally or on CI
- Easy to understand for new contributors
- Simple to extend as the shop grows

---

## 1. Quick Start

From a fresh clone:

```bash
npm install         # install dependencies
npx playwright install   # install Playwright browsers (first time only)
npm test           # run the full suite headless
```

Want to see the browser? Use:

```bash
npm run test_headed
```

When the run finishes, open the HTML report:

```bash
npx playwright show-report
```

---

## 2. What This Project Tests

The suite covers the main user journeys of a typical e‑commerce store:

- Browsing categories and search
- Viewing product details and variants
- Managing the cart (add, remove, update quantity, coupons)
- Checkout as guest and registered user
- Account flows (register, login, forgot password)
- Accessibility and responsive layouts (mobile / tablet / desktop)
- Edge cases like tax calculation and out‑of‑stock scenarios

Each journey lives in its own spec file under `tests/` for clarity.

---

## 3. Project Structure

**Config & tooling**

- `playwright.config.js` – Global Playwright configuration (base URL, reporters, devices, retries, etc.).
- `package.json` – npm scripts for running tests and generating reports.

**Specs (feature-focused tests)** – `tests/`

- `accessibility.spec.js` – Keyboard navigation and image `alt` checks.
- `cart.spec.js` – Add/remove items, quantity updates, coupons.
- `checkout.spec.js` – Guest and registered checkout flows.
- `edge.spec.js` – Edge conditions (out-of-stock, tax calculation hook).
- `product_browsing.spec.js` – Categories, pagination, search.
- `product_detail.spec.js` – Product zoom, variant selection, add to cart.
- `responsive.spec.js` – Mobile and tablet layout checks.
- `user_account.spec.js` – Registration, login, forgot password, dashboard placeholders.

**Page Objects (POM)** – `pages/`

- `BasePage.js` – Small shared helpers (`goto`, `getImages`, …).
- `HomePage.js` – Landing page navigation.
- `CategoryPage.js` – Category and search views (Accessories, Men, Women, Kids, pagination).
- `ProductPage.js` – Product detail interactions (Thermos Yellow, variants, `addToCartWithRetry`).
- `CartPage.js` – Cart operations (remove, quantity, coupon, proceed to checkout).
- `AccountPage.js` – Account flows (register, login, forgot password).

**Reports and artifacts**

- `allure-results/` – Raw Allure data from each test run.
- `allure-report/` – Generated Allure HTML report.
- `playwright-report/` – Playwright’s built‑in HTML report.

---

## 4. Page Object Model – How It Works

Instead of scattering selectors across tests, the suite uses POM:

- Each logical page of the site has a class in `pages/`.
- Tests construct page objects, for example:

  ```js
  const product = new ProductPage(page);
  await product.openThermosYellow();
  await product.addToCartWithRetry();
  ```

- Reusable flows (like “add item to cart with variant retry and network check”) live in the page class, not in every test.
- When the UI changes, you typically update a single page class instead of every spec.

This keeps tests small, readable, and focused on behaviour instead of implementation details.

---

## 5. Running Tests & Reports

### Basic test commands

- Headless run (CI-style):

  ```bash
  npm test
  ```

- Headed run (for debugging):

  ```bash
  npm run test_headed
  ```

### Playwright HTML report

After a run, open the report with:

```bash
npx playwright show-report
```

### Allure reporting

Allure is enabled via the `allure-playwright` reporter in `playwright.config.js`.

- Generate the Allure report:

  ```bash
  npm run allure:generate
  ```

  This reads `allure-results/` and creates an HTML report in `allure-report/`.

- Open the Allure report:

  ```bash
  npm run allure:open
  ```

  This starts a local server and opens the report in your browser.

- One‑shot end‑to‑end flow (test + generate + open):

  ```bash
  npm run test_report
  ```

  Or, with headed tests:

  ```bash
  npm run test_report_headed
  ```

---

## 6. Adding New Tests

1. Identify the feature or user journey you want to cover.
2. Check if an appropriate page object already exists under `pages/`.
   - If yes, extend it with any missing helpers you need.
   - If not, create a new page class and encapsulate selectors and flows there.
3. Create a new `*.spec.js` in `tests/` and use the page objects, for example:

   ```js
   const { test } = require('@playwright/test');
   const { CategoryPage } = require('../pages/CategoryPage');

   test('Search for a backpack', async ({ page }) => {
     const category = new CategoryPage(page);
     await category.openSearch('Backpack');
     // add expectations here
   });
   ```

4. Run `npm test` (or `npm run test_headed`) and iterate.

---

## 7. CI / CD Integration

On CI you generally want a fast, headless run plus artifacts:

```bash
npm install
npx playwright install --with-deps   # optional, for first CI run
npm test
npm run allure:generate
```

Then archive or publish:

- `allure-report/` – for rich historical test reporting.
- `playwright-report/` – for Playwright’s detailed run view.

You can also export `allure-results/` to a central Allure server if your organization uses one.

---

## 8. Notes & Tips

- All tests use the base URL from `playwright.config.js`, so you can point the same suite at a different environment by changing that config or via environment variables.
- Logging is intentionally verbose (with `console.log`) to make debugging in CI logs easy.
- If you change critical user flows (cart, checkout, login), prefer updating the relevant page object rather than individual tests.

Happy testing.
Raiyan Nasim