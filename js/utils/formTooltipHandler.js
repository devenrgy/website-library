let timeout

export default function formTooltipHandler(form, text, seconds) {
  const helper = form.querySelector('.auth__helper')
  clearTimeout(timeout)

  helper.textContent = text
  helper.classList.add('auth__helper--active')

  timeout = setTimeout(() => {
    helper.classList.remove('auth__helper--active')
  }, seconds * 1000)
}