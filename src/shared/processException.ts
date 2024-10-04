import showExceptionError from './showExceptionError'
import showMessageArray from './showMessageArray'

export const processException = (toast: any, t: Function, data: any) => {
  if (data.response.data) {
    showMessageArray(toast, data.response.data)
    return
  }

  if (data.data?.warning) {
    data.data.warning.forEach((element: any) => {
      showExceptionError(toast, 'error', t('somethingWentWrong'), `${element.field} ${element.message}`, 4000)
    })
    return
  }

  if (data.message) {
    showExceptionError(toast, 'error', t('somethingWentWrong'), data.message, 4000)
    return
  }
}
