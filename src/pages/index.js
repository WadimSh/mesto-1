import './index.css';

import { initialCards, configs } from '../utils/initialConfig.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__edit-avatar');

const popupFormEdit = document.querySelector('.popup_type_profile');
const inputName = popupFormEdit.querySelector('.popup__input_type_name');
const inputProf = popupFormEdit.querySelector('.popup__input_type_prof');

const popupFormAdd = document.querySelector('.popup_type_card');
const inputTitle = popupFormAdd.querySelector('.popup__input_type_title');
const inputPhoto = popupFormAdd.querySelector('.popup__input_type_photo');

const popupAvatar = document.querySelector('.popup_type_avatar');
const inputAvatar = popupAvatar.querySelector('.popup__input_type_avatar');

//объект API
const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
	headers: {
	  authorization: '9e805e1a-4ae4-4e34-b6d0-ba7f164bd419',
	  'Content-Type': 'application/json'
	}
});

//объект пользователя
const userInfo = new UserInfo('.profile__name', '.profile__prof', '.profile__avatar');

let userId

api.getUserInfo()
  	.then(res => {
    	userInfo.setUserInfo(res.name, res.about);
		userInfo.setUserAvatar(res.avatar);
		userId = res._id;
	})

//карточки
const popupImage = new PopupWithImage('.popup_type_photo'); 
popupImage.setEventListeners();

const confirmPopup = new PopupWithForm('.popup_type_delete');
confirmPopup.setEventListeners();

api.getInitialCards()
	.then(cardsList => {
		cardsList.forEach(data => {
			const card = creatCard({
				name: data.name,
				link: data.link,
				likes: data.likes,
				id: data._id,
				userId: userId,
				ownerId: data.owner._id
			})
			cardList.addItem(card);
		})
		.catch((err) => {
			console.log(`Невозможно получить карточки с сервера. ${err}.`);
			initialCards.forEach(data => {
				const card = creatCard(data)
				cardList.addItem(card);
			}) 
			
		})
	})

const creatCard = (data) => {
	const card = new Card(
		data, 
		'#template-element',
		() => {
			popupImage.open(data.name, data.link)
		},
		(id) => {
			confirmPopup.open();
			confirmPopup.changeSubmitHandler(() => {
				api.deleteCard(id)
					.then(res => {
						card.handleDeleteCard();
						confirmPopup.close()
					})
					
				}
			)
		},
		(id) => {
			if(card.isLiked()) {
				api.deleteLike(id)
					.then(res => {
						card.setLikes(res.likes)
					}
				)
			} else {
				api.addLike(id)
					.then(res => {
						card.setLikes(res.likes)
					}
				)
			}
		}
	);
	return card.generateCard();
}

const cardList = new Section({items: [], renderer: (item) => creatCard(item)}, '.elements__grid');
cardList.renderItems();

//форма добавления карточки
const addImageCard = new PopupWithForm('.popup_type_card', 
	() => {
		addImageCard.isLoadingMessage(true);
		api.postNewCard(inputTitle.value, inputPhoto.value)
			.then(res => {
				const card = creatCard({
					name: res.name,
					link: res.link,
					likes: res.likes,
					id: res._id,
					userId: userId,
					ownerId: res.owner._id
				})
				cardList.newItem(card);
			})
			.finally(() => {
				addImageCard.isLoadingMessage(false);
			})
		addImageCard.close();
	}
);

addImageCard.setEventListeners();

addButton.addEventListener('click', () => {
	addImageCard.open();
	validateFormAdd.resetValidation();
});

//валидация
const validateFormEdit = new FormValidator(configs, popupFormEdit);
const validateFormAdd = new FormValidator(configs, popupFormAdd);
const validateFormAvatar = new FormValidator(configs, popupAvatar);
validateFormEdit.enableValidation();
validateFormAdd.enableValidation();
validateFormAvatar.enableValidation();

//форма профайла
const formProfile = new PopupWithForm('.popup_type_profile', 
	() => {
		formProfile.isLoadingMessage(true);
		api.patchUserInfo(inputName.value, inputProf.value)
			.then(res => {
				userInfo.setUserInfo(res.name, res.about);
			})
			.finally(() => {
				formProfile.isLoadingMessage(false);
			})
		formProfile.close();
	}
);

formProfile.setEventListeners();

editButton.addEventListener('click', () => {
	formProfile.open();
	const user = userInfo.getUserInfo();
	inputName.value = user.userName;
	inputProf.value = user.userDescription;
	validateFormEdit.resetValidation();
});

//форма аватарки
const formAvatar = new PopupWithForm('.popup_type_avatar',
 	() => {
		formAvatar.isLoadingMessage(true);
		api.patchUserAvatar(inputAvatar.value)
			.then(res => {
				userInfo.setUserAvatar(res.avatar);
			})
			.finally(() => {
				formAvatar.isLoadingMessage(false);
			})
		formAvatar.close();
	}
);

formAvatar.setEventListeners();

avatarButton.addEventListener('click', () => {
	formAvatar.open();
	validateFormAvatar.resetValidation();
});
