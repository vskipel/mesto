export class UserInfo  {
	constructor(userName, userInfo) {
    this._userName = userName;
    this._userInfo = userInfo;
	}
  getUserInfo() {
    const formEditName = document.forms.edit.elements.name;
    const formEditJob = document.forms.edit.elements.job;
    const formName = document.querySelector(this._userName);
    const formJob = document.querySelector(this._userInfo);

    formEditName.value = formName.textContent;
    formEditJob.value = formJob.textContent;

  }

  setUserInfo(evt) {
    evt.preventDefault();
    const formEditName = document.forms.edit.elements.name;
    const formEditJob = document.forms.edit.elements.job;
    const formName = document.querySelector(this._userName);
    const formJob = document.querySelector(this._userInfo);

    formName.textContent = formEditName.value;
    formJob.textContent = formEditJob.value;

  }

}