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
  Popup
} from './Popup.js';
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
const templateCard = document.querySelector(".template-card").content.querySelector(".card");
const popup = document.querySelector(".popup");
const containerSelector = '.cards';

// три попапа 
const editPopup = document.querySelector(".popup_type_edit-profile");
const addPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image");

// открытие попапов на главной
const editPopupOpen = document.querySelector(".edit-button");
const addPopupOpen = document.querySelector(".add-button");

//закрытие попапов крестиком
const editPopupClose = editPopup.querySelector(".popup__close-icon");
const addPopupClose = addPopup.querySelector(".popup__close-icon");
const imagePopupClose = imagePopup.querySelector(".popup__image-close-icon");

//внутри попапа с выводом картинки
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupTitle = imagePopup.querySelector(".popup__subtitle");

// объявляем переменные
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__subtitle");
const cardItemTemplateSelector = '.template-card';

// достаем значения форм
const formEdit = document.forms.edit;
const formEditName = formEdit.elements.name;
const formEditJob = formEdit.elements.job;
const formAdd = document.forms.add;
const formAddPlaceInput = formAdd.elements.place;
const formAddLinkInput = formAdd.elements.link;

// сбрасываем значения в форме "добавить место"
function resetFormAdd(addPopup) {
  popupClosed(addPopup);
  formAdd.reset();
}






// // функция создания карточки из класса
// const addCard = cardData => {
//   const listItem = new Card(cardData, cardItemTemplateSelector, handlePreviewPicture);
//   sectionCards.prepend(listItem.renderCard(sectionCards));
// }

// открываем попап профиля
editPopupOpen.addEventListener("click", () => {
  const formValues = new UserInfo('.profile-info__title', '.profile-info__subtitle');
  formValues.getUserInfo();
  const popupEditClass = new Popup(editPopup);
  popupEditClass.setEventListeners();
  popupEditClass.open();
  formEdit.addEventListener("submit", (evt) => formValues.setUserInfo(evt, popupEditClass.close()));
});

// // добавление карточки из формы
// function formSubmitHandlerAddCard(evt) {
//   evt.preventDefault();
//   const newCard = ({
//     name: formAddPlaceInput.value,
//     link: formAddLinkInput.value
//   })
//   addCard(newCard);
//   resetFormAdd(addPopup);
// }


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
  const printTest = formValidation.enableValidation();
})



// вставляем карточки в разметку классом Section
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardItemTemplateSelector,
        (item) => {
          const imagePopupTest = new PopupWithImage(imagePopup, item)
          imagePopupTest.open();
          imagePopupTest.setEventListeners();
        }
      );
      const cardElement = card.renderCard();
      cardList.setItem(cardElement);
    },
  },
  containerSelector)
cardList.renderItems();


const popupWithFormHandler = new PopupWithForm({
  popupSelector: addPopup,
  handleFormSubmit: (item) => {
    const card = new Card(item, cardItemTemplateSelector,
      (item) => {
        const imagePopupTest = new PopupWithImage(imagePopup, item)
        imagePopupTest.open();
        imagePopupTest.setEventListeners();
      }
    );
    console.log(card);
    const cardElement = card.renderCard();


    cardList.setItem(cardElement);
  }
});

addPopupOpen.addEventListener('click', () => {
  popupWithFormHandler.setEventListeners();
  popupWithFormHandler.open();

})



// отслеживаем действия пользователя
// addPopupOpen.addEventListener("click", () => popupOpened(addPopup));
// addPopupClose.addEventListener("click", () => resetFormAdd(addPopup));
// formAdd.addEventListener("submit", formSubmitHandlerAddCard);

// imagePopupClose.addEventListener("click", () => popupClosed(imagePopup));

// // функция закрытия попапа
// function popupClosed(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener('keydown', handleEscDown);
//   document.removeEventListener('click', handleOverlayClick);
// }



// // создаем карточки из массива
// initialCards.forEach(addCard);
// // вывод на страницу значений попапа значений со страницы
// function formSubmitHandlerEditProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = formEditName.value;
//   profileJob.textContent = formEditJob.value;
//   popupClosed(editPopup, );
// }



// // функция закрытия попапа по клику на эскейп
// function handleEscDown(evt) {
//   const openedPopup = document.querySelector(".popup_opened");
//   if (evt.key === "Escape") {
//     popupClosed(openedPopup);
//     resetFormAdd(addPopup);
//   };
// };

// // функция закрытия попапа по клику на оверлей
// function handleOverlayClick(evt) {
//   const openedPopup = document.querySelector(".popup_opened");
//   if (evt.target === evt.currentTarget) {
//     popupClosed(openedPopup);
//     resetFormAdd(addPopup);
//   };
// };



// // функции открытия попапа
// function popupOpened(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener('keydown', handleEscDown);
//   popup.addEventListener('click', handleOverlayClick);
// };




// // функция открытия попапа с карточкой
// function handlePreviewPicture(cardData) {
//   imagePopupTitle.textContent = cardData.name;
//   imagePopupPicture.src = cardData.link;
//   popupOpened(imagePopup);
// };