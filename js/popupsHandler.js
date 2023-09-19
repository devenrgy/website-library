export default function popupsHandler(popupsList, popup) {
  if (popup) {
    popupsList.forEach((p) => {
      if (!(p === popup)) {
        p.close()
      }
    })
  } else {
    popupsList.forEach((modal) => modal.close())
  }
}