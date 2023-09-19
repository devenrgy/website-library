export default function stats({ visits, purchases }) {
  const visitsCount = document.querySelectorAll('.stats__visits')
  const purchasesCount = document.querySelectorAll('.stats__purchases')
  const length = Object.keys(purchases).reduce((acc, key) => acc + purchases[key].length, 0)

  visitsCount.forEach(i => i.textContent = visits)
  purchasesCount.forEach(i => i.textContent = String(length))
}