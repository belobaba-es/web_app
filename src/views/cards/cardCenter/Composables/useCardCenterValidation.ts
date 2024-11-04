import { useToast } from 'primevue/usetoast'
import { StatusCard } from '../../enums/statusCard.enum'
import { useI18n } from 'vue-i18n'
import { processException } from '../../../../shared/processException'

export const useCardCenterValidation = () => {
  const toast = useToast()
  const t = useI18n({ useScope: 'global' }).t
  const maskCardNumber = (cardNumber: string) => {
    const first4 = cardNumber.substring(0, 4)
    const last4 = cardNumber.substring(cardNumber.length - 4)
    const maskedSection = cardNumber.substring(4, cardNumber.length - 4).replace(/\d/g, '*')
    return `${first4} ${maskedSection} ${last4}`
  }

  const copyToClipboard = (text?: string) => {
    if (typeof text === 'string') {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.add({
            severity: 'success',
            summary: t('textCopySuccessful'),
            detail: text,
            life: 4000,
          })
        })
        .catch(err => {
          processException(toast, t, err)
        })
    }
  }

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case StatusCard.ACTIVE:
        return { background: '#6bed05', color: '#000' }
      case StatusCard.WAITING_DATA:
        return { background: '#eeedeb', color: '#979797' }
      case StatusCard.INACTIVE:
        return { background: '#3b67e9', color: '#fff' }
      case StatusCard.WAITING_ACTIVATION:
        return { background: '#f9b115', color: '#000' }
      case StatusCard.LOCKED:
        return { background: '#FF4B4A', color: '#fff' }
      default:
        return { background: '#eeedeb', color: '#979797' }
    }
  }

  const formatExpirationDate = (expirationDate: string) => {
    const date = new Date(expirationDate)

    const month = date.getMonth() + 1
    const year = date.getFullYear().toString().substr(-2)

    return `${month.toString().padStart(2, '0')}/${year}`
  }

  return {
    maskCardNumber,
    copyToClipboard,
    getStatusStyle,
    formatExpirationDate,
  }
}
