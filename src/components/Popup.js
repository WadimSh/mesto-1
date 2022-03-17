export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick = (evt) => {
    if(evt.target.classList.contains('popup')) {
      this.close();
    };
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
    window.addEventListener("mousedown", this._handleOverlayClick);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
    window.addEventListener("mousedown", this._handleOverlayClick);
  }

  

  setEventListeners() {
    this._popup
      .querySelector('.popup__close-button')
      .addEventListener("click", () => {
        this.close();
      });
  }
}