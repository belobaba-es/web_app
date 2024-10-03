import { onMounted, reactive, watch } from 'vue'
import { useListBeneficiaryInternal } from '../../../../withdraw/fiat/internal/composable/useListBeneficiaryInternal'
import { validateEmail } from '../../../../../shared/helpers/validateEmail'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

export const useListBeneficiaryInternalFiat = () => {
  const {
    fetchInternalBeneficiary,
    internalBeneficiaryListStore,
    loading,
    nextPag,
    currentPage,
    numberRecords,
    totalRecords,
    totalPage,
    listInternalBeneficiary,
    beneficiaryInternalSearch,
    makeWithdrawalInternal,
  } = useListBeneficiaryInternal()
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  onMounted(async () => {
    await fetchInternalBeneficiary(true)
  })
  watch([nextPag, currentPage, numberRecords, totalRecords], () => {
    pagination.totalRecords = totalRecords.value
    pagination.nextPag = nextPag.value
    pagination.currentPage = currentPage.value
    pagination.itemsPage = numberRecords.value
  })

  watch([listInternalBeneficiary, loading], () => {
    dataTable.list = listInternalBeneficiary.value
    dataTable.loading = loading.value
  })
  const searchNextPage = (currentPage: number) => {
    internalBeneficiaryListStore.setNextPage(currentPage)
    fetchInternalBeneficiary()
  }

  const searchPrevPage = (currentPage: number) => {
    internalBeneficiaryListStore.setNextPage(currentPage)
    fetchInternalBeneficiary()
  }

  const searchUpdatePageRange = (itemPage: number) => {
    internalBeneficiaryListStore.setLimit(itemPage)
    fetchInternalBeneficiary()
  }
  const pagination = reactive({
    totalRecords: totalRecords.value,
    nextPag: nextPag.value,
    currentPage: currentPage.value,
    itemsPage: numberRecords.value,
    totalPages: totalPage.value === 0 ? 1 : totalPage.value,
  })

  const dataTable = reactive({
    list: listInternalBeneficiary,
    loading: loading,
    icon: false,
    showEdit: false,
    showWithdrawal: true,
  })
  const handleSearch = (searchText: string) => {
    if (!validateEmail(searchText)) {
      toast.add({
        severity: 'error',
        summary: t('invalidEmail'),
        detail: '',
        life: 4000,
      })
      return
    }
    beneficiaryInternalSearch(searchText)
  }
  const handleChange = (searchText: string) => {
    if (searchText == '') {
      fetchInternalBeneficiary(true)
      return
    }
  }
  return {
    pagination,
    dataTable,
    handleSearch,
    searchNextPage,
    searchPrevPage,
    searchUpdatePageRange,
    makeWithdrawalInternal,
    handleChange,
  }
}
