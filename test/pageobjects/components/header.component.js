import { $ } from "@wdio/globals";

class HeaderComponent {
  get languageSelect() {
    return $("[data-test='language-select']");
  }

  langOption(code) {
    return $(`[data-test='lang-${code}']`);
  }

  get navCart() {
    return $("[data-test='nav-cart']");
  }

  get navHome() {
    return $("[data-test='nav-home']");
  }

  async selectLanguage(code) {
    await this.languageSelect.click();
    await this.langOption(code).click();
  }

  async getSelectedLanguage() {
    return this.languageSelect.getText();
  }

  async openCart() {
    await this.navCart.click();
  }

  async openHome() {
    await this.navHome.click();
  }
}

export default new HeaderComponent();
