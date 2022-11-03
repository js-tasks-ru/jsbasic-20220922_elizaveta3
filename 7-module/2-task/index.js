import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.modal = createElement(
      `<div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    </div>`
    );
    this.addEventListeners();
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add("is-modal-open");
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.modal.remove();
    document.removeEventListener("keydown", this.closeEsc);
  }

  closeEsc = (event) => {
    if (event.code == "Escape") {
      this.modal.remove();
      document.body.classList.remove("is-modal-open");
    }
  };

  addEventListeners() {
    this.modal.querySelector(".modal__close").addEventListener("click", () => {
      this.modal.remove();
      document.body.classList.remove("is-modal-open");
    });

    document.addEventListener("keydown", this.closeEsc);
  }

  setTitle(title) {
    let mainTitle = this.modal.querySelector(".modal__title");
    mainTitle.textContent = title;
  }

  setBody(body) {
    let mainBody = this.modal.querySelector(".modal__body");
    mainBody.append(body);
  }
}
