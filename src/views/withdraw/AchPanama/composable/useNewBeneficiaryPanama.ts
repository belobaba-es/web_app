import { ref } from 'vue'
import { NewBeneficiaryPanama } from '../../types/beneficiary.interface'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { BeneficiaryService } from '../../services/beneficiary'
import { useRouter } from 'vue-router'

const formObjectPanama = ref<NewBeneficiaryPanama>({
  bankName: '',
  accountDestinationNumber: '',
  holderEmail: '',
  productType: {
    PACA: '',
    PACC: '',
    LOAN: '',
    ICCP: '',
  },
  holderId: '',
  holderName: '',
  concept: '',
  isInternal: 'S',
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

  const setDataBeneficiary = (beneficiary: any) => {
    console.log(beneficiary)
    isUpdateBeneficiary.value = true
    formObjectPanama.value = beneficiary
    formObjectPanama.value.holderId = beneficiary.holderId

    router.push(`/withdraw/panama/new`)
  }

  const validateFields = () => {
    const achPanama = formObjectPanama.value
    return [
      achPanama.bankName,
      achPanama.accountDestinationNumber,
      achPanama.productType,
      achPanama.holderName,
      achPanama.holderId,
      achPanama.holderEmail,
    ].every(field => field.toString() !== '')
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
    submitting.value = true
    try {
      new BeneficiaryService()
        .saveBeneficiaryAchPanama({
          achInstructions: formObjectPanama.value,
        })
        .then(response => {
          toast.add({
            severity: 'success',
            summary: t('success'),
            detail: t(response.data.message),
            life: 4000,
          })
        })
      setTimeout(() => {
        router.push(`/withdraw/panama`)
      }, 2000)
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
