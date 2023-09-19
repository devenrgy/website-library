export default class Overlay {
  activeClasses
  overlay
  body
  scrollPosition

  getClasses() {
    this.activeClasses = document.querySelectorAll('.active')
    this.overlay = document.querySelector('.overlay')
    this.body = document.body
  }

  render() {
    this.getClasses()

    if (
      this.activeClasses.length > 0 &&
      !this.overlay.classList.contains('overlay--active')
    ) {
      this.scrollPosition = window.scrollY || document.documentElement.scrollTop
      this.body.style.overflow = 'hidden'
      this.body.scrollTop = this.scrollPosition
      this.overlay.classList.add('overlay--active')
    }

    if (
      this.activeClasses.length < 1 &&
      this.overlay.classList.contains('overlay--active')
    ) {
      this.body.removeAttribute('style')
      window.scrollTo({ top: this.scrollPosition, behavior: 'instant' })
      this.overlay.classList.remove('overlay--active')
    }
  }
}
