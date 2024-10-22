export const getSeparateName = (fullName: string): { firstName: string; lastName: string } => {
  const nameParts = fullName.split(' ')

  if (nameParts.length === 2) {
    return { firstName: nameParts[0], lastName: nameParts[1] }
  }

  if (nameParts.length > 3) {
    return { firstName: nameParts.slice(0, 2).join(' '), lastName: nameParts.slice(2).join(' ') }
  }

  return { firstName: nameParts[0], lastName: nameParts.slice(1).join(' ') }
}
