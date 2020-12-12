import {
  Card
} from '../scripts/components/Card.js';
import {
  FormValidator
} from '../scripts/components/FormValidator.js';
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
  confirmPopup,
  avatarPopup,
  editAvatarPopupOpen,
  formUpdateAvatar,
} from '../scripts/utils/constants.js';

import '../pages/index.css'

import {
  PopupWithSubmit
} from '../scripts/components/PopupWithSubmit.js';

//включаем валидацию формы изменения профиля
const formEditValidation = new FormValidator(formEdit, validationParameters);
formEditValidation.enableValidation();

// включаем валидацию формы добавления карточки
const formAddValidation = new FormValidator(formAdd, validationParameters);
formAddValidation.enableValidation();

// включаем валидацию формы обновления аватара
const formAvatarUpdateValidation = new FormValidator(formUpdateAvatar, validationParameters);
formAvatarUpdateValidation.enableValidation();

// функция для отображения процесса сохранения
function renderLoading(element, isLoading) {
  const text = isLoading ?
    "Сохранение..." :
    element !== addPopup ?
    "Сохранить" :
    "Создать";
  return (element.querySelector(".popup__save-button").textContent = text);
}

// функция сортировки массива карточек
function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}



// создаем класс для попапа картинки
const imagePopupOpen = new PopupWithImage(imagePopup);
imagePopupOpen.setEventListeners();

// функция открытия карточки с попапом картинки
const openImagePopupHandler = (item) => {
  imagePopupOpen.open(item);
}

// вставляем карточки в разметку классом Section
const cardList = new Section(containerSelector);


// создаем класс АПИ для получения данных 
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-18",
  token: "e9b15767-4b50-4f24-9b84-b0128a0d1268",
})

Promise.all([
    //в Promise.all передаем массив промисов которые нужно выполнить
    api.getProfileInfo(),
    api.getInitialCards(),
  ])
  .then(([userData, initialCards]) => {
    document.querySelector('.profile__avatar').src = userData.avatar;
    document.querySelector('.profile__avatar').alt = userData.name;
    document.querySelector('.profile-info__title').textContent = userData.name;
    document.querySelector('.profile-info__subtitle').textContent = userData.about;


    function cardRenderer(item) {
      {
        const isLiked = () => item.likes.find(person => (person._id === userData._id));

        const card = new Card({
            data: item,

            handleCardClick: (item) => {
              openImagePopupHandler(item)
            },

            handleLikeClick: (cardData, cardElement) => {

              if (isLiked()) {
                api.removeLikeCard(cardData._id)
                  .then((res) => {
                    cardElement.querySelector(".card__button-like").classList.remove("card__button-like_active");
                    cardElement.querySelector(".card__button-likes-counter").textContent = res.likes.length;
                    item.likes.pop(userData)
                  })
                  .catch((err) => 'Ошибка: ' + err)
              } else {
                api.likeCard(cardData._id)
                  .then((res) => {
                    cardElement.querySelector(".card__button-like").classList.add("card__button-like_active");
                    cardElement.querySelector(".card__button-likes-counter").textContent = res.likes.length;
                    cardData.likes.push(userData)
                  })
                  .catch((err) => 'Ошибка: ' + err)
              }
            },


            likeButtonState: (cardData, likeButton, cardElement) => {

              function likesCounter() {
                cardElement.querySelector(".card__button-likes-counter").textContent = cardData.likes.length;
              }

              if (isLiked()) {
                likesCounter()
                likeButton.classList.add("card__button-like_active");

              } else {
                likesCounter()
                likeButton.classList.remove("card__button-like_active");
              }
            },

            renderDeleteButton: (deleteButton) => {
              function compareRes(ids) {
                if (!ids) {
                  deleteButton.remove();
                }
              }
              return compareRes(userData._id === item.owner._id)
            },


            handleDeleteIconClick: (item) => {

              const submitPopup = new PopupWithSubmit(confirmPopup);

              submitPopup.setSubmitAction(() => {
                api.deleteCard(item._id)
                  .then(res => {
                    card.removeCard()
                    submitPopup.close()
                  })
                  .catch((err) => console.log("Ошибка: " + err))
              })
              submitPopup.setEventListeners()
              submitPopup.open()


            }
          },
          cardItemTemplateSelector);
        cardList.setItem(card.renderCard())
      }
    }


    // создаем класс обновления аватара
    const popupUpdateAvatar = new PopupWithForm({
      popupSelector: avatarPopup,
      handleFormSubmit: (value) => {
        renderLoading(avatarPopup, true)

        api.updateAvatar(value.link)
          .then((data) => {
            api.getProfileInfo()
            document.querySelector('.profile__avatar').src = data.avatar
          })
          .finally(() => {
            renderLoading(avatarPopup, false);
            popupUpdateAvatar.close();
          })
          .catch((err) => console.log("Ошибка: " + err))
      }
    });

    // попап обновления аватара
    popupUpdateAvatar.setEventListeners();
    editAvatarPopupOpen.addEventListener('click', () => {
      formAvatarUpdateValidation.toggleButtonState()
      popupUpdateAvatar.open();
    })

    // создаем класс для обработки попапа профиля 
    const formEditProfile = new UserInfo('.profile-info__title', '.profile-info__subtitle');

    // класс для получения данных из формы профиля
    const popupWithFormEditProfile = new PopupWithForm({
      popupSelector: editPopup,
      handleFormSubmit: (item) => {
        renderLoading(editPopup, true)

        api.setProfileInfo(item)
          .then(() => {
            popupWithFormEditProfile.close()
            renderLoading(editPopup, false)
          })
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
    // добавляем карточки с сервера
    console.log(initialCards)


    // сортируем карточки по дате создания
    const initialCardsSorted = initialCards.sort(byField('createdAt'));
    initialCardsSorted.forEach((item) =>
      cardRenderer(item))


    // создаем класс добавления карточки
    const popupWithFormAddCard = new PopupWithForm({
      popupSelector: addPopup,
      handleFormSubmit: (item) => {
        renderLoading(addPopup, true)

        api.addCard(item)
          .then((res) => {
            cardRenderer(res)
            api.getInitialCards()
            popupWithFormAddCard.close();
            renderLoading(addPopup, false)
          })
          .catch((err) => console.log("Ошибка: " + err))
      }
    });

    // попап добавления карточки
    popupWithFormAddCard.setEventListeners();
    addPopupOpen.addEventListener('click', () => {
      formAddValidation.toggleButtonState();
      popupWithFormAddCard.open();
    })


  })
  .catch((err) => {
    // попадаем сюда если один из промисов завершится ошибкой
    console.log(err);
  });