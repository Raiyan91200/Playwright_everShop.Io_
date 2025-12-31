const { BasePage } = require('./BasePage');

class CategoryPage extends BasePage {
  async openAccessories() {
    await this.goto('/accessories');
  }

  async openKids() {
    await this.goto('/kids');
  }

  async openWomen() {
    await this.goto('/women');
  }

  async openMen() {
    await this.goto('/men');
  }

  async openSearch(query) {
    await this.goto(`/search?q=${encodeURIComponent(query)}`);
  }

  async openFirstProduct(selector = 'a[href*="/accessories/"]') {
    await this.page.locator(selector).first().click();
  }

  getNextButton() {
    return this.page.locator('.pagination .next');
  }
}

module.exports = { CategoryPage };
