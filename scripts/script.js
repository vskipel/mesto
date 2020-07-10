let popup = document.querySelector('.popup');
let main = document.querySelector('.main');
let profile = main.querySelector('.profile');
let editButton = profile.querySelector('.edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let profileInfo = profile.querySelector('.profile-info');
let profileInfoPerson = profileInfo.querySelector('.profile-info__person');
let profileInfoTitle = profileInfoPerson.querySelector('.profile-info__title');
let profileInfoSubtitle = profileInfoPerson.querySelector('.profile-info__subtitle');
let popupContainer = popup.querySelector('.popup__container');

// выбираем текст из полей ввода
let profileCopyName = profileInfoPerson.querySelector('.profile-info__title').textContent;
let profileCopyJob = profileInfoPerson.querySelector('.profile-info__subtitle').textContent;
let popupInputName = popupContainer.querySelector('.popup__input-name');
let popupInputJob = popupContainer.querySelector('.popup__input-job');

// открытие и закрытие попапа
function togglePopup() {
  popup.classList.toggle('popup_opened');

  // ставим value для полей ввода
  popupInputName.setAttribute('value', profileCopyName);
  popupInputJob.setAttribute('value', profileCopyJob);
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

// записываем значения на страницу

let saveButton = document.querySelector('.popup__save-button');

function saveInf() {
  profileInfoTitle.textContent = popupInputName.value;
  profileInfoSubtitle.textContent = popupInputJob.value;
  togglePopup();
}
document.querySelector('.popup__form').addEventListener('submit', (event) => {
  event.preventDefault()
  saveInf();
});