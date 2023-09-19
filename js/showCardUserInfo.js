export default function showCardUserInfo({ firstName, lastName, cardNum }) {
  const inputUsername = document.getElementById('libraryUsername')
  const inputCard = document.getElementById('libraryCardNumber')
  const btn = document.getElementById('libraryButton')
  const libraryStats = document.querySelector('.library__stats')
  const libraryTitle = document.querySelector('.library__title--first')

  libraryTitle.innerHTML = 'Your Library card'
  inputUsername.value = firstName + ' ' + lastName
  inputCard.value = cardNum
  inputUsername.disabled = true
  inputCard.disabled = true
  btn.classList.add('library__btn--hide')
  libraryStats.classList.add('library__stats--active')
}