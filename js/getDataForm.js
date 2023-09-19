export default function getDataForm(form) {
  return Object.fromEntries(new FormData(form))
}