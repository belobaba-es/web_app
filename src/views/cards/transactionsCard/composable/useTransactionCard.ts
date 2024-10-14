import { historyTransaction } from '../../services/nobaCard.service'
import { ref } from 'vue'
import { TransactionCard } from '../../types/transactionCard.type'
import { useI18n } from 'vue-i18n'
import { TransactionCardStatus } from '../../enums/transactionCardStatus.enum'

export const useTransactionCard = () => {
  const transactionList = ref<TransactionCard[]>([])
  const nextPage = ref<boolean>(false)
  const loadingTransactions = ref<boolean>(false)
  const { t } = useI18n({ useScope: 'global' })
  const getHistoryTransaction = async (page: number, limit: number) => {
    const response = await historyTransaction(page, limit)
    nextPage.value = !!response.nextPag

    response.results.forEach(element => {
      if (transactionList.value) {
        transactionList.value = [...transactionList.value, element]
      }
    })

    loadingTransactions.value = false
  }

  const loadMoreTransactions = async () => {
    loadingTransactions.value = true
    await getHistoryTransaction(transactionList.value!.length, 10)
  }

  const getLastSixDigits = (id: string) => {
    return id.slice(-6)
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = ('0' + (d.getMonth() + 1)).slice(-2)
    const day = ('0' + d.getDate()).slice(-2)

    return `${year}-${month}-${day}`
  }

  const formatDateMobile = (dateString: String) => {
    const [date, time] = dateString.split('T')
    const [year, month, day] = date.split('-')
    const monthNames = [
      t('months.january'),
      t('months.february'),
      t('months.march'),
      t('months.april'),
      t('months.may'),
      t('months.june'),
      t('months.july'),
      t('months.august'),
      t('months.september'),
      t('months.october'),
      t('months.november'),
      t('months.december'),
    ]

    return `${day} ${monthNames[parseInt(month) - 1]}, ${time.slice(0, 5)}`
  }

  const getDescriptions = (transaction: TransactionCard) => {
    if ([TransactionCardStatus.DECLINED, TransactionCardStatus.REVERSED].includes(transaction.status)) {
      return transaction.description + ' - ' + transaction.reasonRejectingTransaction
    }

    return transaction.description
  }

  return {
    getDescriptions,
    getHistoryTransaction,
    transactionList,
    getLastSixDigits,
    formatDate,
    formatDateMobile,
    loadMoreTransactions,
    loadingTransactions,
    nextPage,
  }
}
