import showExceptionError from './showExceptionError'
import showMessageArray from './showMessageArray'

export const processException = (toast: any, t: Function, data: any) => {
  if (data.response.data) {
    if (data.response.data.message) {
      showExceptionError(toast, 'error', t('somethingWentWrong'), data.response.data.message, 4000)
      return
    }
    showMessageArray(toast, data.response.data)
    return
  }

  if (data.data?.warning) {
    data.data.warning.forEach((element: any) => {
      showExceptionError(toast, 'error', t('somethingWentWrong'), `${element.field} ${element.message}`, 10000)
    })
    return
  }

  if (data.response.data.message) {
    showExceptionError(toast, 'error', t('somethingWentWrong'), data.response.data.message, 10000)
    return
  }

  if (data.response.data) {
    showMessageArray(toast, data.response.data)
    return
  }
}
