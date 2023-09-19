export default class Slider {
  constructor(slider) {
    this.gallery = slider.querySelector('.slider__gallery')
    this.imagesLength = slider.querySelectorAll('.slider__gallery img').length
    this.arrows = slider.querySelectorAll('.slider__arrow')
    this.pagination = slider.querySelectorAll('.slider__btn')
    this.currentSlide = 0
  }

  init(evt) {
    if (evt.target.closest('button')?.dataset.arrow === 'left') {
      this.prevSlide()
    }

    if (evt.target.closest('button')?.dataset.arrow === 'right') {
      this.nextSlide()
    }

    if (evt.target.classList.contains('slider__btn')) {
      this.togglePagination(evt)
    }

    this.arrowInteractivityToggle()
    this.paginationSynchronization()
  }

  paginationSynchronization() {
    this.pagination.forEach((el, i) => {
      el.classList.remove('slider__btn--active')
      if (this.currentSlide === i) {
        el.classList.add('slider__btn--active')
      }
    })
  }

  togglePagination(evt) {
    this.currentSlide = +evt.target.dataset.slide
    this.moveSlide(this.currentSlide)
  }

  moveSlide(numSlide) {
    this.gallery.style.transform = `translateX(${numSlide * -475}px)`
  }

  nextSlide() {
    if (this.currentSlide === this.imagesLength - 1) return
    this.currentSlide++
    this.moveSlide(this.currentSlide)
  }

  prevSlide() {
    if (this.currentSlide === 0) return
    this.currentSlide--
    this.moveSlide(this.currentSlide)
  }

  arrowInteractivityToggle() {
    this.arrows.forEach((arrow) => {
      if (this.currentSlide > 0 && this.currentSlide < this.imagesLength - 1) {
        arrow.classList.remove('slider__arrow--disabled')
      }

      if (this.currentSlide === 0) {
        this.arrows[0].classList.add('slider__arrow--disabled')
        this.arrows[1].classList.remove('slider__arrow--disabled')
      }

      if (this.currentSlide === this.imagesLength - 1) {
        this.arrows[1].classList.add('slider__arrow--disabled')
        this.arrows[0].classList.remove('slider__arrow--disabled')
      }
    })
  }
}