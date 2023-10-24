import showExceptionError from './showExceptionError'
import showMessage from './showMessageArray'
import { useI18n } from 'vue-i18n'

export const processException = (toast: any, t: Function, data: any) => {
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

  showMessage(toast, data)
}
