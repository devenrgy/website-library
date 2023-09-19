export default function createHtmlElement(tagName, className) {
  const tag = document.createElement(tagName)
  tag.classList.add(className)
  return tag
}
