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
  formEdit,
  formAdd
} from '../scripts/utils/constants.js';

import '../pages/index.css'



//включаем валидацию формы изменения профиля
const formEditValidation = new FormValidator(formEdit, validationParameters);
formEditValidation.enableValidation();

// включаем валидацию формы добавления карточки
const formAddValidation = new FormValidator(formAdd, validationParameters);
formAddValidation.enableValidation();




const imagePopupOpen = (item) => new PopupWithImage(imagePopup, item);
imagePopupOpen().setEventListeners();

// функция открытия карточки с попапом картинки
const openImagePopup = (item) => {
  imagePopupOpen(item).open();
}


// функция рендера карточки для создания карточек из массива и формы
const cardRenderer = (item) => {
  const card = new Card(item, cardItemTemplateSelector,
    (item) => {
      openImagePopup(item)
    }
  );
  const cardElement = card.renderCard();
  cardList.setItem(cardElement);
}

// рендерим карточки и вставляем в разметку классом Section
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      cardRenderer(item)
    },
  },
  containerSelector)
cardList.renderItems();




// создаем класс добавления карточки
const popupWithFormAddCard = new PopupWithForm({
  popupSelector: addPopup,
  handleFormSubmit: (item) => {
    cardRenderer(item)
  }
});
popupWithFormAddCard.setEventListeners();
addPopupOpen.addEventListener('click', () => {
  formAddValidation.toggleButtonState();
  popupWithFormAddCard.open();
  
})


// создаем класс для обработки попапа профиля 
const formEditProfile = new UserInfo('.profile-info__title', '.profile-info__subtitle');

const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: editPopup,
  handleFormSubmit: (item) => {
    
    formEditProfile.setUserInfo(item.name, item.job);
  }
});

popupWithFormEditProfile.setEventListeners();


// открываем попап профиля
editPopupOpen.addEventListener("click", () => {
  formEditProfile.getUserInfo();
  document.forms.edit.name.value = formEditProfile.getUserInfo().name;
  document.forms.edit.job.value = formEditProfile.getUserInfo().job;
  formEditValidation.toggleButtonState();
  popupWithFormEditProfile.open();
});