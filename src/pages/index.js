import './index.css';

import { initialCards, configs } from '../utils/initialConfig.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupFormEdit = document.querySelector('.popup_type_profile');
const inputName = popupFormEdit.querySelector('.popup__input_type_name');
const inputProf = popupFormEdit.querySelector('.popup__input_type_prof');

const popupFormAdd = document.querySelector('.popup_type_card');
const inputTitle = popupFormAdd.querySelector('.popup__input_type_title');
const inputPhoto = popupFormAdd.querySelector('.popup__input_type_photo');


//карточки
const popupImage = new PopupWithImage('.popup_type_photo'); 


const addCardList = function(item) {
	const card = new Card(item, '#template-element',
	{handleCardClick: () => popupImage.open(item.name, item.link)});
	const cardElement = card.generateCard();
	cardList.addItem(cardElement);
};
  
const cardList = new Section({
	items: initialCards, 
	renderer: (item) => addCardList(item)
  	}, '.elements__grid');

cardList.renderItems();

//валидация
const validateFormEdit = new FormValidator(configs, popupFormEdit);
const validateFormAdd = new FormValidator(configs, popupFormAdd);
validateFormEdit.enableValidation();
validateFormAdd.enableValidation();

//форма профайла
const userInfo = new UserInfo('.profile__name', '.profile__prof');

const formProfile = new PopupWithForm('.popup_type_profile', 
{handleSubmitForm: () => {
	userInfo.setUserInfo(inputName.value, inputProf.value);
	formProfile.close();
}});

editButton.addEventListener('click', () => {
	formProfile.open();
	const user = userInfo.getUserInfo();
	inputName.value = user.userName;
	inputProf.value = user.userDescription;
	validateFormEdit.resetValidation();
});

formProfile.setEventListeners();

//форма добавления карточки

const addImageCard = new PopupWithForm('.popup_type_card', 
{handleSubmitForm: () => {
	addCardList({name: inputTitle.value, link: inputPhoto.value});
	addImageCard.close();
}});

addButton.addEventListener('click', () => {
	addImageCard.open();
	validateFormAdd.resetValidation();
});

addImageCard.setEventListeners();

