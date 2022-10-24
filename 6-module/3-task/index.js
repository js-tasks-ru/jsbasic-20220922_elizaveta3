import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    const cards = `<div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
  
      <div class="carousel__inner">
        
        ${this.slides.map(
          (card) => `<div class="carousel__slide" data-id="${card.id}">
  <img src="/assets/images/carousel/${
    card.image
  }" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">${this.getPrice(card.price)}</span>
    <div class="carousel__title">${card.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>`
        )}
      </div>
      </div>`;

    this.elem = createElement(cards);
    this.initCarousel();
    this.elem
      .querySelectorAll(".carousel__button")
      .forEach((obj) => obj.addEventListener("click", this.clickDetail));
  }

  getPrice(price) {
    return `€${price.toFixed(2)}`;
  }

  initCarousel() {
    let elem = this.elem;

    let carousel = elem.querySelector(".carousel");
    let arrowRight = elem.querySelector(".carousel__arrow_right");
    let arrowLeft = elem.querySelector(".carousel__arrow_left");
    let window = elem.querySelector(".carousel__inner");
    let cardWidth = elem.querySelector(".carousel__slide").offsetWidth;
    let cardCount = elem.querySelectorAll(".carousel__slide").length;

    let index = 0;
    arrowLeft.style.display = "none";

    this.elem.addEventListener("click", function (event) {
      if (event.target.closest(".carousel__arrow_right")) {
        while (index < cardCount - 1) {
          index++;
          window.style.transform = `translateX(${
            -index * elem.querySelector(".carousel__inner").offsetWidth
          }px)`;
          arrowLeft.style.display = "";
          index === cardCount - 1
            ? (arrowRight.style.display = "none")
            : (arrowRight.style.display = "");
          break;
        }
      } else if (event.target.closest(".carousel__arrow_left")) {
        while (index > 0) {
          index--;
          window.style.transform = `translateX(${
            -index * elem.querySelector(".carousel__slide").offsetWidth
          }px)`;
          arrowRight.style.display = "";
          index === 0
            ? (arrowLeft.style.display = "none")
            : (arrowLeft.style.display = "");
          break;
        }
      }
    });
  }

  clickDetail = (event) => {
    let id = event.target.closest(".carousel__slide").dataset.id;
    let newEvent = new CustomEvent("product-add", {
      detail: id,
      bubbles: true,
    });
    this.elem.dispatchEvent(newEvent);
  };
}
