import { useInternalBeneficiary } from '../../../../withdraw/crypto/composable/useInternalBeneficiary'
import { onMounted, reactive, watch } from 'vue'
import { validateEmail } from '../../../../../shared/helpers/validateEmail'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../../../../composables/useAssets'

export const useListBeneficiaryInternal = () => {
  const {
    fetchInternalBeneficiary,
    loading,
    beneficiaryInternalSearch,
    makeWithdrawalInternal,
    listInternalBeneficiary,
    pagination,
    nextPage,
    prevPage,
    updateItemsPage,
  } = useInternalBeneficiary()
  const { getAssets, listAssets } = useAssets()
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  onMounted(async () => {
    if (listAssets.value.length === 0) getAssets()
    if (listInternalBeneficiary.value.length === 0) await fetchInternalBeneficiary(true)
  })

  watch([listInternalBeneficiary, loading], () => {
    dataTable.list = listInternalBeneficiary.value
    dataTable.loading = loading.value
  })
  const searchNextPage = () => {
    nextPage()
  }

  const searchPrevPage = () => {
    prevPage()
  }

  const searchUpdatePageRange = (itemPage: number) => {
    updateItemsPage(itemPage)
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
