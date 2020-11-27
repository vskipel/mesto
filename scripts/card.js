export class Card {
  constructor(cardData, cardItemTemplateSelector, handleCardClick) {
    this._cardData = cardData;
    this._templateCard = document.querySelector(cardItemTemplateSelector).content.querySelector(".card");
    this._handleCardClick = handleCardClick;
  }

  _delete() {
    this._cardElement.remove();
  }

  _like() {
    this._likeButton.classList.toggle("card__button-like_active");
  }


  renderCard(sectionCards) {
    // копируем разметку карточки
    this._cardElement = this._templateCard.cloneNode(true);

    // добавляем название места
    this._cardElement.querySelector(".card__title").textContent = this._cardData.name;

    // добавляем выбираем картинку
    this._cardImg = this._cardElement.querySelector(".card__image");
    this._cardImg.src = this._cardData.link;
    this._cardImg.addEventListener('click', (evt) => this._handleCardClick(this._cardData));

    // слушатель удаления карточки
    this._cardElement
      .querySelector(".card__button-delete")
      .addEventListener('click', this._delete.bind(this));
    // выбираем кнопку лайка
    this._likeButton = this._cardElement.querySelector(".card__button-like");
    // добавляем слушатель и вызываем в коллбеке функцию на кнопку лайка
    this._likeButton.addEventListener('click', this._like.bind(this));

    return this._cardElement;
  }

}