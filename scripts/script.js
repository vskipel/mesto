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

const editForm = editPopup.querySelector(".form");
const addCardForm = addPopup.querySelector(".form");

// карточки по-умолчанию
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// объявляем переменные

let nameInput = document.querySelector(".popup__item-name");
let jobInput = document.querySelector(".popup__item-job");
let placeNameInput = document.querySelector(".popup__item-place");
let linkPlaceInput = document.querySelector(".popup__item-link");
let profileName = document.querySelector(".profile-info__title");
let profileJob = document.querySelector(".profile-info__subtitle");

// функции открытия и закрытия попапа

function popupOpened(popup) {
  popup.classList.add("popup_opened");
}

function popupClosed(popup) {
  popup.classList.remove("popup_opened");
}

// вывод в полях попапа значений со страницы

function formSubmitHandlerEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClosed(editPopup);
}

function formSubmitHandlerAddCard(evt) {
  evt.preventDefault();
  renderCards({
    name: placeNameInput.value,
    link: linkPlaceInput.value
  });
  popupClosed(addPopup);
}

//перебираем элементы массива
initialCards.forEach((cardData) => {
  renderCards(cardData);
});

function renderCards(cardData) {
  sectionCards.prepend(createCards(cardData));
};

function createCards(cardData) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__button-like");
  const cardDeleteBtn = cardElement.querySelector(".card__button-delete");

  cardLikeBtn.addEventListener("click", (evt) => evt.target.classList.toggle("card__button-like_active"));

  cardDeleteBtn.addEventListener("click", () => {
    cardDeleteBtn.closest(".card").remove();
  });

  cardImg.addEventListener("click", function () {
    imagePopupTitle.textContent = cardTitle.textContent;
    imagePopupPicture.src = cardImg.src;
    popupOpened(imagePopup);
  });

  cardTitle.textContent = cardData.name;
  cardImg.src = cardData.link;

  return cardElement;
};


editPopupOpen.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpened(editPopup);
});

// отслеживаем действия пользователя
addPopupOpen.addEventListener("click", () => popupOpened(addPopup));
editPopupClose.addEventListener("click", () => popupClosed(editPopup));
addPopupClose.addEventListener("click", () => popupClosed(addPopup));
imagePopupClose.addEventListener("click", () => popupClosed(imagePopup));
editForm.addEventListener("submit", formSubmitHandlerEditProfile);
addCardForm.addEventListener("submit", formSubmitHandlerAddCard);