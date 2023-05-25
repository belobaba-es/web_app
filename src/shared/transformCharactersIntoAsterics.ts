export default (str: string) => {
  const start = str.slice(0, 4)
  const end = str.slice(-4)
  const middle = str.slice(4, -4).replace(/\w/g, '*')

  return start + middle + end
}
