import createHtmlElement from './utils/createHtmlElement'

export default function updateProfile({ firstName, lastName, cardNum, purchases }) {
  const logo = document.querySelector('.profile__logo')
  const logoText = document.querySelector('.profile__text')
  const cardNumber = document.querySelector('.user-card__text[data-text="cardNumber"]')
  const rentedList = document.querySelector('.rented__list')
  const rentedText = document.querySelector('.rented__text')
  const purchasesKeys = Object.keys(purchases)

  if (!purchasesKeys.length) {
    rentedList.classList.add('rented__list--empty')
  } else {
    rentedList.classList.remove('rented__list--empty')
    rentedText.classList.add('rented__text--hide')
  }

  rentedList.innerHTML = ''
  for (const season in purchases) {
    purchases[season].forEach(book => {
      const li = createHtmlElement('li', 'rented__item')
      const span = createHtmlElement('span', 'rented__item-book')
      span.textContent = `${book.titleBook}, ${book.author}`
      li.insertAdjacentElement('afterbegin', span)
      rentedList.insertAdjacentElement('afterbegin', li)
    })
  }

  logo.textContent = firstName[0] + lastName[0]
  logoText.textContent = `${firstName} ${lastName}`
  cardNumber.textContent = `${cardNum}`
}