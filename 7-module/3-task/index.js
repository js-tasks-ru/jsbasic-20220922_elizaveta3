import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(
      `<div class="slider">
<div class="slider__thumb">
  <span class="slider__value">${this.value}</span>
</div>
<div class="slider__progress" style="width: 0%"></div>
<div class="slider__steps">
</div>
</div>`
    );
    this.sliderSteps();
    this.addEventListeners();
  }

  sliderSteps = () => {
    let wrapSliderSteps = this.elem.querySelector(".slider__steps");
    for (var i = 1; i <= this.steps; i++) {
      if (i == 1) {
        wrapSliderSteps.innerHTML = `<span class="slider__step-active"></span>`;
      } else {
        wrapSliderSteps.innerHTML += "<span></span>";
      }
    }
  };

  changePosition = (el) => {
    let segments = this.steps - 1;
    let left = el.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;
    this.value = value;

    this.elem.querySelector(".slider__thumb").style.left = `${valuePercents}%`;
    this.elem.querySelector(
      ".slider__progress"
    ).style.width = `${valuePercents}%`;
    this.elem.querySelector(".slider__value").textContent = value;

    let eventCustom = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(eventCustom);

    let stepCollection = this.elem.querySelectorAll(".slider__steps span");
    for (let item of stepCollection) {
      item.classList.remove("slider__step-active");
    }
    stepCollection[value].classList.add("slider__step-active");
  };

  addEventListeners() {
    this.elem.addEventListener("click", this.changePosition);
  }
}
