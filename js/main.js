import data from '../data/data.json'

import Slider from './components/Slider.js'
import Menu from './components/Menu.js'
import Login from './components/Login.js'
import Overlay from './components/Overlay.js'
import LoginPopup from './components/LoginPopup.js'
import Form from './components/Form.js'
import UsersList from './components/UsersList.js'
import LocalStorage from './components/LocalStorage.js'
import User from './components/User.js'
import CreateBookCard from './components/СreateBookCard.js'

import popupsHandler from './popupsHandler.js'
import userAvatar from './userAvatar.js'
import showCardUserInfo from './showCardUserInfo'
import stats from './stats.js'
import getDataForm from './getDataForm.js'
import updateProfile from './updateProfile.js'

import formTooltipHandler from './utils/formTooltipHandler.js'
import getRandomHex from './utils/getRandomHex.js'
import updateLibraryInfo from './updateLibraryInfo.js'

document.addEventListener('DOMContentLoaded', () => {
  /* Users */
  let user = LocalStorage.load('user') ? new User(LocalStorage.load('user')) : null
  let users = new UsersList(LocalStorage.load('users') ?? [])
  let tempStorage = []
  let key = 'winter'

  /* Slider */
  const sliderID = document.getElementById('slider')
  const slider = new Slider(sliderID)

  /* Menu */
  const menuButtonID = document.getElementById('menuButton')
  const menuID = document.getElementById('navigation')
  const menu = new Menu(menuButtonID, menuID)

  /* Buttons to close the popup menu */
  const authCloseFormBtns = document.querySelectorAll('.auth__close-btn')

  const toggleBtnsForm = document.querySelectorAll('.auth__toggle')

  /* All Popup Forms */
  const popupForms = document.querySelectorAll('.auth')

  /* Header */
  const header = document.getElementById('header')

  /* Login */
  const loginPopupID = document.getElementById('loginPopup')
  const loginButtonID = document.getElementById('loginButton')
  const login = new Login(loginPopupID)

  /* Overlay */
  const overlay = new Overlay()
  const overlayElement = document.getElementById('overlay')

  /* Registration */
  const registrationID = document.getElementById('registration')
  const registration = new Form(registrationID)

  /* Login Form */
  const loginFormID = document.getElementById('login')
  const loginForm = new Form(loginFormID)

  /* Library Buttons */
  const libraryButtons = document.querySelectorAll('.library__auth-btn')
  const libraryForm = document.getElementById('library-form')

  /* Card Buy Popup */
  const cardBuyID = document.getElementById('cardBuy')
  const cardBuyForm = new Form(cardBuyID)
  const cardInputs = document.querySelectorAll('.buy-card__input')
  const cardBtn = document.querySelector('.buy-card__btn')

  /* Profile */
  const profileID = document.getElementById('profile')
  const profilePopup = new Form(profileID)

  const btnCopy = document.querySelector('.user-card__btn')

  /* Favorites */
  const favoritesBooksList = document.getElementById('favoritesBooksList')
  const favoritesToggles = document.getElementById('favoritesToggles')
  const favoritesForm = document.getElementById('favoritesForm')

  let libraryCardCheckTimeout

  /* Popups List */
  const popupsList = [login, menu, registration, loginForm, cardBuyForm, profilePopup]

  /* Checking for click on the active element */
  function isActivePopup(evt) {
    return (evt?.target && !evt.target.closest('button')?.classList.contains('close-btn') && (evt.target.classList.contains('active') || (evt.target.closest('li') && !evt.target.closest('a')) || evt.target.closest('button')))
  }

  /************** Functions **************/

  /* Function for closing all popups */
  function closeAllPopups(evt) {
    /* Checking that the element is not the popup itself */
    if (evt) {
      if (isActivePopup(evt)) return
    }
    popupsHandler(popupsList)
    overlay.render()

    header.removeEventListener('click', closeAllPopups)
    loginPopupID.removeEventListener('click', formHandler)

    authCloseFormBtns.forEach(btn => btn.removeEventListener('click', closeAllPopups))
    popupForms.forEach(form => form.removeEventListener('submit', formDataHandler))
    toggleBtnsForm.forEach(btn => btn.removeEventListener('click', formHandler))
  }

  function formDataHandler(evt) {
    evt.preventDefault()
    clearTimeout(libraryCardCheckTimeout)

    const form = evt.target

    /* Processing data from the registration form */
    if (form.id === 'registration') {

      const newUser = new User({
        ...getDataForm(form),
        cardNum: Array.from({ length: 9 }, () => getRandomHex()).join(''),
      })

      if (users.find(newUser)) {
        formTooltipHandler(form, 'This user already exists', 3)
        return
      }

      user = newUser
      user.increaseVisits()
      users.addUser(user)
    }

    if (form.id === 'login') {
      const userAuth = getDataForm(form)


      if (Object.values(userAuth).some(inputValue => inputValue === '')) {
        formTooltipHandler(form, 'Please fill in all fields', 3)
        return
      }

      const userExists = users.find(userAuth)

      if (!userExists) {
        formTooltipHandler(form, 'This user is not registered', 3)
        return
      }

      if (userAuth.password !== userExists.password) {
        formTooltipHandler(form, 'Incorrect password', 3)
        return
      }

      user = userExists
      user.increaseVisits()
      users.update(user)
    }

    if (form.id === 'cardBuy') {
      const formData = getDataForm(form)
      user.buyCard(...tempStorage)
      user.isPassPurchased = true
      tempStorage = []
      users.update(user)
    }

    updateUser()

    LocalStorage.save('user', user)
    LocalStorage.save('users', users.listUsers)

    renderCard(key)
    form.reset()
    closeAllPopups()
  }

  /* Function to show the desired form on click */
  function formHandler(evt) {
    const name = evt.target?.dataset.form || evt.dataset.form

    if (name === 'logout') {
      LocalStorage.removeItem('user')
      location.reload()
      return
    }

    if (!name) return

    const currentForm = document.getElementById(`${name}`)
    const closeButtonForm = currentForm.querySelector(`.${currentForm.classList[0]}` + '__close-btn')
    const currentToggleButton = currentForm.querySelector('.auth__toggle')
    /* If there is such an element, then close the login menu and make the popup visible */
    if (currentForm) {
      closeAllPopups()

      currentForm.classList.add(`${currentForm.classList[0]}--active`, 'active')
      currentForm.addEventListener('submit', formDataHandler)

      if (currentToggleButton) {
        currentToggleButton.addEventListener('click', formHandler)
      }

      overlay.render()

      closeButtonForm.addEventListener('click', closeAllPopups)
    }
  }

  function updateFavoritesButtonsForm() {
    const buttons = document.querySelectorAll('.favorites__btn')

    buttons.forEach(btn => {
      if (user) {
        btn.setAttribute('data-form', 'cardBuy')
      } else {
        btn.setAttribute('data-form', 'login')
      }
    })
  }

  favoritesForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const { season } = getDataForm(evt.target)
    const buttonSubmit = evt.submitter
    const cardID = buttonSubmit.dataset.id
    const card = {}
    card[season] = data[season][cardID]

    tempStorage.push(card)
    updateFavoritesButtonsForm()

    if (!user?.isPassPurchased) {
      formHandler(buttonSubmit)
      return
    }

    user.buyCard(...tempStorage)
    tempStorage = []

    users.update(user)

    updateUser()

    LocalStorage.save('user', user)
    LocalStorage.save('users', users.listUsers)
    renderCard(key)
  })

  function updateUser() {
    updateProfile(user)
    stats(user)
    userAvatar(user)
    showCardUserInfo(user)
    updateLibraryInfo(user)
    updateFavoritesButtonsForm()
  }

  function filterBooksBySeason() {
    let timeout

    favoritesToggles.addEventListener('click', (evt) => {
      if (evt.target.closest('input')) {
        clearTimeout(timeout)

        timeout = setTimeout(async () => {
          if (evt.target.closest('input').id !== key) {
            key = evt.target.id
            ;[...favoritesBooksList.children].forEach((item) => {
              item.classList.remove('favorites__item--show')
            })

            await new Promise((resolve) => setTimeout(resolve, 300))

            favoritesBooksList.innerHTML = ''

            data[key].forEach((card) => {
              favoritesBooksList.innerHTML += CreateBookCard(key, card)
            })

            await new Promise((resolve) => setTimeout(resolve, 300))
            ;[...favoritesBooksList.children].forEach((item) => {
              item.classList.add('favorites__item--show')
            })
          }
        }, 600)
      }
    })
  }

  /************** Events **************/

  /* Library Buttons */
  libraryButtons.forEach(btn => btn.addEventListener('click', formHandler))

  /* Overlay */
  overlayElement.addEventListener('click', closeAllPopups)

  /* Favorites Top color change when scrolling */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        e.target.classList.toggle(
          'favorites__top--accent',
          e.boundingClientRect.top === -1,
        )
      })
    },
    { threshold: 1 },
  )
  observer.observe(document.querySelector('.favorites__top'))

  /* Slider */
  sliderID.addEventListener('click', (evt) => {
    slider.init(evt)
  })

  /* Menu */
  menuButtonID.addEventListener('click', (evt) => {
    evt.stopPropagation()

    /* If any other windows are open, close them */
    popupsHandler(popupsList, menu)

    /* Switching the visibility of the menu */
    menu.toggle()

    if (menu.isOpen) {
      header.addEventListener('click', closeAllPopups)
    }

    /* Overlay */
    overlay.render()
  })

  /* Login */
  loginButtonID.addEventListener('click', (evt) => {
    evt.stopPropagation()

    /* Registration verification */
    loginPopupID.innerHTML = LoginPopup(user)

    /* If any other windows are open, close them */
    popupsHandler(popupsList, login)

    login.toggle()

    if (login.isOpen) {
      header.addEventListener('click', closeAllPopups)
      loginPopupID.addEventListener('click', formHandler)
    }

    /* Overlay */
    overlay.render()
  })

  function renderCard(key = 'winter') {
    favoritesBooksList.innerHTML = ''
    data[key].forEach((card) => {
      favoritesBooksList.innerHTML += CreateBookCard(key, card)
    })

    ;[...favoritesBooksList.children].forEach((item) => {
      item.classList.add('favorites__item--show')
    })
  }


  function init() {

    renderCard()
    filterBooksBySeason()
    libraryCardCheck()
    user && userAvatar(user)
    user && showCardUserInfo(user)
    user && stats(user)
    user && updateProfile(user)
    user && updateLibraryInfo(user)
  }

  function libraryCardCheck() {
    libraryForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      const info = document.getElementById('libraryStats')
      const btn = document.getElementById('libraryButton')
      const form = evt.target
      const user = users.stats(getDataForm(form))

      if (user) {
        stats(user)
        btn.classList.add('library__btn--hide')
        info.classList.add('library__stats--active')
        form[0].disabled = true
        form[1].disabled = true
        libraryCardCheckTimeout = setTimeout(() => {
          btn.classList.remove('library__btn--hide')
          info.classList.remove('library__stats--active')
          form[0].disabled = false
          form[1].disabled = false
          form.reset()
        }, 1e4)
      }
    })
  }

  btnCopy.addEventListener('click', (evt) => {
    if (evt.target.closest('button')) {
      const copyText = document.querySelector('.user-card__text[data-text="cardNumber"]').textContent
      const copySuccess = document.querySelector('.user-card__copy')
      navigator.clipboard.writeText(copyText).then(res => {
        btnCopy.classList.add('user-card__btn--copied')
        copySuccess.classList.add('user-card__copy--show')
        setTimeout(() => {
          btnCopy.classList.remove('user-card__btn--copied')
          copySuccess.classList.remove('user-card__copy--show')
        }, 2000)
      })
    }
  })

  cardInputs.forEach(input => input.addEventListener('input', function (evt) {
    evt.preventDefault()
    if (this.name === 'bankCard' && this.value.length < 19) {
      this.value = this.value.split(' ').join('').replace(/(\d{4})(?=\d)/g, '$1 ')
    } else {
      this.value = this.value.slice(0, 19)
    }

    if (this.name === 'expCode' && this.value.length > 2) {
      this.value = this.value.slice(0, 2)
    }

    if (this.name === 'cvc' && this.value.length > 3) {
      this.value = this.value.slice(0, 3)
    }

    if (this.name === 'postalCode' && this.value.length > 5) {
      this.value = this.value.slice(0, 5)
    }

    if ([...cardInputs].every(input => input.value.length > 0)) {
      cardBtn.classList.remove('buy-card__btn--lock')
    } else {
      cardBtn.classList.add('buy-card__btn--lock')
    }
  }))

  init()
})
