export default class Menu {
  constructor(buttonID, menuID) {
    this.buttonMenu = buttonID
    this.menu = menuID
    this.list = this.menu.querySelector(`.${this.menu.id}__list`)
    this.isOpen = false
  }

  toggle() {
    if (!this.menu.classList.contains('header__navigation--active')) {
      this.open()
    } else {
      this.close()
    }
    return this.isOpen
  }

  open() {
    this.isOpen = true
    this.menu.classList.add('header__navigation--active')
    this.list.classList.add('active')
    this.buttonMenu.innerHTML = `<svg class="menu-button__icon" width="32" height="32">
        <use xlink:href="icons/sprite.svg#menu-close"></use>
      </svg>`
    return this.isOpen
  }

  close() {
    this.isOpen = false
    this.menu.classList.remove('header__navigation--active')
    this.list.classList.remove('active')
    this.buttonMenu.innerHTML = `<svg class="menu-button__icon" width="45" height="20">
        <use xlink:href="icons/sprite.svg#menu"></use>
      </svg>`
    return this.isOpen
  }
}
