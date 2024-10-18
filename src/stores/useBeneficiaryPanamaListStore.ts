import { defineStore } from 'pinia'
import { Beneficiary, BeneficiaryAchPanama } from '../views/withdraw/type/beneficiary.type'
import { FilterListBeneficiary } from '../views/withdraw/type/filterListBeneficiary.type'

export const useBeneficiaryPanamaListStore = defineStore('useBeneficiaryPanamaListStore', {
  state: (): {
    beneficiaryAchPanama: any[]
    filter: FilterListBeneficiary
    totalRecords: number
    page: number
    limit: number
    selectedCounterpartyId: string | null
  } => ({
    beneficiaryAchPanama: [],
    filter: {
      page: 1,
      limit: 10,
    },
    page: 1,
    totalRecords: 0,
    limit: 10,
    selectedCounterpartyId: null,
  }),
  actions: {
    clearBeneficiary() {
      this.beneficiaryAchPanama = []
    },
    getNextPage() {
      return this.page
    },
    getFilters() {
      return { page: this.page, limit: this.limit }
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
    setFilters(filter: FilterListBeneficiary) {
      this.filter = filter
    },
    setBeneficiary(beneficiary: Beneficiary[]) {
      this.beneficiaryAchPanama = []
      const newBeneficiary: Beneficiary[] = beneficiary.filter(
        (newSBeneficiary: Beneficiary) =>
          !this.beneficiaryAchPanama.some(existingBeneficiary => existingBeneficiary.id === newSBeneficiary)
      )

      this.beneficiaryAchPanama = [...newBeneficiary]
    },
    setSelectedCounterpartyId(counterpartyId: string) {
      this.selectedCounterpartyId = counterpartyId
    },
    getSelectedCounterpartyId() {
      return this.selectedCounterpartyId
    },

    searchBeneficiary(searchName: string) {
      this.beneficiaryAchPanama =
        this.beneficiaryAchPanama.length === 0 ? this.beneficiaryAchPanama : this.beneficiaryAchPanama

      const resultSearchPanama = this.beneficiaryAchPanama.filter((beneficiary: BeneficiaryAchPanama) => {
        return searchName ? beneficiary.holderName.toLowerCase().includes(searchName.toLowerCase()) : true
      })

      this.beneficiaryAchPanama = [...resultSearchPanama]
      return resultSearchPanama
    },
  },
})
