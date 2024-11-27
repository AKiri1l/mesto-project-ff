export function getUser() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-27/users/me', {
        headers: {
            authorization: '92d2f903-d8d2-44db-bb90-754216fea381',
            "Content-Type": "application/json"
        }
    })
    .then(res => {
      if(res.ok){
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-27/cards', {
        headers: {
            authorization: '92d2f903-d8d2-44db-bb90-754216fea381',
            "Content-Type": "application/json"
        }
    })
    .then(res => {
      if(res.ok){
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function updateProfile(name, description) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-27/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '92d2f903-d8d2-44db-bb90-754216fea381',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: description
        })
      })
      .then(res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function setCard(cardName, cardLink) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-27/cards', {
        method: 'POST',
        headers: {
          authorization: '92d2f903-d8d2-44db-bb90-754216fea381',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      .then(res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function deleteCard(cardId){
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-27/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '92d2f903-d8d2-44db-bb90-754216fea381',
      'Content-Type': 'application/json'
    }
  })
}

export function setLike(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '92d2f903-d8d2-44db-bb90-754216fea381',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})
}

export function deleteLike(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '92d2f903-d8d2-44db-bb90-754216fea381',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})
}

export function updateAvatar(avatar) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-27/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '92d2f903-d8d2-44db-bb90-754216fea381',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(res => {
    if(res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})
}