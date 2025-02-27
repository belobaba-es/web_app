import { ref } from 'vue'
import { MakeAssetExternalTransfer, MakeAssetInternalTransfer, MakeAssetTransfer } from '../../type/withdraw'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { DataAsset, DataBeneficiary } from '../../type/beneficiary.type'
import { useBeneficiaryCrypto } from './useBeneficiaryCrypto'
import { WithdrawCryptoService } from '../../services/withdrawCrypto'
import { useAuth } from '../../../../composables/useAuth'
import { processException } from '../../../../shared/processException'
import { useInternalBeneficiaryListCryptoStore } from '../../../../stores/useInternalBeneficiaryListCryptoStore'

const transactionData = ref<MakeAssetExternalTransfer | MakeAssetInternalTransfer>({} as MakeAssetTransfer)
const balance = ref(0.0)
const fee = ref(0)
const transactionId = ref('')
const visible = ref(false)

export function useWithdrawalCrypto() {
  const route = useRoute()
  const router = useRouter()
  const visibleModalVeryCodeTwoFactor = ref(false)
  const { getBeneficiaryInternalPrevious, setBeneficiary } = useInternalBeneficiaryListCryptoStore()
  const beneficiaryInformation = ref<DataBeneficiary>({} as DataBeneficiary)
  const { form, isWithdrawal } = useBeneficiaryCrypto()
  const { isAccountSegregated } = useAuth()
  const submitting = ref(false)
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const assetCodeSelected = ref({ code: '', icon: '', name: '', assetClassification: '' })
  const assetSelected = ref<DataAsset>({
    nameAsset: '',
    iconAsset: '',
    assetName: '',
    networkAddress: '',
  })
  isWithdrawal.value = true
  beneficiaryInformation.value.name = form.value.informationOwner.name
  beneficiaryInformation.value.addressWallet = form.value.informationWallet.address
  beneficiaryInformation.value.isInternal = form.value.isInternal

  const resetFormWithdrawal = () => {
    transactionData.value = {
      amount: 0,
      purpose: '',
      reference: '',
      clientIdDestination: '',
      assetCode: '',
    }
  }

  if (route.params['counterpartyId']) {
    resetFormWithdrawal()
    transactionData.value = {
      ...transactionData.value,
      beneficiaryAssetId: route.params.counterpartyId.toString(),
    } as MakeAssetExternalTransfer

    if ('clientIdDestination' in transactionData.value) {
      delete transactionData.value.clientIdDestination
    }

    if ('assetCode' in transactionData.value) {
      delete transactionData.value.assetCode
    }
  }

  if (route.params['clientId']) {
    transactionData.value = {
      ...transactionData.value,
      clientIdDestination: route.params.clientId.toString(),
    } as MakeAssetInternalTransfer

    if ('beneficiaryAssetId' in transactionData.value) {
      delete transactionData.value.beneficiaryAssetId
    }
  }

  const isValidFormWithdrawal = () => {
    if ('beneficiaryAssetId' in transactionData.value) {
      return (
        transactionData.value.amount &&
        'beneficiaryAssetId' in transactionData.value &&
        transactionData.value.purpose &&
        transactionData.value.reference
      )
    }
    return (
      transactionData.value.amount &&
      'clientIdDestination' in transactionData.value &&
      'assetCode' in transactionData.value &&
      transactionData.value.purpose &&
      transactionData.value.reference
    )
  }

  const goBack = () => {
    router.go(-1)
  }

  async function makeTransaction(transaction: MakeAssetExternalTransfer | MakeAssetInternalTransfer) {
    submitting.value = true

    if ('beneficiaryAssetId' in transaction) {
      transaction.purpose = isAccountSegregated() ? 'LOAN' : transaction.purpose
      await makeAssetExternalTransfer(transaction as MakeAssetExternalTransfer)
    } else {
      await makeAssetInternalTransfer(transaction as MakeAssetInternalTransfer)
    }
  }

  const makeAssetExternalTransfer = async (transaction: MakeAssetExternalTransfer) => {
    new WithdrawCryptoService()
      .makeAssetExternalTransfer(transaction)
      .then((res: any) => {
        transactionId.value = res.data.transactionId
        toast.add({
          severity: 'success',
          summary: t('Confirm withdraw information'),
          detail: res.message,
          life: 4000,
        })
        submitting.value = false
        visible.value = false
        resetFormWithdrawal()
        clearAssetWithdrawal()
        router.push(`/withdraw/crypto/other-platforms/beneficiary`)
      })
      .catch(e => {
        submitting.value = false
        visible.value = false
        processException(toast, t, e)
      })
  }
  const makeAssetInternalTransfer = async (transaction: MakeAssetInternalTransfer) => {
    new WithdrawCryptoService()
      .makeAssetInternalTransfer(transaction)
      .then((res: any) => {
        transactionId.value = res.data.transactionId
        submitting.value = false
        visible.value = false
        toast.add({
          severity: 'success',
          summary: t('Confirm withdraw information'),
          detail: res.message,
          life: 4000,
        })
        setBeneficiary(getBeneficiaryInternalPrevious())
        resetFormWithdrawal()
        clearAssetWithdrawal()
        router.push(`/withdraw/crypto/internal/beneficiary`)
      })
      .catch(e => {
        submitting.value = false
        visible.value = false
        processException(toast, t, e)
      })
  }
  const clearAssetWithdrawal = () => {
    beneficiaryInformation.value.name = ''
    beneficiaryInformation.value.addressWallet = ''
    beneficiaryInformation.value.isInternal = ''

    assetSelected.value = {
      nameAsset: '',
      iconAsset: '',
      assetName: '',
      networkAddress: '',
    }

    assetCodeSelected.value = {
      code: '',
      icon: '',
      name: '',
      assetClassification: '',
    }
  }

  return {
    transactionData,
    balance,
    fee,
    beneficiaryInformation,
    isWithdrawal,
    visibleModalVeryCodeTwoFactor,
    goBack,
    makeTransaction,
    submitting,
    isValidFormWithdrawal,
    assetCodeSelected,
    visible,
    isAccountSegregated,
    resetFormWithdrawal,
    assetSelected,
    form,
  }
}
