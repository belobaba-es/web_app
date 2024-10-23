import { defineStore } from 'pinia'
import { TransactionCard } from '../types/transactionCard.type'

type CardStore = {
  transactionList: TransactionCard[]
  page: number
  totalRecords: number
  limit: number
}
export const useTransactionHistoryStore = defineStore('transactionHistoryCard', {
  state: (): CardStore => ({
    transactionList: [],
    page: 1,
    totalRecords: 0,
    limit: 10,
  }),
  actions: {
    setTransactionList(payload: TransactionCard[]) {
      this.transactionList = payload
    },
    getNextPage() {
      return this.page
    },
    setNextPage(page: number) {
      this.page = page
    },
    setLimit(limit: number) {
      this.limit = limit
    },
    setTotalRecords(totalRecords: number) {
      this.totalRecords = totalRecords
    },
  },
})
