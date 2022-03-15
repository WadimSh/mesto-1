export class Card {
    constructor(item, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        this._id = item.id;
        this._userId = item.userId;
        this._ownerId = item.ownerId;

        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _fillLike() {
        this._element.querySelector('.element__like').classList.add('element__like_active');
    }

    _deleteLike() {
        this._element.querySelector('.element__like').classList.remove('element__like_active');
    }

    handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => this._handleLikeClick(this._id));
        

        this._element.querySelector('.element__delete').addEventListener('click', () => this._handleDeleteClick(this._id));

        this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick());
    }

    isLiked() {
        const userLikeCard = this._likes.find(user => user._id === this._userId);
        
        return userLikeCard
    } 

    setLikes(newLikes) {
        this._likes = newLikes;
        const likeCount = this._element.querySelector('.element__like-count');
        likeCount.textContent = this._likes.length;

        if(this.isLiked()) {
            this._fillLike();
        } else {
            this._deleteLike();
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        this.setLikes(this._likes);

        if(this._ownerId !== this._userId) {
            this._element.querySelector('.element__delete').style.display = 'none';
        }

        
	
        return this._element;
    }
}

export default Card;