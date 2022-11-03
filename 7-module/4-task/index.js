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
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.thumb.ondragstart = () => false;
    this.dragEvents();
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
    this.elem.querySelector(".slider__progress").style.width = `${valuePercents}%`;
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

  dragEvents() {
    this.thumb.addEventListener("pointerdown", this.pointerdown);
    this.thumb.addEventListener("pointerup", this.pointerup);
  }

  pointerdown = () => {
    this.thumb.addEventListener("pointermove", this.pointermove);
    this.elem.classList.add("slider_dragging");
  };

  pointerup = () => {
    this.thumb.removeEventListener("pointermove", this.pointermove);
    this.elem.classList.remove("slider_dragging");

    let eventCustom = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(eventCustom);
  };

  pointermove = (event) => {
    let segments = this.steps - 1;
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    this.value = value;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    this.elem.querySelector(".slider__thumb").style.left = `${leftPercents}%`;
    this.elem.querySelector(".slider__progress").style.width = `${leftPercents}%`;
    this.elem.querySelector(".slider__value").textContent = value;
  };
}
