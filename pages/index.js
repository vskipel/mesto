import {
  Card
} from '../scripts/components/Card.js';
import {
  FormValidator
} from '../scripts/components/FormValidator.js';
import {
  initialCards
} from '../scripts/utils/define.js';
import {
  Section
} from '../scripts/components/Section.js';
import {
  PopupWithImage
} from '../scripts/components/PopupWithImage.js';
import {
  UserInfo
} from '../scripts/components/UserInfo.js';
import {
  PopupWithForm
} from '../scripts/components/PopupWithForm.js';


import {
  containerSelector,
  editPopup,
  addPopup,
  imagePopup,
  editPopupOpen,
  addPopupOpen,
  cardItemTemplateSelector,
  validationParameters,
  formsArr
} from '../scripts/utils/constants.js';



// добавляем валидацию всех форм при помощи класса
formsArr.forEach((form) => {
  const formValidation = new FormValidator(form, validationParameters);
  formValidation.enableValidation();
})

// рендерим карточки и вставляем в разметку классом Section
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

// создаем класс добавления карточки
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