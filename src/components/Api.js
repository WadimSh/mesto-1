export default class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
}

_checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

getUserInfo() {
  return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
  .then(this._checkResponse);
}

getInitialCards() {
    return fetch(`${this.url}/cards`, {
        headers: this.headers,
      })
      .then(this._checkResponse);
}

patchUserInfo(item){
    return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            name: item.name,
            about: item.profile
          })
      })
      .then(this._checkResponse);
}

patchUserAvatar(item){
  return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
          avatar: item.avatar
        })
    })
    .then(this._checkResponse);
}

postNewCard(item) {
  return fetch(`${this.url}/cards`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({
      name: item.title,
      link: item.photo
    }),
  })
  .then(this._checkResponse);
}

deleteCard(id) {
  return fetch(`${this.url}/cards/${id}`, {
    method: 'DELETE',
    headers: this.headers
  })
  .then(this._checkResponse);
}

addLike(id) {
  return fetch(`${this.url}/cards/${id}/likes`, {
    method: 'PUT',
    headers: this.headers
  })
  .then(this._checkResponse);
}

deleteLike(id) {
  return fetch(`${this.url}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: this.headers
  })
  .then(this._checkResponse);
}

}