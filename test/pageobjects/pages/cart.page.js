import { $$ } from "@wdio/globals";
import Page from "./page.js";

class CartPage extends Page {
  get removeButtons() {
    return $$(".btn.btn-danger");
  }

  async removeFirstProduct() {
    await this.removeButtons[0].click();
  }
}

export default new CartPage();
