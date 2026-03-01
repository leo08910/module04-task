import { $ } from "@wdio/globals";

class SidebarComponent {
  get searchInput() {
    return $("[data-test='search-query']");
  }

  get searchSubmit() {
    return $("[data-test='search-submit']");
  }

  async search(query) {
    await this.searchInput.setValue(query);
    await this.searchSubmit.click();
  }
}

export default new SidebarComponent();
