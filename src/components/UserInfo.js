export default class UserInfo {
  constructor(userName, userDescription) {
    this._userName = document.querySelector(userName);
    this._userDescription = document.querySelector(userDescription);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent,
    }
    
  }

  setUserInfo(formName, formDescription) {
    this._userName.textContent = formName;
    this._userDescription.textContent = formDescription;
  }
}