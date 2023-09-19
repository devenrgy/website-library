export default function updateLibraryInfo(user) {
  const libraryInfo = document.querySelector('.library__info')
  const libraryTitle = libraryInfo.querySelector('.library__title--second')
  const libraryText = libraryInfo.querySelector('.library__text')
  const libraryBtns = libraryInfo.querySelectorAll('.library__auth-btn')

  if (user) {
    libraryTitle.textContent = 'Visit your profile'
    libraryText.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.'
    libraryBtns[0].style.display = 'none'
    libraryBtns[1].textContent = 'Profile'
    libraryBtns[1].setAttribute('data-form', 'profile')
  }
}