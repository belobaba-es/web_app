import { historyTransaction } from '../../services/nobaCard.service'
import { reactive, ref, watch } from 'vue'
import { TransactionCard } from '../../types/transactionCard.type'
import { useI18n } from 'vue-i18n'
import { TransactionCardStatus } from '../../enums/transactionCardStatus.enum'
import { useTransactionHistoryStore } from '../../stores/useTransactionHistory'
import { generateTransactionReceipt } from '../../../../shared/generatePdf'
import { useAuth } from '../../../../composables/useAuth'
import logo from '../../../../assets/img/logo.png'
import { processException } from '../../../../shared/processException'
import { useToast } from 'primevue/usetoast'

const transactionList = ref<TransactionCard[]>([])
const currentPage = ref(1)
const totalRecords = ref(0)
const nextPag = ref(1)
const itemsPage = ref(10)
const totalPages = ref(0)
const isGeneratingTransactionPDF = ref(false)

export const useTransactionCard = () => {
  const loadingTransactions = ref<boolean>(false)
  const { t } = useI18n({ useScope: 'global' })
  const useTransactionHistoryCard = useTransactionHistoryStore()
  const toast = useToast()
  const { getUserName } = useAuth()

  useTransactionHistoryCard.$subscribe((mutation, state) => {
    transactionList.value = state.transactionList
    totalRecords.value = state.totalRecords
  })

  const getHistoryTransaction = async (page: number, limit: number) => {
    const response = await historyTransaction(page, limit)
    transactionList.value = response.results

    useTransactionHistoryCard.setTransactionList(transactionList.value)
    useTransactionHistoryCard.setTotalRecords(response.count)

    loadingTransactions.value = false
  }

  const loadMoreTransactions = async () => {
    loadingTransactions.value = true
    await getHistoryTransaction(transactionList.value!.length, 10)
  }

  const getLastSixDigits = (id: string) => {
    return id.slice(-6)
  }

  const generatePdfTransactionCard = (transaction: TransactionCard) => {
    isGeneratingTransactionPDF.value = true

    try {
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
      transactionPDF[t('datePicker')] = `${transaction.createdAt}`

      generateTransactionReceipt(fileName, logo, title, transactionPDF)
    } catch (error) {
      processException(toast, t, error)
    } finally {
      isGeneratingTransactionPDF.value = false
    }
  }

  const getDescriptions = (transaction: TransactionCard) => {
    const statuses: TransactionCardStatus[] = [TransactionCardStatus.DECLINED, TransactionCardStatus.REVERSED]

    if (statuses.includes(transaction.status)) {
      return transaction.description + ' - ' + transaction.reasonRejectingTransaction
    }

    return transaction.description
  }

  const formatDate = (date: Date) => {
    const d = new Date()
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

  totalPages.value = Math.ceil(totalRecords.value / itemsPage.value)

  const pagination = reactive({
    totalRecords: totalRecords.value,
    nextPag: nextPag.value,
    currentPage: currentPage.value,
    itemsPage: itemsPage.value,
    totalPages: totalPages.value,
  })

  const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      useTransactionHistoryCard.setNextPage(currentPage.value)
      await getHistoryTransaction(currentPage.value, 10)
    }
  }

  const prevPage = async () => {
    if (currentPage.value > 1) {
      currentPage.value--
      useTransactionHistoryCard.setNextPage(currentPage.value)
      await getHistoryTransaction(currentPage.value, 10)
    }
  }

  const updateItemsPage = async (itemPage: number) => {
    itemsPage.value = itemPage
    useTransactionHistoryCard.setLimit(itemPage)
    await getHistoryTransaction(currentPage.value, itemsPage.value)
  }

  watch(totalRecords, newValue => {
    pagination.totalRecords = newValue
    totalPages.value = Math.ceil(newValue / itemsPage.value)
    pagination.totalPages = totalPages.value === 0 ? 1 : totalPages.value
  })

  watch(itemsPage, newValue => {
    totalPages.value = Math.ceil(totalRecords.value / newValue)
    pagination.totalPages = totalPages.value === 0 ? 1 : totalPages.value
  })

  watch(nextPag, newVal => {
    pagination.nextPag = newVal
  })

  watch(currentPage, newVal => {
    pagination.currentPage = newVal
  })

  return {
    getHistoryTransaction,
    transactionList,
    getLastSixDigits,
    formatDate,
    formatDateMobile,
    loadMoreTransactions,
    getDescriptions,
    loadingTransactions,
    generatePdfTransactionCard,
    isGeneratingTransactionPDF,
    pagination,
    getHistoryTransaction,
    nextPage,
    currentPage,
    prevPage,
    updateItemsPage,
  }
}
