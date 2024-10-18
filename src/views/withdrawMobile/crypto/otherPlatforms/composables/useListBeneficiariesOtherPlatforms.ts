import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBeneficiaryCrypto } from '../../../../withdraw/crypto/composable/useBeneficiaryCrypto'
import { useWithdrawalCrypto } from '../../../../withdraw/crypto/composable/useWithdrawalCrypto'

export const useListBeneficiariesOtherPlatforms = () => {
  const router = useRouter()
  const {
    resetFormOtherPlatform,
    listBeneficiary,
    submitting,
    fetchBeneficiariesAssets,
    beneficiaryAssetSearch,
    setDataBeneficiary,
    makeWithdrawalOtherPlatforms,
    isAssetEdit,
    updateItemsPage,
    prevPage,
    nextPage,
    pagination,
  } = useBeneficiaryCrypto()
  const { isWithdrawal } = useWithdrawalCrypto()

  const dataTable = reactive({
    list: listBeneficiary,
    loading: submitting,
    icon: true,
    showEdit: false,
    showWithdrawal: true,
  })

  watch(listBeneficiary, newVal => {
    listBeneficiary.value = newVal
  })
  watch(isAssetEdit, newVal => {
    isAssetEdit.value = newVal
  })

  watch([listBeneficiary, submitting], () => {
    dataTable.list = listBeneficiary.value
    dataTable.loading = submitting.value
  })

  onMounted(async () => {
    if (listBeneficiary.value.length === 0) {
      await fetchBeneficiariesAssets(true)
    }
  })

  const handleSearch = (searchText: string) => {
    beneficiaryAssetSearch(searchText)
  }

  const searchNextPage = () => {
    nextPage()
  }

  const searchPrevPage = () => {
    prevPage()
  }

  const searchUpdatePageRange = (itemPage: number) => {
    updateItemsPage(itemPage)
  }

  const goToCreateBeneficiary = () => {
    isAssetEdit.value = false
    isWithdrawal.value = false
    resetFormOtherPlatform()
    router.push('/withdraw/crypto/other-platforms/beneficiary/new')
  }
  const handleChange = (searchText: string) => {
    if (searchText == '') {
      fetchBeneficiariesAssets(true)
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
    goToCreateBeneficiary,
    setDataBeneficiary,
    handleChange,
    makeWithdrawalOtherPlatforms,
  }
}
