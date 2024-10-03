import { onMounted, ref, watch } from 'vue'
import { WithdrawService } from '../../../services/withdraw'
import router from '../../../../../router/router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBalanceWallet } from '../../../../../composables/useBalanceWallet'
import { useAuth } from '../../../../../composables/useAuth'
import { useBeneficiaryUsaListStore } from '../../../../../stores/useBeneficiaryUsaListStore'
import { useWithdraw } from '../../../composable/useWithdraw'
import { processException } from '../../../../../shared/processException'

export const useWithdrawInternal = () => {
  const { getSelectedCounterpartyId } = useBeneficiaryUsaListStore()
  const { transactionData, loading, getBalance, balance } = useWithdraw()
  const { getBalanceByCode } = useBalanceWallet()
  const selectedAsset = ref()
  const assetCodeFiat = ref('')

  const fee = ref(0)
  const submitting = ref(false)
  const toast = useToast()
  const { isAccountSegregated } = useAuth()
  const { t } = useI18n({ useScope: 'global' })

  const makeFiatInternalTransfer = () => {
    const data = {
      ...transactionData.value,
      clientIdDestination: getSelectedCounterpartyId(),
      assetCode: selectedAsset.value,
    }
    loading.value = true
    new WithdrawService()
      .makeFiatInternalTransfer(data)
      .then((res: any) => {
        toast.add({
          severity: 'success',
          summary: t('Confirm withdraw information'),
          detail: res.message,
          life: 4000,
        })
        loading.value = false
        resetFormWithdrawal()
        router.push(`/withdraw/fiat/internal`)
      })
      .catch(e => {
        loading.value = false
        processException(toast, t, e)
      })
  }
  const resetFormWithdrawal = () => {
    transactionData.value = {
      amount: 0,
      purpose: '',
      reference: '',
      clientIdDestination: '',
      beneficiaryId: '',
      assetCode: '',
    }
  }
  const goBack = () => {
    router.back()
  }
  onMounted(() => {
    getBalance()
  })
  watch(selectedAsset, newValue => {
    selectedAsset.value = newValue
  })
  return {
    makeFiatInternalTransfer,
    transactionData,
    balance,
    fee,
    goBack,
    isAccountSegregated,
    selectedAsset,
    getSelectedCounterpartyId,
    assetCodeFiat,
    submitting,
  }
}
