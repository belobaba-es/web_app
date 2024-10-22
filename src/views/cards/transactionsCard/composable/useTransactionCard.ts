import { historyTransaction } from '../../services/nobaCard.service'
import { ref } from 'vue'
import { TransactionCard } from '../../types/transactionCard.type'
import { useI18n } from 'vue-i18n'
import { TransactionCardStatus } from '../../enums/transactionCardStatus.enum'
import { useTransactionHistoryStore } from '../../stores/useTransactionHistory'
import { generateTransactionReceipt } from '../../../../shared/generatePdf'
import logo from '../../../../assets/img/logo-login.png'
import { useAuth } from '../../../../composables/useAuth'

const transactionList = ref<TransactionCard[]>([])
export const useTransactionCard = () => {
  const nextPage = ref<boolean>(false)
  const loadingTransactions = ref<boolean>(false)
  const { t } = useI18n({ useScope: 'global' })
  const useTransactionHistoryCard = useTransactionHistoryStore()

  useTransactionHistoryCard.$subscribe((mutation, state) => {
    transactionList.value = state.transactionList
  })
  const isGeneratingTransactionPDF = ref(false)
  const { getUserName } = useAuth()

  const getHistoryTransaction = async (page: number, limit: number) => {
    const response = await historyTransaction(page, limit)
    nextPage.value = !!response.nextPag

    response.results.forEach(element => {
      if (transactionList.value) {
        transactionList.value = [...transactionList.value, element]
      }
    })

    useTransactionHistoryCard.setTransactionList(transactionList.value)

    loadingTransactions.value = false
  }

  const loadMoreTransactions = async () => {
    loadingTransactions.value = true
    await getHistoryTransaction(transactionList.value!.length, 10)
    await getHistoryTransaction(transactionList.value!.length, 10)
  }

  const generatePdfTransactionCard = async (transaction: TransactionCard) => {
    isGeneratingTransactionPDF.value = true

    const transactionPDF: any = {}
    const title = t('transactionReceipt')
    const footerPdf = t('footerPdfFiatData')
    const fileName = `${t('transactionReceipt')}-${transaction.transactionId}`

    const date = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const formattedDate = formatter.format(date)

    transactionPDF[t('userName')] = `${getUserName()}`
    transactionPDF[t('assetType')] = transaction.currency
    transactionPDF[t('amount')] = `${transaction.amount}`
    transactionPDF[t('transactionType')] = t(transaction.operationType)
    transactionPDF[t('status')] = t(transaction.status)
    transactionPDF[t('transactionNumber')] = transaction.transactionId
    transactionPDF[t('reference')] = `${transaction.description}`
    transactionPDF[t('datePicker')] = `${transaction.createdAt}`

    generateTransactionReceipt(fileName, logo, title, transactionPDF)
    isGeneratingTransactionPDF.value = false
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
    isGeneratingTransactionPDF,
    generatePdfTransactionCard,
  }
}
