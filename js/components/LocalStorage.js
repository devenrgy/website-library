export default class LocalStorage {
  static save(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  static load(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  static removeItem(key) {
    localStorage.removeItem(key)
  }
}