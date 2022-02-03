import { popupFormPhoto, openPopup } from './index.js';

class Card {
    constructor(item, cardSelector) {
        this._name = item.name;
        this._link = item.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _handleLikeClick() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _handlePopupPhoto() {
        openPopup (popupFormPhoto);
        popupFormPhoto.querySelector('.popup__photo').src = this._link;
        popupFormPhoto.querySelector('.popup__photo-caption').textContent = this._name;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handlePopupPhoto();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.element__photo').src = this._link;
		this._element.querySelector('.element__photo').alt = this._name;
		this._element.querySelector('.element__title').textContent = this._name;
	
	    return this._element;
    }
}

export default Card;