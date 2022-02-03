import { initialCards, configs } from './initialConfig.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const userName = document.querySelector('.profile__name');
const userProf = document.querySelector('.profile__prof');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const elementsGrid = document.querySelector('.elements__grid');

const popupFormEdit = document.querySelector('.popup_type_profile');
const closeButtonEdit = popupFormEdit.querySelector('.popup__close-button');
const inputFormEdit = popupFormEdit.querySelector('.popup__form_type_edit');
const inputName = popupFormEdit.querySelector('.popup__input_type_name');
const inputProf = popupFormEdit.querySelector('.popup__input_type_prof');

const popupFormAdd = document.querySelector('.popup_type_card');
const closeButtonAdd = popupFormAdd.querySelector('.popup__close-button');
const inputFormAdd = popupFormAdd.querySelector('.popup__form_type_add');
const inputTitle = popupFormAdd.querySelector('.popup__input_type_title');
const inputPhoto = popupFormAdd.querySelector('.popup__input_type_photo');
const saveButton = popupFormAdd.querySelector('.popup__save-button');

export const popupFormPhoto = document.querySelector('.popup_type_photo');
const closeButtonPhoto = popupFormPhoto.querySelector('.popup__close-button');


function closeMausOverlay (evt) {
	const item = document.querySelector('.popup_opened');
	if(evt.target === item) {
		closePopup(item);
	}
}

function closeKeybordEscape (evt) {
	const item = document.querySelector('.popup_opened');
	if(evt.key === 'Escape') {
		closePopup(item);
	}
}

export function openPopup(formName) {
    formName.classList.add('popup_opened');
	document.addEventListener('mousedown', closeMausOverlay);
   	document.addEventListener('keydown', closeKeybordEscape);
}

function closePopup(formName) {
    formName.classList.remove('popup_opened');
	document.removeEventListener('mousedown', closeMausOverlay);
   	document.removeEventListener('keydown', closeKeybordEscape);
}

function openPopupEdit() {
    openPopup (popupFormEdit);
    inputName.value = userName.textContent;
	inputProf.value = userProf.textContent;
	
}

function openPopupAdd() {
    openPopup (popupFormAdd);
	inputTitle.value = '';
	inputPhoto.value = '';
	saveButton.setAttribute('disabled', 'disabled');
	
}

function formSubmitHandlerEdit (evt) {
	evt.preventDefault(); 
	userName.textContent = inputName.value;
	userProf.textContent = inputProf.value;
	closePopup (popupFormEdit);
}

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
	const item = {}
		item.name = inputTitle.value;
		item.link = inputPhoto.value;
	const card = new Card (item, '#template-element');
	const cardElement = card.generateCard();
	elementsGrid.append(cardElement);
    closePopup (popupFormAdd);
}

function addInitialCards() {
	initialCards.forEach((item) => {
		const card = new Card (item, '#template-element');
		const cardElement = card.generateCard();
		elementsGrid.append(cardElement);
	});
}

const validateFormEdit = new FormValidator(configs, popupFormEdit);
const validateFormAdd = new FormValidator(configs, popupFormAdd);
validateFormEdit.enableValidation();
validateFormAdd.enableValidation();

editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', () => closePopup(popupFormEdit));
inputFormEdit.addEventListener('submit', formSubmitHandlerEdit);

addButton.addEventListener('click', openPopupAdd);
closeButtonAdd.addEventListener('click', () => closePopup(popupFormAdd));
inputFormAdd.addEventListener('submit', formSubmitHandlerAdd);

closeButtonPhoto.addEventListener('click', () => closePopup(popupFormPhoto));

addInitialCards();