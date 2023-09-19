import LocalStorage from './LocalStorage.js'

export default function CreateBookCard(key, { staff, titleBook, author, text, path, id }) {
  const user = LocalStorage.load('user')
  const isPurchase = user?.purchases[key]?.some(t => t.id === id)

  return `<li class="favorites__item">
            <p class="favorites__staff">${staff}</p>
            <h4 class="favorites__subtitle"><span class="favorites__book-title">${titleBook}</span>By ${author}</h4>
            <p class="favorites__text">${text}</p>
            <button data-id="${id}" type="submit" class="favorites__btn btn ${isPurchase ? 'btn--accent' : ''}" ${isPurchase ? 'disabled' : ''} type="button">${isPurchase ? 'Own' : 'Buy'}</button>
            <img class="favorites__img" width="200" height="300" src="${path}"alt="${titleBook} ${author}" title="${titleBook}">
          </li>`
}
