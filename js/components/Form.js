export default class Form {
  constructor(authID) {
    this.authPopup = authID
    this.isOpen = false
  }

  open() {
    this.isOpen = true
    this.authPopup.classList.add(
      `${this.authPopup.classList[0]}--active`,
      'active',
    )
    return this.isOpen
  }

  close() {
    this.isOpen = false
    this.authPopup.classList.remove(
      `${this.authPopup.classList[0]}--active`,
      'active',
    )
    return this.isOpen
  }
}
