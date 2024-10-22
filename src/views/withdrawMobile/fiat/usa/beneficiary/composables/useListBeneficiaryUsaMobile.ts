import { useListBeneficiaryUsa } from '../../../../../withdraw/fiat/usa/composable/useListBeneficiaryUsa'
import { onMounted, reactive, ref, watch } from 'vue'
import { NewBeneficiary } from '../../../../../withdraw/type/beneficiary.type'
import { useBeneficiaryStore } from '../../../../../../stores/useBeneficiaryStore'

const beneficiaries = ref<NewBeneficiary>({} as NewBeneficiary)

export const useListBeneficiaryUsaMobile = () => {
  const { listBeneficiaryUsa, submitting, fetchBeneficiariesUsa } = useListBeneficiaryUsa()

  const useBeneficiary = useBeneficiaryStore()

  useBeneficiary.$subscribe((mutation, state) => {
    beneficiaries.value = state.beneficiaries
  })

  const dataTable = reactive({
    list: listBeneficiaryUsa,
    loading: false,
    icon: false,
    showEdit: true,
    showWithdrawal: true,
  })

  watch(listBeneficiaryUsa, newVal => {
    listBeneficiaryUsa.value = newVal
  })

  watch(submitting, newVal => {
    dataTable.loading = newVal
  })

  onMounted(() => {
    if (listBeneficiaryUsa.value.length === 0) {
      fetchBeneficiariesUsa(true)
    }
  })
  return {
    dataTable,
  }
}
