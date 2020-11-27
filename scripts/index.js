import {
  Card
} from './card.js';
import {
  FormValidator
} from './formvalidator.js';
import {
  initialCards
} from './define.js';
import {
  Section
} from './Section.js';
import {
  PopupWithImage
} from './PopupWithImage.js';
import {
  UserInfo
} from './UserInfo.js';
import {
  PopupWithForm
} from './PopupWithForm.js';


// объявляем константы
// темплейт
const containerSelector = '.cards';

// три попапа 
const editPopup = document.querySelector(".popup_type_edit-profile");
const addPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image");

// открытие попапов на главной
const editPopupOpen = document.querySelector(".edit-button");
const addPopupOpen = document.querySelector(".add-button");
const cardItemTemplateSelector = '.template-card';

// включаем валидацию 
const validationParameters = ({
  formSelector: '.form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'error',
  errorClass: 'popup__item_invalid',
});

// создаем массив из всех форм
const formsArr = Array.from(document.querySelectorAll('.form'));

// добавляем валидацию всех форм при помощи класса
formsArr.forEach((form) => {
  const formValidation = new FormValidator(form, validationParameters);
  formValidation.enableValidation();
})

// вставляем карточки в разметку классом Section
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardItemTemplateSelector,
        (item) => {
          const imagePopupOpen = new PopupWithImage(imagePopup, item)
          imagePopupOpen.open();
          imagePopupOpen.setEventListeners();
        }
      );
      const cardElement = card.renderCard();
      cardList.setItem(cardElement);
    },
  },
  containerSelector)
cardList.renderItems();

const popupWithFormAddCard = new PopupWithForm({
  popupSelector: addPopup,
  handleFormSubmit: (item) => {
    const card = new Card(item, cardItemTemplateSelector,
      (item) => {
        const imagePopupTest = new PopupWithImage(imagePopup, item)
        imagePopupTest.open();
        imagePopupTest.setEventListeners();
      }
    );
    const cardElement = card.renderCard();
    cardList.setItem(cardElement);
  }
});
popupWithFormAddCard.setEventListeners();
addPopupOpen.addEventListener('click', () => {
  popupWithFormAddCard.open();
})


// создаем класс для обработки попапа профиля 
const formEditProfile = new UserInfo('.profile-info__title', '.profile-info__subtitle');
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: editPopup,
  handleFormSubmit: (evt) => formEditProfile.setUserInfo(evt, popupWithFormEditProfile.close())
});
popupWithFormEditProfile.setEventListeners();


// открываем попап профиля
editPopupOpen.addEventListener("click", () => {
  popupWithFormEditProfile.open();
  formEditProfile.getUserInfo();
});