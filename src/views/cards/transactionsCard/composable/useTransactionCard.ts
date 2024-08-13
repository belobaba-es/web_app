import { historyTransaction } from '../../services/nobaCard.service'
import { ref } from 'vue'
import { TransactionCard } from '../../types/transactionCard.type'

export const useTransactionCard = () => {
  const transactionList = ref<TransactionCard[]>([])
  const nextPage = ref<boolean>(false)
  const loadingTransactions = ref<boolean>(false)
  const getHistoryTransaction = async (page: number, limit: number) => {
    const response = await historyTransaction(page, limit)
    nextPage.value = response.nextPag ? true : false
    
    response.results.forEach((element) => {
      if (transactionList.value) {
        transactionList.value = [...transactionList.value, element]
      }
    });

    loadingTransactions.value = false
  }

  const loadMoreTransactions = async () => {
    loadingTransactions.value = true
    getHistoryTransaction(transactionList.value!.length, 10)
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

  return {
    getHistoryTransaction,
    transactionList,
    getLastSixDigits,
    formatDate,
    loadMoreTransactions,
    loadingTransactions,
    nextPage
  }
}
