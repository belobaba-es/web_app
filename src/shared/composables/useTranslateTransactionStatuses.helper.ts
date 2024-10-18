import { useI18n } from 'vue-i18n'

export const useTranslateTransactionStatuses = () => {
  const { t } = useI18n({ useScope: 'global' })

  const TRANSACTION_STATUSES: { [key: string]: string } = {
    PENDING: t('transactionStatuses.pending'),
    IN_PROCESS: t('transactionStatuses.inProcess'),
    PROCESSED: t('transactionStatuses.processed'),
    CANCELLED: t('transactionStatuses.cancelled'),
    REVERSED: t('transactionStatuses.reversed'),
    PROCESS_WITH_ERROR: t('transactionStatuses.processWithError'),
    AUTHORIZED: t('transactionStatuses.authorized'),
    POSTED: t('transactionStatuses.posted'),
  }

  const translateTransactionStatus = (status: string): string => {
    console.log(TRANSACTION_STATUSES[status] || status)
    return TRANSACTION_STATUSES[status] || status
  }

  return { translateTransactionStatus }
}
