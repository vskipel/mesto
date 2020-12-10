export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._body = config.body;

  }

  getInitialCards() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }

  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Произошла ошибка")
      }
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Произошла ошибка")
      }
    })
  }


  likeCard(id) {
    return fetch(`${this._url}${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Произошла ошибка")
      }
    })
  }

  removeLikeCard(id) {
    return fetch(`${this._url}${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Произошла ошибка")
      }
    })
  }

  updateAvatar(link) {
    return fetch(this._url, {
        method: "PATCH",
        headers: this._headers,
        body: this._body,
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
  }


  getProfileInfo() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }

    })
  }

  setProfileInfo() {
    return fetch(this._url, {
      method: "PATCH",
      headers: this._headers,
      body: this._body
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
  }
}