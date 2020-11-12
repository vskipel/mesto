export class FormValidator {
  constructor(form, validationParameters) {
    this._form = form;
    this._formSelector = validationParameters.formSelector;
    this._inputSelector = validationParameters.inputSelector;
    this._submitButtonSelector = validationParameters.submitButtonSelector;
    this._errorClass = validationParameters.errorClass;
    this._inactiveButtonClass = validationParameters.inactiveButtonClass;
  }

  // выводим ошибку
  _showError = (input) => {
    this._errorElement = this._form.querySelector(`#${input.name}-error`);
    this._errorElement.textContent = input.validationMessage;
    input.classList.add(this._errorClass);
  }

  // скрываем ошибку
  _hideError = (input) => {
    this._errorElement = this._form.querySelector(`#${input.name}-error`);
    input.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  // проверяем валидность инпута
  _checkInputValidity = (input) => {
    if (input.checkValidity()) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }
  // изменение состояния кнопки сабмита
  _toggleButtonState = () => {
    if (this._form.checkValidity()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  // ставим слушатели
  _setEventListeners = () => {
    // делаем массив из инпутов в форме
    this._inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));
    // выбираем кнопку сабмита
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputElements.forEach((input) => {
      // устанавливаем слушатель на инпут
      input.addEventListener('input', (evt) => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._buttonElement);
      });
      this._toggleButtonState(this._buttonElement);
    })
  };
  // публичный метод для включения валидации
  enableValidation() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    })
    this._setEventListeners(this._form);
  }
}