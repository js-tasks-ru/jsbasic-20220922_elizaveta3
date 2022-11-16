import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.list = [];
    this.elem = createElement(
      `<div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
      `
    );
    this.addProducts();
  }

  addProducts(list = this.products) {
    this.elem.querySelector(".products-grid__inner").innerHTML = "";
    list.forEach((product) => {
      let prodCard = new ProductCard(product);
      this.elem.querySelector(".products-grid__inner").append(prodCard.elem);
    });
    return this.elem;
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.list = [];

    for (let prod of this.products) {
      if (this.filters.noNuts && prod.nuts) {
        continue;
      }
      if (this.filters.vegeterianOnly && !prod.vegeterian) {
        continue;
      }
      if (
        this.filters.maxSpiciness &&
        prod.spiciness > this.filters.maxSpiciness
      ) {
        continue;
      }
      if (this.filters.category && this.filters.category != prod.category) {
        continue;
      }

      this.list.push(prod);
    }

    this.addProducts(this.list);
  }
}
