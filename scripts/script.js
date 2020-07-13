// задаем переменные
// попапам
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let popupContainer = popup.querySelector('.popup__container');
let popupForm = popupContainer.querySelector('.popup__form');

// профиль пользователя
let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let editButton = profileInfo.querySelector('.edit-button');
let profileName = profileInfo.querySelector('.profile-info__title');
let profileJob = profileInfo.querySelector('.profile-info__subtitle');

// инпуты
let popupInputName = popupForm.querySelector('.popup__input_name');
let popupInputJob = popupForm.querySelector('.popup__input_job');

// форма

let formElement = popup.querySelector ('.popup__form');
let saveButton = popup.querySelector ('.popup__save-button');

// открытие попапа с копированием значений профиля
function openPopup() {
  popup.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
}

editButton.addEventListener('click', openPopup);

// закрытие попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);


// обработчик  формы

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);