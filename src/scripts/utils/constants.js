// объявляем константы
// темплейт
const containerSelector = '.cards';

// попапы 
const editPopup = document.querySelector(".popup_type_edit-profile");
const addPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image");
const updatePopup = document.querySelector(".popup_type_update-avatar");
const confirmPopup = document.querySelector(".popup_type_confirm");
const avatarPopup = document.querySelector(".popup_type_update-avatar");



// открытие попапов на главной
const editPopupOpen = document.querySelector(".edit-button");
const addPopupOpen = document.querySelector(".add-button");
const editAvatarPopupOpen = document.querySelector(".profile__avatar-edit");

const cardItemTemplateSelector = '.template-card';

// константы форм
const formEdit = document.forms.edit;
const formAdd = document.forms.add;
const formUpdateAvatar = document.forms.avatar;

// кнопка эйскейп
const escButton = "Escape";



const templateCard = document.querySelector(".template-card");
const deleteButton = templateCard.querySelector(".card__button-delete");

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
  updatePopup,
  confirmPopup,
  deleteButton,
  avatarPopup,
  editAvatarPopupOpen,
  formUpdateAvatar
}