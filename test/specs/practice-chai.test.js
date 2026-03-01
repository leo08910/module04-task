import { expect, assert } from "chai";
import "chai/register-should";
import Page from "../pageobjects/pages/page.js";
import LoginPage from "../pageobjects/pages/login.page.js";
import Header from "../pageobjects/components/header.component.js";
import Sidebar from "../pageobjects/components/sidebar.component.js";
import Product from "../pageobjects/pages/product.page.js";
import Cart from "../pageobjects/pages/cart.page.js";
import Toast from "../pageobjects/components/toast.component.js";

const page = new Page();



describe("Public features", () => {
  beforeEach(async () => {
    await page.open("");
  });

  it("Scenario 4: Change website language successfully", async () => {
    await Header.selectLanguage("en");
    const selectedLanguage = await Header.getSelectedLanguage();
    expect(selectedLanguage).to.equal("EN");
  });

  it("Scenario 5: Add product to shopping basket", async () => {
    await Product.openFirstProduct();
    await Product.addToCart();
    const toastText = await Toast.waitAndGetText();
    assert.include(toastText, "Product added to shopping cart");
  });

  it("Scenario 6: Prevent adding product to favorites when not logged in", async () => {
    await Product.openFirstProduct();
    await Product.addToFavorites();
    const toastText = await Toast.waitAndGetText();
    toastText.should.include(
      "Unauthorized, can not add product to your favorite list.",
    );
  });

  it("Scenario 7: Search for an existing product", async () => {
    await Sidebar.search("pliers");

    const products = await Product.getProductNameElements();
    expect(products.length).to.be.greaterThan(0);
  });

  it("Scenario 9: Remove a product from the shopping basket", async () => {
    await Header.openCart();
    await Cart.removeFirstProduct();
    const toastText = await Toast.waitAndGetText();
    assert.include(toastText, "Product deleted.");
  });
});

describe("Authenticated features", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("customer3@practicesoftwaretesting.com", "pass123");
    await Header.openHome();
  });

  it("Scenario 10: Add product to favorites successfully", async () => {
    await Product.openFirstProduct();
    await Product.addToFavorites();

    const toastText = await Toast.waitAndGetText();
    toastText.should.include("Product added to your favorites list.");
  });
});