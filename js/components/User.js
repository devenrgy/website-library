export default class User {
  firstName
  lastName
  password
  email
  visits
  purchases
  isPassPurchased

  constructor({ firstName, lastName, password, email, cardNum, visits = 0, purchases = {}, isPassPurchased = false }) {
    this.firstName = firstName.toLowerCase()
    this.lastName = lastName.toLowerCase()
    this.password = password
    this.email = email.toLowerCase()
    this.cardNum = cardNum.toLowerCase()
    this.visits = visits
    this.purchases = purchases
    this.isPassPurchased = isPassPurchased
  }

  increaseVisits() {
    this.visits++
  }

  buyCard(card) {
    const key = Object.keys(card)[0]
    if (!this.purchases[key]) {
      this.purchases[key] = []
    }
    this.purchases[key].push(card[key])
  }
}