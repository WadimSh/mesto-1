import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    
    this._image = this._popup.querySelector(".popup__photo");
    this._caption = this._popup.querySelector(".popup__photo-caption");
  }

  open(name, link) {
    super.open();
    this._image.src = link;
    this._caption.textContent = name;
    this._image.alt = name;
  }
}