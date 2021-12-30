//Поздравляю Вас с наступающим Новым годо! Желяю всего самого наилутшего и релизацию всех, даже амбициозных, Ваших планов!
//Спасибо за Вашу работу! Мне это позволило намного лучше понять как работает JS.

const userName = document.querySelector('.profile__name');
const userProf = document.querySelector('.profile__prof');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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

const popupFormPhoto = document.querySelector('.popup_type_photo');
const closeButtonPhoto = popupFormPhoto.querySelector('.popup__close-button');

const elementTemplate = document.querySelector('#template-element').content;
const elementsGrid = document.querySelector('.elements__grid');

const closeMausOverlay = (evt) => {
	const item = document.querySelector('.popup_opened');
	if(evt.target === item) {
		closePopup(item);
	}
}

const closeKeybordEscape = (evt) => {
	const item = document.querySelector('.popup_opened');
	if(evt.key === 'Escape') {
		closePopup(item);
	}
}

function openPopup (formName) {
    formName.classList.add('popup_opened');
	document.addEventListener('mousedown', closeMausOverlay);
   	document.addEventListener('keydown', closeKeybordEscape);
}

function closePopup (formName) {
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
	saveButton.classList.add('popup__save-button_inactive');
	saveButton.setAttribute('disabled', 'disabled');
}

function formSubmitHandlerEdit (evt) {
	evt.preventDefault(); 
	userName.textContent = inputName.value;
	userProf.textContent = inputProf.value;
	closePopup (popupFormEdit);
}

function likeCard (likeElement) {
    likeElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
    });
}

function deleteCard (delElement) {
    delElement.querySelector('.element__delete').addEventListener('click', function(evt) {
	evt.target.closest('.element').remove();
	});
}

function popupPhoto (popupElement) {
    popupElement.querySelector('.element__photo').addEventListener('click', function() {
    popupFormPhoto.querySelector('.popup__photo').src = popupElement.querySelector('.element__photo').src;
    popupFormPhoto.querySelector('.popup__photo-caption').textContent = popupElement.querySelector('.element__title').textContent;
    openPopup (popupFormPhoto);
    });
}

function createCard (name, link) {
	const userElement = elementTemplate.querySelector('.element').cloneNode(true);
		userElement.querySelector('.element__photo').src = link;
		userElement.querySelector('.element__photo').alt = name;
		userElement.querySelector('.element__title').textContent = name;
	likeCard (userElement);
	deleteCard (userElement);
	popupPhoto (userElement);

	return userElement;
}

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
	const name = inputTitle.value;
	const link = inputPhoto.value;
	const newCard = createCard (name, link);
	elementsGrid.prepend(newCard);
    closePopup (popupFormAdd);
}

function addInitialCards() {
	initialCards.forEach(function(item){
		const newCard = createCard (item.name, item.link);
	elementsGrid.append(newCard);
});
}

editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', () => closePopup(popupFormEdit));
inputFormEdit.addEventListener('submit', formSubmitHandlerEdit);

addButton.addEventListener('click', openPopupAdd);
closeButtonAdd.addEventListener('click', () => closePopup(popupFormAdd));
inputFormAdd.addEventListener('submit', formSubmitHandlerAdd);

closeButtonPhoto.addEventListener('click', () => closePopup(popupFormPhoto));

addInitialCards();