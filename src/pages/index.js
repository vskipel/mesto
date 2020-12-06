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
  Api
} from '../scripts/components/api.js';


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
  formAdd,
  updatePopup,
  confirmPopup,
  deleteButton

} from '../scripts/utils/constants.js';

import '../pages/index.css'
import {
  Popup
} from '../scripts/components/Popup.js';





// // вставляем данные с сервера в данные профиля
// function setProfileInfo() {
//   fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
//       headers: {
//         authorization: 'e9b15767-4b50-4f24-9b84-b0128a0d1268'
//       }
//     })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       document.querySelector('.profile__avatar').src = data.avatar;
//       document.querySelector('.profile-info__title').textContent = data.name;
//       document.querySelector('.profile-info__subtitle').textContent = data.about;
//     })
// }
// setProfileInfo();


// создаем класс АПИ для получения данных профиля
const apiProfile = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-18/users/me",
  headers: {
    "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268"
  }
})

// устанавливаем данные профиля
const setProfileInfo = apiProfile.getProfileInfo();
setProfileInfo.then((data) => {
  document.querySelector('.profile__avatar').src = data.avatar;
  document.querySelector('.profile__avatar').alt = data.name;
  document.querySelector('.profile-info__title').textContent = data.name;
  document.querySelector('.profile-info__subtitle').textContent = data.about;
})








// создаем класс для обработки попапа профиля 
const formEditProfile = new UserInfo('.profile-info__title', '.profile-info__subtitle');

const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: editPopup,
  handleFormSubmit: (item) => {
    // создаем копию класса АПИ для изменения данных профиля
    const updateProfile = new Api({
      url: "https://mesto.nomoreparties.co/v1/cohort-18/users/me",
      headers: {
        "method": 'PATCH',
        "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: item.name,
        about: item.job
      })
    })
    updateProfile.setProfileInfo();
    formEditProfile.setUserInfo(item.name, item.job);
  }
});

popupWithFormEditProfile.setEventListeners();

// функция рендера карточки для создания карточек из массива и формы
const cardRenderer = (item) => {
  const card = new Card(item, cardItemTemplateSelector,
    (item) => {
      openImagePopupHandler(item)
    }
  );
  const cardElement = card.renderCard();
  cardList.setItem(cardElement);
}

// создаем класс добавления карточки
const popupWithFormAddCard = new PopupWithForm({
  popupSelector: addPopup,
  handleFormSubmit: (item) => {
    const addCard = new Api({
      url: "https://mesto.nomoreparties.co/v1/cohort-18/cards",
      headers: {
        "method": 'POST',
        "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
        likes: [10]
      })
    })
    addCard.addCard(item)
    
    cardRenderer(item)
  }
});


popupWithFormAddCard.setEventListeners();
addPopupOpen.addEventListener('click', () => {
  formAddValidation.toggleButtonState();
  popupWithFormAddCard.open();

})


// рендерим карточки и вставляем в разметку классом Section
const cardList = new Section(containerSelector);

const apiCards = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-18/cards",
  headers: {
    "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268"
  }
})


// добавляем карточки с сервера
const cards = apiCards.getInitialCards();
cards.then((data) => {
  data.forEach((item) => {
    const card = new Card(item, cardItemTemplateSelector,
      (item) => {
        openImagePopupHandler(item)
      }, apiCards
    )
    cardList.setItem(card.renderCard());
  })
})






// function getCards() {
//   fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
//       headers: {
//         authorization: 'e9b15767-4b50-4f24-9b84-b0128a0d1268'
//       }
//     })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       const newData = Array.from(data);
//       return newData;
//     })

// }

// getCards()
// console.log(getCards())



//включаем валидацию формы изменения профиля
const formEditValidation = new FormValidator(formEdit, validationParameters);
formEditValidation.enableValidation();

// включаем валидацию формы добавления карточки
const formAddValidation = new FormValidator(formAdd, validationParameters);
formAddValidation.enableValidation();




const imagePopupOpen = new PopupWithImage(imagePopup);
imagePopupOpen.setEventListeners();

// функция открытия карточки с попапом картинки
const openImagePopupHandler = (item) => {
  imagePopupOpen.open(item);
}











// открываем попап профиля
editPopupOpen.addEventListener("click", () => {
  formEditProfile.getUserInfo();
  document.forms.edit.name.value = formEditProfile.getUserInfo().name;
  document.forms.edit.job.value = formEditProfile.getUserInfo().job;
  formEditValidation.toggleButtonState();
  popupWithFormEditProfile.open();
});

// // рендерим карточки и вставляем в разметку классом Section
// const cardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     cardRenderer(item)
//   },
// },
// containerSelector)
// cardList.renderItems();