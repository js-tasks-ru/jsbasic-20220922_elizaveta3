function initCarousel() {
  let container = document.querySelector(".container");
  let arrowRight = container.querySelector(".carousel__arrow_right");
  let arrowLeft = container.querySelector(".carousel__arrow_left");
  let window = container.querySelector(".carousel__inner");
  let card = container.querySelector(".carousel__slide");
  /* let widthCard = card.offsetWidth; */

  arrowRight.onclick = function () {
    window.style.transform = "translateX(-600px)";
  };

  arrowLeft.onclick = function () {
    window.style.transform = "translateX(100%)";
  };
}
