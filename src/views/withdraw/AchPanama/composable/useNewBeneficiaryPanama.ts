import { ref } from 'vue'
import { NewBeneficiaryPanama } from '../../types/beneficiary.interface'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { BeneficiaryService } from '../../services/beneficiary'
import { useRouter } from 'vue-router'

const formObjectPanama = ref<NewBeneficiaryPanama>({
  counterpartyId: '',
  achInstructions: {
    accountDestinationNumber: '',
    bankName: '',
    concept: '',
    holderEmail: '',
    holderId: '',
    holderName: '',
    productType: {
      PACA: '',
      PACC: '',
      LOAN: '',
      ICCP: '',
    },
  },
  isInternal: '',
})

const isUpdateBeneficiary = ref<boolean>(false)

export const useNewBeneficiaryPanama = () => {
  const router = useRouter()
  const toast = useToast()
  const submitting = ref(false)
  const { t } = useI18n({ useScope: 'global' })

  const productAccountType = ref([
    { name: 'PACA-Cuenta Ahorro', code: 'PACA' },
    { name: 'PACC-Cuenta Corriente', code: 'PACC' },
    { name: 'LOAN-Prestamo', code: 'LOAN' },
    { name: 'ICCP-Tarjeta de crédito', code: 'ICCP' },
  ])

  const validateFields = () => {
    const achPanama = formObjectPanama.value
    return [
      achPanama.achInstructions.bankName,
      achPanama.achInstructions.accountDestinationNumber,
      achPanama.achInstructions.productType,
      achPanama.achInstructions.holderName,
      achPanama.achInstructions.holderId,
      achPanama.achInstructions.holderEmail,
    ].every(field => field.toString() !== '')
  }

  const setDataBeneficiary = (beneficiary: any) => {
    isUpdateBeneficiary.value = true
    formObjectPanama.value = beneficiary
    formObjectPanama.value.counterpartyId = beneficiary.counterpartyId

    router.push(`/withdraw/panama/new`)
  }
  const save = () => {
    if (!validateFields()) {
      toast.add({
        severity: 'warn',
        summary: t('warningAllFieldRequired'),
        detail: t('warningDetailAllFieldRequired'),
        life: 4000,
      })
      return
    }
    if (!isUpdateBeneficiary.value) {
      delete formObjectPanama.value.counterpartyId
    }
    submitting.value = true
    try {
      new BeneficiaryService().saveBeneficiaryAchPanama(formObjectPanama.value).then(response => {
        toast.add({
          severity: 'success',
          summary: t('success'),
          detail: t(response.data.message),
          life: 4000,
        })
        isUpdateBeneficiary.value = false
        setTimeout(() => {
          router.push(`/withdraw/panama`)
        }, 2000)
      })
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: t('error'),
        detail: t('errorDetail'),
        life: 4000,
      })
      submitting.value = false
    }
  }

  const toBack = () => {
    router.back()
  }

  return {
    formObjectPanama,
    productAccountType,
    save,
    toBack,
    setDataBeneficiary,
    submitting,
  }
}
