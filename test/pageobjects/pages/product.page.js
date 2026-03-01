import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class ProductPage extends Page {
  get productTiles() {
    return $$("[data-test^='product-']");
  }

  get addToCartBtn() {
    return $("[data-test='add-to-cart']");
  }

  get addToFavoritesBtn() {
    return $("[data-test='add-to-favorites']");
  }

  get productNames() {
    return $$("[data-test='product-name']");
  }

  async openFirstProduct() {
    await this.productTiles[0].click();
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async addToFavorites() {
    await this.addToFavoritesBtn.click();
  }

  async getProductNameElements() {
    const firstProduct = await $("[data-test='product-name']");
    await firstProduct.waitForDisplayed({ timeout: 5000 });
    return this.productNames;
  }
}

export default new ProductPage();
