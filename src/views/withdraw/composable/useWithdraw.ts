import router from '../../../router/router'
import { onMounted, ref } from 'vue'
import { MakeFiatExternalTransfer, MakeFiatInternalTransfer, MakeFiatTransfer } from '../type/withdraw'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import { useAuth } from '../../../composables/useAuth'
import { WithdrawService } from '../services/withdraw'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { processException } from '../../../shared/processException'
import { NetworkBank } from '../enums/beneficiary.enum'
import { useRoute } from 'vue-router'
import { Beneficiary, BeneficiaryAchPanama } from '../type/beneficiary.type'

const dataBeneficiaryWithdrawal = ref<Beneficiary>({} as Beneficiary)
const transactionData = ref<MakeFiatExternalTransfer | MakeFiatInternalTransfer>({
  amount: 0,
  beneficiaryId: '',
  reference: '',
  purpose: '',
  assetCode: '',
  clientIdDestination: '',
} as MakeFiatTransfer)
const dataBeneficiaryWithdrawalPanama = ref<BeneficiaryAchPanama>({} as BeneficiaryAchPanama)
const loading = ref(false)
export const useWithdraw = () => {
  const balance = ref(0)
  const fee = ref(0)
  const route = useRoute()
  const feePanama = ref(0)
  const visibleModalVeryCodeTwoFactor = ref(false)
  const { getUserFeeACHPA, getUserFeeWire, getUserFeeAchUsd } = useAuth()
  const { getBalanceByCode } = useBalanceWallet()

  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })

  const getBalance = () => {
    const isPanamaRoute = route.fullPath.includes('panama')

    if (isPanamaRoute) {
      balance.value = getBalanceByCode('USD_PA')
    } else {
      balance.value = getBalanceByCode('USD')
    }
  }
  const prepareFormData = (beneficiary: Beneficiary, isInternal: boolean = false) => {
    dataBeneficiaryWithdrawal.value = beneficiary
    if (isInternal) {
      transactionData.value = {
        ...transactionData.value,
        clientIdDestination: beneficiary.clientId,
        assetCode: beneficiary.assetCode,
      } as MakeFiatInternalTransfer

      if ('beneficiaryId' in transactionData.value) {
        delete transactionData.value.beneficiaryId
      }
      return
    }

    transactionData.value = {
      ...transactionData.value,
      beneficiaryId: beneficiary.counterpartyId,
    } as MakeFiatExternalTransfer

    if ('clientIdDestination' in transactionData.value) {
      delete transactionData.value.clientIdDestination
    }

    if ('assetCode' in transactionData.value) {
      delete transactionData.value.assetCode
    }
  }

  const prepareFormDataPanama = (beneficiary: BeneficiaryAchPanama) => {
    dataBeneficiaryWithdrawalPanama.value = beneficiary
    transactionData.value = {
      ...transactionData.value,
      beneficiaryId: beneficiary.counterpartyId,
    } as MakeFiatExternalTransfer

    if ('clientIdDestination' in transactionData.value) {
      delete transactionData.value.clientIdDestination
    }

    if ('assetCode' in transactionData.value) {
      delete transactionData.value.assetCode
    }
  }

  feePanama.value = getUserFeeACHPA().domestic.out

  const getUserFee = () => {
    if (!dataBeneficiaryWithdrawal.value.informationBank) return
    if (!dataBeneficiaryWithdrawal.value.informationBank.networkBank) return

    const networkBank = dataBeneficiaryWithdrawal.value.informationBank.networkBank

    switch (networkBank) {
      case NetworkBank.WIRE:
        fee.value = getUserFeeWire().domestic.out
        break
      case NetworkBank.ACH:
        fee.value = getUserFeeAchUsd().out
        break
      case NetworkBank.SWIFT:
        fee.value = getUserFeeWire().international.out
        break
      default:
        toast.add({
          severity: 'error',
          summary: t('error'),
          detail: t('unknownNetworkBank'),
          life: 4000,
        })
    }
  }

  const makeTransaction = () => {
    loading.value = true
    new WithdrawService()
      .makeFiatExternalTransfer(transactionData.value as MakeFiatExternalTransfer)
      .then((res: any) => {
        toast.add({
          severity: 'success',
          summary: t('success'),
          detail: res.message,
          life: 4000,
        })
        loading.value = false

        resetFormWithdrawal()
        if (dataBeneficiaryWithdrawalPanama.value.counterpartyId) {
          router.push(`/withdraw/fiat/panama`)
          return
        }
        router.push(`/withdraw/fiat/usa`)
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
  const toBack = () => {
    router.back()
  }

  onMounted(async () => {
    getBalance()
    getUserFee()
  })

  const clearTransactionData = () => {
    transactionData.value = {} as MakeFiatExternalTransfer
  }

  const isValidFormWithdrawal = () => {
    if ('beneficiaryId' in transactionData.value) {
      return (
        transactionData.value.amount &&
        'beneficiaryId' in transactionData.value &&
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

  return {
    toBack,
    transactionData,
    balance,
    fee,
    feePanama,
    makeTransaction,
    loading,
    visibleModalVeryCodeTwoFactor,
    dataBeneficiaryWithdrawal,
    getUserFee,
    clearTransactionData,
    prepareFormData,
    isValidFormWithdrawal,
    prepareFormDataPanama,
    dataBeneficiaryWithdrawalPanama,
    getBalance,
    resetFormWithdrawal,
  }
}
