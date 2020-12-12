export class UserInfo {
  constructor(userName, userInfo, api) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userInfo.textContent
    }
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userInfo.textContent = job;
  }
}