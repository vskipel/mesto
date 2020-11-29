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

// константы форм
const formEdit = document.forms.edit;
const formAdd = document.forms.add;

// кнопка эйскейп
const escButton = "Escape";

// включаем валидацию 
const validationParameters = ({
  formSelector: '.form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'error',
  errorClass: 'popup__item_invalid',
});

export {
  containerSelector,
  editPopup,
  addPopup,
  imagePopup,
  editPopupOpen,
  addPopupOpen,
  cardItemTemplateSelector,
  validationParameters,
  escButton,
  formEdit,
  formAdd,
}