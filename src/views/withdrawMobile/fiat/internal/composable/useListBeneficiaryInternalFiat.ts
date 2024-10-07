import { onMounted, reactive, watch } from 'vue'
import { useListBeneficiaryInternal } from '../../../../withdraw/fiat/internal/composable/useListBeneficiaryInternal'
import { validateEmail } from '../../../../../shared/helpers/validateEmail'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../../../../composables/useAssets'

export const useListBeneficiaryInternalFiat = () => {
  const {
    fetchInternalBeneficiary,
    internalBeneficiaryListStore,
    loading,
    nextPag,
    currentPage,
    numberRecords,
    totalRecords,
    listInternalBeneficiary,
    beneficiaryInternalSearch,
    makeWithdrawalInternal,
    pagination,
  } = useListBeneficiaryInternal()
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const { getAssets, listAssets } = useAssets()
  onMounted(async () => {
    if (listAssets.value.length === 0) getAssets()
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
