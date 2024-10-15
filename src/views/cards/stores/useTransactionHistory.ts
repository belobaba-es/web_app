import { defineStore } from 'pinia'
import { TransactionCard } from '../types/transactionCard.type'

type CardStore = {
  transactionList: TransactionCard[]
}
export const useTransactionHistoryStore = defineStore('transactionHistoryCard', {
  state: (): CardStore => ({
    transactionList: [],
  }),
  actions: {
    setTransactionList(payload: TransactionCard[]) {
      this.transactionList = payload
    },
  },
})
