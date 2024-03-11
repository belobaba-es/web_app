import { defineStore } from 'pinia'
import { MakeFiatExternalTransfer } from '../../types/withdraw'

export const useTransactionAchPabStore = defineStore('useTransactionPab', {
  state: (): MakeFiatExternalTransfer => ({
    amount: 0,
    beneficiaryId: '',
    reference: '',
    purpose: '',
  }),

  actions: {
    dataTransactionAchPab(): MakeFiatExternalTransfer {
      return {
        amount: this.amount,
        beneficiaryId: this.beneficiaryId,
        reference: this.reference,
        purpose: this.purpose,
      }
    },
  },
})
