function showError(formElement, input, errorClass) {
  const errorElement = formElement.querySelector(`#${input.name}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(errorClass);
};

function hideError(formElement, input, errorClass) {
  const errorElement = formElement.querySelector(`#${input.name}-error`);
  input.classList.remove(errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, input, errorClass) {
  if (input.checkValidity()) {
    hideError(formElement, input, errorClass);
  } else {
    showError(formElement, input, errorClass);
  }
};

function toggleButtonState(formElement, buttonElement, inactiveButtonClass) {
  if (formElement.checkValidity()) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
};

function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, ...rest}) {
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(formElement, evt.target, errorClass);
      toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    });
    toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  });
  
}

// включаем валидацию всех форм
function enableValidation({
  formSelector, ...rest
}) {
  // делаем массив из всех форм на странице
  const formElements = Array.from(document.querySelectorAll(formSelector));
  // перебираем формы, чтобы на каждый сабмит навесить обработчик
  formElements.forEach(formElement => {
    // обработчик сабмита
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
}

