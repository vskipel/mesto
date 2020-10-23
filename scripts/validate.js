function showError(formElement, input) {
  const errorElement = formElement.querySelector(`#${input.name}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add('popup__item_invalid');
};

function hideError(formElement, input) {
  const errorElement = formElement.querySelector(`#${input.name}-error`);
  input.classList.remove('popup__item_invalid');
  errorElement.textContent = '';
};

function checkInputValidity(formElement, input) {
  if (input.checkValidity()) {
    hideError(formElement, input);
  } else {
    showError(formElement, input);
  }
};

function toggleButtonState(formElement, buttonElement) {
  if (formElement.checkValidity()) {
    buttonElement.classList.remove('popup__save-button_disabled');
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add('popup__save-button_disabled');
    buttonElement.disabled = true;
  }
};

function setEventListeners(formElement) {
  const inputElements = Array.from(formElement.querySelectorAll('.popup__item'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  inputElements.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(formElement, evt.target);
      toggleButtonState(formElement, buttonElement);
    });
  });
  toggleButtonState(formElement, buttonElement);
}

// включаем валидацию всех форм
function enableValidation({
  formSelector
}) {
  // делаем массив из всех форм на странице
  const formElements = Array.from(document.querySelectorAll(formSelector));
  // перебираем формы, чтобы на каждый сабмит навесить обработчик
  formElements.forEach(form => {
    // обработчик сабмита
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formAddPlaceInput.value = '';
      formAddLinkInput.value = '';
    });
    setEventListeners(form);
  });
}