import { $ } from "@wdio/globals";

class ToastComponent {
  get container() {
    return $("#toast-container");
  }

  async waitAndGetText() {
    await this.container.waitForExist();
    await this.container.waitForDisplayed();
    return this.container.getText();
  }
}

export default new ToastComponent();
