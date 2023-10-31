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

export const convertISODateToYYYYMMDD = (isoDateString: string) => {
  const date = new Date(isoDateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
