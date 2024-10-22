import { defineStore } from 'pinia'
import { Beneficiary, TableFilter } from '../views/withdraw/type/beneficiary.type'
import { FilterListBeneficiary } from '../views/withdraw/type/filterListBeneficiary.type'

type BeneficiaryUsaStore = {
  beneficiary: Beneficiary[]
  selectedCounterpartyId: string
  filter: TableFilter
  listBeneficiarySearch: Beneficiary[]
  totalRecords: number
  page: number
  limit: number
}

export const useBeneficiaryUsaListStore = defineStore('useBeneficiaryUsaListStore', {
  state: (): BeneficiaryUsaStore => ({
    beneficiary: [],
    selectedCounterpartyId: '',
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
      this.beneficiary = []
      const newBeneficiary: Beneficiary[] = beneficiary.filter(
        (newSBeneficiary: Beneficiary) =>
          !this.beneficiary.some(existingBeneficiary => existingBeneficiary === newSBeneficiary)
      )

      this.beneficiary = [...newBeneficiary]
    },
    setListBeneficiarySearch(beneficiary: Beneficiary[]) {
      this.listBeneficiarySearch = [...beneficiary]
    },
    setSelectedCounterpartyId(counterpartyId: string) {
      this.selectedCounterpartyId = counterpartyId
    },

    getSelectedCounterpartyId() {
      return this.selectedCounterpartyId
    },

    searchBeneficiaryUsa(search: string) {
      this.beneficiary = this.listBeneficiarySearch.length === 0 ? this.listBeneficiarySearch : this.beneficiary
      const searchLower = search.toLowerCase()
      const resultSearch = this.beneficiary.filter(beneficiary => {
        const name = beneficiary.informationOwner.name?.toLowerCase() || ''
        const status = beneficiary.status?.toLowerCase() || ''
        return name.includes(searchLower) || status.includes(searchLower)
      })

      this.beneficiary = [...resultSearch]

      return resultSearch
    },
  },
})
