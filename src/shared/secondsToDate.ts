export const secondsToDate = (seconds: number) => {
    const locale = localStorage.getItem('noba@lang')
    const date = new Date(seconds * 1000)
    return date.toLocaleString(locale!)
}