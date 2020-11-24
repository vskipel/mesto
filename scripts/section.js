export class Section {
    constructor({
      cardData,
      renderer
    }, sectionCards) {
      this._cardData = cardData;
      this._renderer = renderer;
      this._sectionCards = sectionCards;
    }

    renderItems {
      this._cardData.forEach(item => this._renderer(item));

    }

  }
