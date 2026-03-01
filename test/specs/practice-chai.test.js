import { expect, assert } from "chai";
import "chai/register-should";
import Page from "../pageobjects/page.js";
import LoginPage from "../pageobjects/login.page.js";
const page = new Page();



describe("Public features", () => {
  beforeEach(async () => {
    page.open("");
  });

  it("Scenario 4: Change website language successfully", async () => {
    await $("[data-test='language-select']").click();
    await $("[data-test='lang-en']").click();
    const selectedLanguage = await $("[data-test='language-select']").getText();
    expect(selectedLanguage).to.equal("EN");
  });

  it("Scenario 5: Add product to shopping basket", async () => {
    await $("[data-test^='product-']").click();
    await $("[data-test='add-to-cart']").click();
    const toast = $("#toast-container");
    await toast.waitForExist();
    await toast.waitForDisplayed();
    const toastText = await toast.getText();
    assert.include(toastText, "Product added to shopping cart");
  });

  it("Scenario 6: Prevent adding product to favorites when not logged in", async () => {
    await $("[data-test^='product-']").click();
    await $("[data-test='add-to-favorites']").click();
    const toast = $("#toast-container");
    await toast.waitForExist();
    await toast.waitForDisplayed();
    const toastText = await toast.getText();
    toastText.should.include(
      "Unauthorized, can not add product to your favorite list.",
    );
  });

  it("Scenario 7: Search for an existing product", async () => {
    await $("[data-test='search-query']").setValue("pliers");
    await $("[data-test='search-submit']").click();

    const firstProduct = await $("[data-test='product-name']");
    await firstProduct.waitForDisplayed({ timeout: 5000 });

    const products = await $$("[data-test='product-name']");

    expect(products.length).to.be.greaterThan(0);
  });

  it("Scenario 9: Remove a product from the shopping basket", async () => {
    await $("[data-test='nav-cart']").click();
    await $$(".btn.btn-danger")[0].click();
    const toast = $("#toast-container");
    await toast.waitForExist();
    await toast.waitForDisplayed();
    const toastText = await toast.getText();
    assert.include(toastText, "Product deleted.");
  });
});

describe("Authenticated features", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("customer3@practicesoftwaretesting.com", "pass123");
    await $("[data-test='nav-home']").click();
  });

  it("Scenario 10: Add product to favorites successfully", async () => {
    await $("[data-test^='product-']").click();
    await $("[data-test='add-to-favorites']").click();

    const toast = $("#toast-container");
    await toast.waitForExist();
    await toast.waitForDisplayed();
    const toastText = await toast.getText();
    toastText.should.include("Product added to your favorites list.");
  });
});