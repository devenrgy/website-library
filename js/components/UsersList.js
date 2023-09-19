import User from './User.js'

export default class UsersList {

  constructor(users = []) {
    this.listUsers = users.map(user => new User(user))
  }

  addUser(user) {
    this.listUsers.push(user)
  }

  find(user) {
    return this.listUsers.find(u => u.email === user.email.toLowerCase() || u.cardNum === user.email.toLowerCase())
  }

  update(user) {
    this.listUsers = [...this.listUsers.filter(u => u.email !== user.email), user]
  }

  stats(user) {
    const [firstName, secondName] = user.username.toLowerCase().split(' ')
    return this.listUsers.find(u => (secondName ? u.firstName === firstName && u.lastName === secondName : firstName === u.firstName || firstName === u.lastName) && u.cardNum === user.cardNum.toLowerCase())
  }
}