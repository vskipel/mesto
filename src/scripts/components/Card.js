export class Card {
  constructor(cardData, cardItemTemplateSelector, handleCardClick, api) {
    this._cardData = cardData;
    this._templateCard = document.querySelector(cardItemTemplateSelector).content.querySelector(".card");
    this._handleCardClick = handleCardClick;
  }

  _delete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _like() {
    this._likeButton.classList.toggle("card__button-like_active");
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

    // добавляем счетчик лайков 
    console.log(this._cardData.likes);
    this._cardElement.querySelector(".card__button-likes-counter").textContent = this._cardData.likes;

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