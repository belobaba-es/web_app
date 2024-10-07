import { defineStore } from 'pinia'
import { Beneficiary, TableFilter } from '../views/withdraw/type/beneficiary.type'

type UseInternalBeneficiaryListFiatStore = {
  beneficiary: Beneficiary[]
  beneficiaryInternalPrevious: Beneficiary[]
  filter: TableFilter
  totalRecords: number
  page: number
  limit: number
}

export const useInternalBeneficiaryListFiatStore = defineStore('useInternalBeneficiaryListFiatStore', {
  state: (): UseInternalBeneficiaryListFiatStore => ({
    beneficiary: [],
    beneficiaryInternalPrevious: [],
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
    getBeneficiaryInternalPrevious() {
      return this.beneficiaryInternalPrevious
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
    setBeneficiaryInternalPrevious(beneficiary: Beneficiary[]) {
      this.beneficiaryInternalPrevious = beneficiary
    },
    setBeneficiary(beneficiary: Beneficiary[]) {
      this.beneficiary = []
      this.beneficiary = [...beneficiary]
    },
  },
})
