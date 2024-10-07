import { ref } from 'vue'
import { RegisterCounterpartyAchPanama } from '../../types/beneficiary.interface'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { BeneficiaryService } from '../../services/beneficiary'
import { useRouter } from 'vue-router'
import { processException } from '../../../../shared/processException'

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
    return [achPanama.bankName, achPanama.accountDestinationNumber, achPanama.productType, achPanama.holderName].every(
      field => field.toString() !== ''
    )
  }

  const setDataBeneficiary = (beneficiary: any) => {
    isUpdateBeneficiary.value = true
    formObjectPanama.value = beneficiary

    router.push(`/withdraw/panama/new`)
  }
  const save = () => {
    submitting.value = true
    if (!validateFields()) {
      toast.add({
        severity: 'warn',
        summary: t('warningAllFieldRequired'),
        detail: t('warningDetailAllFieldRequired'),
        life: 4000,
      })
      return
    }
    try {
      new BeneficiaryService().saveBeneficiaryAchPanama(formObjectPanama.value).then(response => {
        isUpdateBeneficiary.value = false

        toast.add({
          severity: 'success',
          summary: t('success'),
          detail: t(response.data.message),
          life: 4000,
        })
        setTimeout(() => {
          router.push(`/withdraw/panama`)
        }, 2000)
      })
    } catch (error) {
      submitting.value = false

      processException(toast, t, error)
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
