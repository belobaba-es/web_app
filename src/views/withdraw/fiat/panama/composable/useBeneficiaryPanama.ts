import { useBeneficiaryPanamaListStore } from '../../../../../stores/useBeneficiaryPanamaListStore'
import { reactive, ref, UnwrapRef, watch } from 'vue'
import { FilterListBeneficiary } from '../../../type/filterListBeneficiary.type'
import { BeneficiaryService } from '../../../services/beneficiary'
import { useToast } from 'primevue/usetoast'
import { processException } from '../../../../../shared/processException'
import { useI18n } from 'vue-i18n'
import { BeneficiaryAchPanama } from '../../../type/beneficiary.type'
import { CounterpartyStatus } from '../../../enums/beneficiary.enum'

const listBeneficiaryAchPanama = ref<BeneficiaryAchPanama[]>([])
export const useBeneficiaryPanama = () => {
  const currentPage = ref(1)
  const totalRecords = ref(0)
  const nextPag = ref(1)
  const itemsPage = ref(10)
  const totalPages = ref(0)
  const search = ref(false)
  const { t } = useI18n({ useScope: 'global' })

  const useBeneficiaryPanamaList = useBeneficiaryPanamaListStore()

  const filterBeneficiary = ref<FilterListBeneficiary>(useBeneficiaryPanamaList.getFilters())
  const toast = useToast()
  const submitting = ref(false)

  useBeneficiaryPanamaList.$subscribe((mutation, state) => {
    listBeneficiaryAchPanama.value = state.beneficiaryAchPanama
    filterBeneficiary.value = state.filter
    totalRecords.value = state.totalRecords
  })

  const fetchBeneficiariesAchPanama = async (isFirstLoad?: boolean) => {
    submitting.value = true
    if (isFirstLoad) {
      useBeneficiaryPanamaList.clearBeneficiary()
      useBeneficiaryPanamaList.setNextPage(1)
      currentPage.value = 1
    }
    try {
      const resp = await new BeneficiaryService().listBeneficiaryAchPanama(useBeneficiaryPanamaList.getFilters())
      nextPag.value = Number(resp.nextPag ?? 1)
      useBeneficiaryPanamaList.setBeneficiary(resp.results)
      pagination.totalRecords = resp.count
      useBeneficiaryPanamaList.setTotalRecords(resp.count)
      nextPag.value = Number(resp.nextPag) ? Number(resp.nextPag) : nextPag.value > 0 ? nextPag.value : 1
    } catch (error) {
      processException(toast, t, error)
    } finally {
      submitting.value = false
    }
  }

  const beneficiaryPanamaSearch = async (searchBeneficiary: string) => {
    handleChange(searchBeneficiary)
    if (!searchBeneficiary) {
      await fetchBeneficiariesAchPanama(true)
      return
    }
    useBeneficiaryPanamaList.searchBeneficiary(searchBeneficiary)
    search.value = true
  }

  const handleChange = async (searchText: string) => {
    if (searchText === '') {
      await fetchBeneficiariesAchPanama(true)
    }
  }

  const pagination = reactive({
    totalRecords: totalRecords.value,
    nextPag: nextPag.value,
    currentPage: currentPage.value,
    itemsPage: itemsPage.value,
    totalPages: totalPages.value === 0 ? 1 : totalPages.value,
  })

  watch([totalRecords, nextPag, currentPage, itemsPage], () => {
    pagination.totalRecords = totalRecords.value
    pagination.nextPag = nextPag.value
    pagination.currentPage = currentPage.value
    pagination.itemsPage = itemsPage.value
    totalPages.value = Math.ceil(totalRecords.value / itemsPage.value)
    pagination.totalPages = totalPages.value === 0 ? 1 : totalPages.value
  })

  watch(filterBeneficiary, () => {
    useBeneficiaryPanamaList.setFilters(filterBeneficiary.value)
  })

  const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      useBeneficiaryPanamaList.setNextPage(currentPage.value)
      await fetchBeneficiariesAchPanama()
    }
  }

  const prevPage = async () => {
    if (currentPage.value > 1) {
      currentPage.value--
      useBeneficiaryPanamaList.setNextPage(currentPage.value)
      await fetchBeneficiariesAchPanama()
    }
  }

  const getBeneficiaryStatusColor = (status: UnwrapRef<BeneficiaryAchPanama['status']> | undefined) => {
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
        return { backgroundColor: 'black', color: 'white' }
    }
  }

  const updateItemsPage = async (itemPage: number) => {
    itemsPage.value = itemPage
    currentPage.value = 1
    useBeneficiaryPanamaList.setLimit(itemPage)
    useBeneficiaryPanamaList.setNextPage(1)
    await fetchBeneficiariesAchPanama()
  }

  return {
    fetchBeneficiariesAchPanama,
    listBeneficiaryAchPanama,
    useBeneficiaryPanamaListStore,
    filterBeneficiary,
    submitting,
    pagination,
    nextPage,
    prevPage,
    getBeneficiaryStatusColor,
    updateItemsPage,
    beneficiaryPanamaSearch,
    handleChange,
    nextPag,
    currentPage,
    totalRecords,
    totalPages,
  }
}
