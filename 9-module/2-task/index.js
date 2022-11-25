import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document
      .querySelector("[data-cart-icon-holder]")
      .append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let response = await fetch("products.json");
    let products = await response.json();

    this.productsGrid = new ProductsGrid(products);
    document
      .querySelector("[data-products-grid-holder]")
      .append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener("product-add", (e) => {
      let productId = e.detail;
      let product = products.find((el) => el.id == productId);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener("slider-change", (e) => {
      this.productsGrid.updateFilter({
        maxSpiciness: e.detail,
      });
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", (e) => {
      this.productsGrid.updateFilter({
        category: e.detail,
      });
    });

    document.body.addEventListener("change", (e) => {
      let nutsCheckBox = e.target.closest("#nuts-checkbox");
      if (nutsCheckBox) {
        this.productsGrid.updateFilter({
          noNuts: nutsCheckBox.checked,
        });
      }
    });

    document.body.addEventListener("change", (e) => {
      let vegeteriaCheckBox = e.target.closest("#vegeterian-checkbox");
      if (vegeteriaCheckBox) {
        this.productsGrid.updateFilter({
          vegeterianOnly: vegeteriaCheckBox.checked,
        });
      }
    });
  }
}
