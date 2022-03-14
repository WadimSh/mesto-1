import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupSelector.querySelector('.popup__form');
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    this._button = this._popupSelector.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmitForm = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues())});
  }

  isLoadingMessage(isLoading) {
    if (isLoading === true) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = 'Сохранить';
    }
  }

}