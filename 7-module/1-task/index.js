import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(
      `<div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      ${this.categories
        .map(
          (el) => `
      <a href="#" class="ribbon__item" data-id="${el.id}">${el.name}</a>`
        )
        .join("")}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`
    );
    this.render();
  }

  render() {
    let ribbonInner = this.elem.querySelector(".ribbon__inner");
    let arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    let arrowLeft = this.elem.querySelector(".ribbon__arrow_left");

    arrowRight.classList.add("ribbon__arrow_visible");
    arrowLeft.classList.remove("ribbon__arrow_visible");

    ribbonInner.addEventListener("scroll", () => {
      let clientWidth = ribbonInner.clientWidth;
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        arrowLeft.classList.remove("ribbon__arrow_visible");
      } else {
        arrowLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight < 1) {
        arrowRight.classList.remove("ribbon__arrow_visible");
      } else {
        arrowRight.classList.add("ribbon__arrow_visible");
      }
    });

    this.elem.addEventListener("click", function (event) {
      if (event.target.closest(".ribbon__arrow_right")) {
        ribbonInner.scrollBy(350, 0);
      } else if (event.target.closest(".ribbon__arrow_left")) {
        ribbonInner.scrollBy(-350, 0);
      }
    });

    this.elem.querySelectorAll(".ribbon__item").forEach((obj) =>
      obj.addEventListener("click", function (event) {
        event.preventDefault();
        for (let item of ribbonInner.querySelectorAll(".ribbon__item")) {
          item.classList.remove("ribbon__item_active");
        }
        this.classList.add("ribbon__item_active");

        let id = event.target.closest(".ribbon__item").dataset.id;
        let eventCustom = new CustomEvent("ribbon-select", {
          detail: id,
          bubbles: true,
        });
        this.dispatchEvent(eventCustom);
      })
    );
  }
}
