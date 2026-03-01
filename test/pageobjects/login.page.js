import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('[data-test="email"]');
  }

  get inputPassword() {
    return $('[data-test="password"]');
  }

  get btnSubmit() {
    return $('[data-test="login-submit"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("account"),
      { timeout: 5000 },
    );
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("auth/login");
  }
}

export default new LoginPage();
