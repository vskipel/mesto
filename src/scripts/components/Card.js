export class Card {
  constructor({
    data,
    handleCardClick,
    handleLikeClick,
    handleRemoveClick,
    renderDeleteButton,
    likeButtonState,
    handleDeleteIconClick,

  }, cardItemTemplateSelector) {
    this._cardData = data;
    this._templateCard = document.querySelector(cardItemTemplateSelector).content.querySelector(".card");
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
    this._renderDeleteButton = renderDeleteButton;
    this._likeButtonState = likeButtonState;
    this._handleDeleteIconClick = handleDeleteIconClick;

  }

  _deletePopup() {
    this._cardElement.remove();
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _like() {
    this._handleLikeClick(this._cardData, this._cardElement);
  }

  _removeDeleteButton() {
    // убираем кнопку удаления с чужих карточек
    this._deleteButton = this._cardElement.querySelector(".card__button-delete")
    this._renderDeleteButton(this._deleteButton)
  }

  _removeLike() {
    this._likeButton.classList.remove("card__button-like_active");
    this._handleRemoveClick(this._cardData);
  }

  renderCard() {
    // копируем разметку карточки
    this._cardElement = this._templateCard.cloneNode(true);

    // добавляем название места
    this._cardElement.querySelector(".card__title").textContent = this._cardData.name;

    // добавляем картинку
    this._cardImg = this._cardElement.querySelector(".card__image");
    this._cardImg.src = this._cardData.link;
    this._cardImg.addEventListener('click', (evt) => this._handleCardClick(this._cardData));

    // определим массив лайков карточки
    this._likesArr = this._cardData.likes;

    // выбираем кнопку лайка
    this._likeButton = this._cardElement.querySelector(".card__button-like");
    this._likeButtonState(this._cardData, this._likeButton, this._cardElement)

    // // добавляем слушатель и вызываем в коллбеке функцию на кнопку лайка
    this._likeButton.addEventListener('click', () => this._like())

    // рендерим кнопку удаления только на своих карточках
    this._removeDeleteButton();

    // слушатель удаления карточки
    this._deleteButton.addEventListener('click', () => this._handleDeleteIconClick(this._cardData));

    return this._cardElement;
  }

}