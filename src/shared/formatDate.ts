export const formatDate = (date?: Date) => {
  if (!date) {
    return ''
  }

  const myDate = new Date(date)
  return myDate.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}
