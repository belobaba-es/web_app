import { reactive, ref, watch } from 'vue'
import { BeneficiaryService } from '../../../services/beneficiary'
import { useBeneficiaryUsaListStore } from '../../../../../stores/useBeneficiaryUsaListStore'
import { useToast } from 'primevue/usetoast'
import { FilterListBeneficiary } from '../../../type/filterListBeneficiary.type'
import { useI18n } from 'vue-i18n'
import { processException } from '../../../../../shared/processException'
import { Beneficiary } from '../../../type/beneficiary.type'
import { CounterpartyStatus } from '../../../enums/beneficiary.enum'
import countrycounterpartytype from '../../../../../shared/jsons/countryCounterpartyType.json'

const listBeneficiaryUsa = ref<Beneficiary[]>([])
const listBeneficiarySearch = ref<Beneficiary[]>([])
const submitting = ref(false)
const currentPage = ref(1)
const totalRecords = ref(0)
const nextPag = ref(1)
const itemsPage = ref(10)
const totalPages = ref(0)
const wireLocalType = ref<string>('')
const showInputIban = ref<boolean>(false)
const showLabelInternational = ref(false)
const showLabelDomestic = ref(false)
export const useListBeneficiaryUsa = () => {
  const search = ref(false)
  const useBeneficiaryUsaList = useBeneficiaryUsaListStore()
  const { setSelectedCounterpartyId } = useBeneficiaryUsaListStore()
  useBeneficiaryUsaList.$subscribe((mutation, state) => {
    listBeneficiaryUsa.value = state.beneficiary
    listBeneficiarySearch.value = state.listBeneficiarySearch
    filterBeneficiary.value = state.filter
    totalRecords.value = state.totalRecords
  })
  const filterBeneficiary = ref<FilterListBeneficiary>(useBeneficiaryUsaList.getFilters())
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const columnsHeader = [
    { field: 'informationBank.networkBank', header: t('typeNetwork') },
    { field: 'informationOwner.address.country', header: t('countryLabel') },
  ]

  const validateShowInputIban = (counterpartyType: string) => {
    showInputIban.value = countrycounterpartytype.includes(counterpartyType)
  }

  const fetchBeneficiariesUsa = (isFirstLoad?: boolean) => {
    submitting.value = true
    if (isFirstLoad) {
      currentPage.value = 1
      useBeneficiaryUsaList.setNextPage(1)
    }
    try {
      new BeneficiaryService().listBeneficiaryBankingUsa(useBeneficiaryUsaList.getFilters()).then(resp => {
        listBeneficiaryUsa.value = resp.results
        useBeneficiaryUsaList.setBeneficiary(resp.results)
        useBeneficiaryUsaList.setListBeneficiarySearch(resp.results)
        useBeneficiaryUsaList.setTotalRecords(resp.count)
        submitting.value = false
        nextPag.value = Number(resp.nextPag) ? Number(resp.nextPag) : nextPag.value > 0 ? nextPag.value : 1
      })
    } catch (error) {
      processException(toast, t, error)
    }
  }

  totalPages.value = Math.ceil(totalRecords.value / itemsPage.value)

  const pagination = reactive({
    totalRecords: totalRecords.value,
    nextPag: nextPag.value,
    currentPage: currentPage.value,
    itemsPage: itemsPage.value,
    totalPages: totalPages.value,
  })

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      useBeneficiaryUsaList.setNextPage(currentPage.value)
      fetchBeneficiariesUsa()
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      useBeneficiaryUsaList.setNextPage(currentPage.value)
      fetchBeneficiariesUsa()
    }
  }

  const beneficiaryUsaSearch = (searchBeneficiary: string) => {
    handleChange(searchBeneficiary)
    useBeneficiaryUsaList.searchBeneficiaryUsa(searchBeneficiary)
    search.value = true
  }
  const handleChange = async (searchText: string) => {
    if (searchText == '') {
      fetchBeneficiariesUsa(true)
      return
    }
  }

  const getBeneficiaryStatusColor = (status: CounterpartyStatus) => {
    switch (status) {
      case CounterpartyStatus.ACTIVE:
        return { backgroundColor: '#18f98c', color: '#333434' }
      case CounterpartyStatus.REGISTERED:
        return { backgroundColor: '#F44336', color: '#ffffff' }
      case CounterpartyStatus.REJECTED:
        return { backgroundColor: '#F44336D4', color: '#ffffff' }
      case CounterpartyStatus.PENDING:
        return { backgroundColor: '#FFF95D', color: '#6D6D6D' }
      default:
        return { backgroundColor: 'black', color: '#ffffff' }
    }
  }

  const updateItemsPage = (itemPage: number) => {
    itemsPage.value = itemPage
    useBeneficiaryUsaList.setLimit(itemPage)
    useBeneficiaryUsaList.setNextPage(1)
    fetchBeneficiariesUsa()
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

  watch(filterBeneficiary, () => {
    useBeneficiaryUsaList.setFilters(filterBeneficiary.value)
  })

  return {
    fetchBeneficiariesUsa,
    listBeneficiaryUsa,
    submitting,
    nextPage,
    prevPage,
    updateItemsPage,
    pagination,
    columnsHeader,
    setSelectedCounterpartyId,
    getBeneficiaryStatusColor,
    beneficiaryUsaSearch,
    totalPages,
    wireLocalType,
    validateShowInputIban,
    showInputIban,
    handleChange,
    showLabelInternational,
    showLabelDomestic,
  }
}
