export class Card {
    constructor(item, cardSelector, handleCardClick, handleDeleteClick) {
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        this._id = item.id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
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

    handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector('.element__delete').addEventListener('click', () => this._handleDeleteClick(this._id));

        this._element.querySelector('.element__photo').addEventListener('click', this._handleCardClick);
    }

    _setLikes() {
        const likeCount = this._element.querySelector('.element__like-count');
        likeCount.textContent = this._likes.length;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        this._setLikes();
	
        return this._element;
    }
}

export default Card;