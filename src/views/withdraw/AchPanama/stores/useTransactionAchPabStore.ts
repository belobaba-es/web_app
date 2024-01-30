import { defineStore } from 'pinia'
import { BeneficiaryAchPanama, CounterpartyStatus, productType } from '../../types/beneficiary.interface'

export const useTransactionAchPabStore = defineStore('useTransactionPab', {
  state: (): BeneficiaryAchPanama => ({
    achInstructions: {
      accountDestinationNumber: '',
      bankName: '',
      concept: '',
      holderEmail: '',
      holderId: '',
      holderName: '',
      productType: {} as productType,
    },
    isInternal: '',
    status: {} as CounterpartyStatus,
  }),

  actions: {
    setInitialTransactionAchPab(beneficiaryAchPanama: BeneficiaryAchPanama) {
      this.achInstructions = beneficiaryAchPanama.achInstructions
      this.isInternal = beneficiaryAchPanama.isInternal
      this.status = beneficiaryAchPanama.status
    },
  },
})
