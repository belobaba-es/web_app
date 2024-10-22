import { defineStore } from 'pinia'
import { Beneficiary, TableFilter } from '../views/withdraw/type/beneficiary.type'

type BeneficiaryCryptoStore = {
  beneficiary: Beneficiary[]
  filter: TableFilter
  listBeneficiarySearch: Beneficiary[]
  totalRecords: number
  page: number
  limit: number
}

export const useCryptoBeneficiaryListStore = defineStore('useCryptoBeneficiaryListStore', {
  state: (): BeneficiaryCryptoStore => ({
    beneficiary: [],
    listBeneficiarySearch: [],
    filter: {
      page: 1,
      limit: 10,
    },
    page: 1,
    totalRecords: 0,
    limit: 10,
  }),
  actions: {
    clearFilter() {
      this.filter = {
        page: 1,
        limit: 10,
      }
    },
    getNextPage() {
      return this.page
    },
    getFilters(): TableFilter {
      return { ...this.filter, page: this.page, limit: this.limit }
    },
    getBeneficiary() {
      return this.beneficiary
    },
    setFilters(filter: TableFilter) {
      this.filter = filter
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
    setBeneficiary(beneficiary: Beneficiary[]) {
      this.beneficiary = []
      this.beneficiary = [...beneficiary]
    },
    findBeneficiaryByCounterpartyId(counterpartyId: string): Beneficiary | undefined {
      return this.beneficiary.find((beneficiary: Beneficiary) => beneficiary.counterpartyId === counterpartyId)
    },
    setListBeneficiarySearch(beneficiary: Beneficiary[]) {
      this.listBeneficiarySearch = [...beneficiary]
    },
    searchBeneficiary(search: string): Beneficiary[] {
      this.beneficiary = this.beneficiary.length === 0 ? this.listBeneficiarySearch : this.beneficiary
      const searchLower = search.toLowerCase()
      const resultSearch = this.beneficiary.filter(beneficiary => {
        const name = beneficiary.informationOwner.name?.toLowerCase() || ''
        const originWallet = beneficiary.informationWallet.originWallet?.toLowerCase() || ''
        const status = beneficiary.status?.toLowerCase() || ''

        return name.includes(searchLower) || originWallet.includes(searchLower) || status.includes(searchLower)
      })

      this.beneficiary = [...resultSearch]

      return resultSearch
    },
  },
})
