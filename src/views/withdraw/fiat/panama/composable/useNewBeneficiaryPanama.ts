import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { BeneficiaryService } from '../../../services/beneficiary'
import { useRouter } from 'vue-router'
import { processException } from '../../../../../shared/processException'
import { RegisterCounterpartyAchPanama } from '../../../type/beneficiary.type'
import data_banks from '../../../../../assets/panama_banks/banks.json'

const formObjectPanama = ref<RegisterCounterpartyAchPanama>({
  holderEmail: '',
  holderId: '',
  holderName: '',
  bankName: '',
  accountDestinationNumber: '',
  productType: {
    PACA: '',
    PACC: '',
    LOAN: '',
    ICCP: '',
  },
})

const isUpdateBeneficiary = ref<boolean>(false)
const allowed_banks = ref(data_banks)
export const useNewBeneficiaryPanama = () => {
  const router = useRouter()
  const toast = useToast()
  const submitting = ref(false)
  const showModal = ref(false)
  const { t } = useI18n({ useScope: 'global' })

  const productAccountType = ref([
    { name: 'PACA-Cuenta Ahorro', code: 'PACA' },
    { name: 'PACC-Cuenta Corriente', code: 'PACC' },
    { name: 'LOAN-Prestamo', code: 'LOAN' },
    { name: 'ICCP-Tarjeta de crédito', code: 'ICCP' },
  ])

  const validateFields = () => {
    const isBankNameValid = formObjectPanama.value.bankName !== ''
    const isHolderNameValid = formObjectPanama.value.holderName !== ''
    const isAccountNumberValid = formObjectPanama.value.accountDestinationNumber !== ''
    const isProductTypeValid = formObjectPanama.value.productType !== undefined

    if (!isBankNameValid || !isHolderNameValid || !isAccountNumberValid || !isProductTypeValid) {
      toast.add({
        severity: 'warn',
        summary: t('warningAllFieldRequired'),
        detail: t('warningDetailAllFieldRequired'),
        life: 4000,
      })
      return false
    }

    return true
  }

  const setDataBeneficiary = (beneficiary: any) => {
    isUpdateBeneficiary.value = true
    router.push(`/withdraw/fiat/panama/new-beneficiary`)
    formObjectPanama.value = beneficiary
  }

  const save = () => {
    submitting.value = true

    if (!isUpdateBeneficiary.value) {
      delete formObjectPanama.value.counterpartyId
    }

    if (!validateFields()) {
      toast.add({
        severity: 'warn',
        summary: t('warningAllFieldRequired'),
        detail: t('warningDetailAllFieldRequired'),
        life: 4000,
      })
      submitting.value = false

      return
    }

    try {
      new BeneficiaryService().saveBeneficiaryAchPanama(formObjectPanama.value).then(response => {
        showModal.value = true
        isUpdateBeneficiary.value = false

        toast.add({
          severity: 'success',
          summary: t('success'),
          detail: t(response.data.message),
          life: 4000,
        })
        resetFormPanama()
      })
    } catch (error) {
      submitting.value = false
      processException(toast, t, t('errorDetail'))
    }
  }

  const toBack = () => {
    router.back()
  }

  const resetFormPanama = () => {
    formObjectPanama.value = {
      holderEmail: '',
      holderId: '',
      holderName: '',
      bankName: '',
      accountDestinationNumber: '',
      productType: {
        PACA: '',
        PACC: '',
        LOAN: '',
        ICCP: '',
      },
    }
  }

  return {
    formObjectPanama,
    productAccountType,
    save,
    toBack,
    setDataBeneficiary,
    submitting,
    showModal,
    validateFields,
    resetFormPanama,
    allowed_banks,
  }
}
