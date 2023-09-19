export default class Login {
  constructor(loginPopupID) {
    this.name = loginPopupID
    this.isOpen = false
  }

  toggle() {
    if (!this.name.classList.contains('login-popup--active')) {
      this.open()
    } else {
      this.close()
    }
    return this.isOpen
  }

  open() {
    this.isOpen = true
    this.name.classList.add('login-popup--active', 'active')
    return this.isOpen
  }

  close() {
    this.isOpen = false
    this.name.classList.remove('login-popup--active', 'active')
    return this.isOpen
  }
}
