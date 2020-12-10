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
  if (isLoading) {
    return element.querySelector('.popup__save-button').textContent = "Сохранение...";
  } else {
    if (element !== addPopup) {
      return element.querySelector('.popup__save-button').textContent = "Сохранить";
    } else {
      return element.querySelector('.popup__save-button').textContent = "Создать";
    }
  }
}

// функция сортировки массива карточек
function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}


// создаем класс АПИ для получения данных профиля
const apiProfile = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-18/users/me",
  headers: {
    "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268"
  }
})

// создаем класс для попапа картинки
const imagePopupOpen = new PopupWithImage(imagePopup);
imagePopupOpen.setEventListeners();

// функция открытия карточки с попапом картинки
const openImagePopupHandler = (item) => {
  imagePopupOpen.open(item);
}

// рендерим карточки и вставляем в разметку классом Section
const cardList = new Section(containerSelector);



// получаем информацию для отображения в профиле
apiProfile.getProfileInfo()
  .then((data) => {
    document.querySelector('.profile__avatar').src = data.avatar;
    document.querySelector('.profile__avatar').alt = data.name;
    document.querySelector('.profile-info__title').textContent = data.name;
    document.querySelector('.profile-info__subtitle').textContent = data.about;

    const profileData = data;



    const apiCards = new Api({
      url: "https://mesto.nomoreparties.co/v1/cohort-18/cards",
      headers: {
        "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268"
      }
    })


    // создаем класс удаления карточки
    // const popupWithSubmitHandler = new PopupWithSubmit({
    //   popupSelector: confirmPopup,
    // });

    // функция рендера карточек

    function cardRenderer(item) {
      {


        const isLiked = () => item.likes.find(person => (person._id === profileData._id));

        const card = new Card({
            data: item,
            handleCardClick: (item) => {
              openImagePopupHandler(item)
            },
            handleLikeClick: (cardData, cardElement) => {
              const likeCard = new Api({
                url: "https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/",
                headers: {
                  "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268"
                }
              })

              if (isLiked()) {
                console.log('LIKE REMOVED')
                likeCard.removeLikeCard(cardData._id)
                  .then((cardElement.querySelector(".card__button-like").classList.remove("card__button-like_active")))
                  .then((res) => (cardElement.querySelector(".card__button-likes-counter").textContent = res.likes.length))
                  .then(item.likes.pop(profileData))


              } else {
                console.log('LIKED')
                likeCard.likeCard(cardData._id)
                  .then((cardElement.querySelector(".card__button-like").classList.add("card__button-like_active")))
                  .then((res) => (cardElement.querySelector(".card__button-likes-counter").textContent = res.likes.length))
                  .then(cardData.likes.push(profileData))
              }

            },


            likeButtonState: (cardData, likeButton, cardElement) => {

              function likesCounter() {
                cardElement.querySelector(".card__button-likes-counter").textContent = cardData.likes.length;
              }

              if (isLiked()) {
                console.log('я лайкнул')
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
              return compareRes(profileData._id === item.owner._id)
            },


            handleDeleteIconClick: (item) => {

              const submitPopup = new PopupWithSubmit(confirmPopup);              
              const deleteCard = new Api({
                url: "https://mesto.nomoreparties.co/v1/cohort-18/cards/",
                headers: {
                  "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268"
                }
              })
              
              submitPopup.setSubmitAction(() => {
                deleteCard.deleteCard(item._id)
                  .then(res => card.removeCard())
                  .catch(err => console.error(err))
              })
              submitPopup.setEventListeners()
              submitPopup.open()

            }
          },
          cardItemTemplateSelector)
        cardList.setItem(card.renderCard())
      }
    }


    // добавляем карточки с сервера
    const cards = apiCards.getInitialCards();
    cards.then((data) => {
        Promise.all(data.sort(byField('createdAt')))
          .then((data) => console.log(data))
          .then(data.forEach((item) =>
            cardRenderer(item)
          ))
      })
      .catch((err) => console.log("Ошибка при рендере карточек с сервера " + err))
      .then(() => {


        // создаем класс добавления карточки
        const popupWithFormAddCard = new PopupWithForm({
          popupSelector: addPopup,
          handleFormSubmit: (item) => {
            renderLoading(addPopup, true)
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
              })
            })
            addCard.addCard(item)
              .then((res) => cardRenderer(res))
              .then(apiCards.getInitialCards())
              .then(() => renderLoading(addPopup, false))

          }
        });


        // создаем класс обновления аватара
        const popupUpdateAvatar = new PopupWithForm({
          popupSelector: avatarPopup,
          handleFormSubmit: (value) => {
            renderLoading(avatarPopup, true)
            const updateAvatar = new Api({
              url: "https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar",
              headers: {
                "authorization": "e9b15767-4b50-4f24-9b84-b0128a0d1268",
                "content-type": "application/json"
              },
              body: JSON.stringify({
                avatar: value.link,
              }),
            })

            updateAvatar.updateAvatar(value.link)
              .then(apiProfile.getProfileInfo())
              .then((data) => document.querySelector('.profile__avatar').src = data.avatar)
              .finally(() => renderLoading(avatarPopup, false))
          }
        });


        // попап обновления аватара
        popupUpdateAvatar.setEventListeners();
        editAvatarPopupOpen.addEventListener('click', () => {
          formAvatarUpdateValidation.toggleButtonState()
          popupUpdateAvatar.open();
        })

        // попап добавления карточки
        popupWithFormAddCard.setEventListeners();
        addPopupOpen.addEventListener('click', () => {
          formAddValidation.toggleButtonState();
          popupWithFormAddCard.open();
        })

      }).then(() => {

        // создаем класс для обработки попапа профиля 
        const formEditProfile = new UserInfo('.profile-info__title', '.profile-info__subtitle');

        const popupWithFormEditProfile = new PopupWithForm({
          popupSelector: editPopup,
          handleFormSubmit: (item) => {
            renderLoading(editPopup, true)

            // создаем копию класса АПИ для изменения данных профиля
            const updateProfile =
              new Api({
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

            updateProfile.setProfileInfo(item)
              .then(() => renderLoading(editPopup, false))
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
      })

  }).catch((err) => "Ошибка в получении данных профиля " + console.log(err))