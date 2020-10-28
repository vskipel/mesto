// объявляем константы
// темплейт
const templateCard = document.querySelector(".template-card").content.querySelector(".card");
const sectionCards = document.querySelector(".cards");
const popup = document.querySelector(".popup");

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
const nameInput = document.querySelector(".popup__item-name");
const jobInput = document.querySelector(".popup__item-job");
const placeNameInput = document.querySelector(".popup__item-place");
const linkPlaceInput = document.querySelector(".popup__item-link");
const profileName = document.querySelector(".profile-info__title");
const profileJob = document.querySelector(".profile-info__subtitle");


// достаем значения форм
const formEdit = document.forms.edit;
const formEditName = formEdit.elements.name;
const formEditJob = formEdit.elements.job;

const formAdd = document.forms.add;
const formAddPlaceInput = formAdd.elements.place;
const formAddLinkInput = formAdd.elements.link;

const editPopupSaveBtn = editPopup.querySelector(".popup__save-button");


function handleEscDown(evt) {
  console.log(evt.key);
  const openedPopup = document.querySelector(".popup_opened");

  if (evt.key === "Escape") {
    popupClosed(openedPopup);
    console.log(openedPopup);
  };
};

function handleOverlayClick(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === evt.currentTarget) {
        popupClosed(openedPopup);
      };
};




// функции открытия и закрытия попапа
function popupOpened(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handleEscDown);
  popup.addEventListener('click', handleOverlayClick);

  // // закрываем попап кликом на Esc
  // document.addEventListener('keydown', (evt) => {
  //   if ((evt.key === "Escape")) {
  //     popupClosed(popup);
  //   }
  // });

  // // закрываем попап кликом на оверлей
  // popup.addEventListener('click', (evt) => {
  //   if (evt.target === evt.currentTarget) {
  //     popupClosed(popup);
  //   };
  // });

};

// включаем валидацию 
enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'error',
  errorClass: 'popup__item_invalid',
});

function popupClosed(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleEscDown);
  document.removeEventListener('click', handleOverlayClick);
}

// вывод в полях попапа значений со страницы
function formSubmitHandlerEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = formEditName.value;
  profileJob.textContent = formEditJob.value;
  popupClosed(editPopup, );
}

function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  renderCards({
    name: formAddPlaceInput.value,
    link: formAddLinkInput.value
  });
  popupClosed(addPopup);
  formAdd.reset();

}

//перебираем элементы массива
initialCards.forEach((cardData) => {
  renderCards(cardData);
});

// вставляем карточки в верстку
function renderCards(cardData) {
  sectionCards.prepend(getCard(cardData));
};

// создаем карточку
function getCard(cardData) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__button-like");
  const cardDeleteBtn = cardElement.querySelector(".card__button-delete");

  cardLikeBtn.addEventListener("click", handleLikeCard);
  cardDeleteBtn.addEventListener("click", handleDeleteCard);
  cardImg.addEventListener("click", () => handlePreviewPicture(cardData));

  cardTitle.textContent = cardData.name;
  cardImg.src = cardData.link;

  return cardElement;
};

// функция лайка карточки
function handleLikeCard(evt) {
  evt.target.classList.toggle("card__button-like_active")
};

// функция удаления карточки
function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
};

// функция открытия попапа с карточкой
function handlePreviewPicture(cardData) {
  imagePopupTitle.textContent = cardData.name;
  imagePopupPicture.src = cardData.link;
  popupOpened(imagePopup);
};

// открываем попап профиля
editPopupOpen.addEventListener("click", () => {
  formEditName.value = profileName.textContent;
  formEditJob.value = profileJob.textContent;
  // проверяем на валидность после копирования значений
  // чтобы сделать кнопку сабмита активной
  toggleButtonState(formEdit, editPopupSaveBtn);
  popupOpened(editPopup);
});

// отслеживаем действия пользователя
addPopupOpen.addEventListener("click", () => popupOpened(addPopup));
editPopupClose.addEventListener("click", () => popupClosed(editPopup));
addPopupClose.addEventListener("click", () => popupClosed(addPopup));
imagePopupClose.addEventListener("click", () => popupClosed(imagePopup));
formEdit.addEventListener("submit", formSubmitHandlerEditProfile);
formAdd.addEventListener("submit", formSubmitHandlerAddCard);



const allPopups = Array.from(document.querySelectorAll('.popup'));
// // закрываем попап по клику на esc
// document.addEventListener('keydown', (evt) => {
//   if (evt.key === "Escape") {
//     allPopups.forEach((popUp) => {
//       popupClosed(popUp);
//     });
//   };
// });


// function closePopupsOnClick(evt) {
//   allPopups.forEach((popUpTarget) => {
//     popUpTarget.addEventListener('click', (evt) => {
//       if (evt.target === evt.currentTarget) {
//         popupClosed(popUpTarget);
//       };
//     });
//   });
// };
// closePopupsOnClick()