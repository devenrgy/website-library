export default function userAvatar({ firstName, lastName }) {
  const loginButtonID = document.getElementById('loginButton')
  loginButtonID.innerHTML = `<p class="login-button__text" title="${firstName[0].toUpperCase() + firstName.slice(1)} ${lastName[0].toUpperCase() + lastName.slice(1)}">${firstName[0]}${lastName[0]}</p>`
}