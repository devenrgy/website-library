import LocalStorage from './LocalStorage'

export default function LoginPopup(auth) {
  const user = LocalStorage.load('user')
  if (auth) {
    return `<p class="login-popup__text ${user ? 'login-popup__text--small' : ''}">${user ? user.cardNum.toUpperCase() : 'Profile'}</p>
          <button class="login-popup__btn" type="button" data-form="profile">My profile</button>
          <button class="login-popup__btn" type="button" data-form="logout">Log Out</button>`
  } else {
    return `<p class="login-popup__text">Profile</p>
    <button class="login-popup__btn" type="button" data-form="login">Log In</button>
    <button class="login-popup__btn" type="button" data-form="registration">Register</button>`
  }
}
