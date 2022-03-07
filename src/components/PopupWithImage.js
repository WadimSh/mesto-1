import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    
    this._image = this._popupSelector.querySelector(".popup__photo");
    this._caption = this._popupSelector.querySelector(".popup__photo-caption");
  }

  open(name, link) {
    super.open();
    this._image.src = link;
    this._caption.textContent = name;
    this._image.alt = name;
  }
}