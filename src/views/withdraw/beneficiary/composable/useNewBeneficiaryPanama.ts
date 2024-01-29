import { ref } from 'vue'
import { NewBeneficiaryPanama } from '../../types/beneficiary.interface'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { BeneficiaryService } from '../../services/beneficiary'

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
  isInternal: false,
})

export const useNewBeneficiaryPanama = () => {
  const toast = useToast()
  //const listBeneficiaryPanama = ref<BeneficiaryAchPanama[]>([])
  const { t } = useI18n({ useScope: 'global' })

  const productType = ref([
    { name: 'PACA-Cuenta Ahorro', code: 'PACA' },
    { name: 'PACC-Cuenta Corriente', code: 'PACC' },
    { name: 'LOAN-Prestamo', code: 'LOAN' },
    { name: 'ICCP-Tarjeta de crédito', code: 'ICCP' },
  ])

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

  // const getListBeneficiaryPanama = () => {
  //   new BeneficiaryService().listBeneficiaryAchPanama().then(response => {
  //     console.log('response', response)
  //     listBeneficiaryPanama.value = response.data
  //     // if (response.status === 200) {
  //     //   listBeneficiaryPanama.value = response.data
  //     //   console.log('listBeneficiaryPanama', listBeneficiaryPanama.value)
  //     // } else {
  //     //   toast.add({
  //     //     severity: 'error',
  //     //     summary: t('error'),
  //     //     detail: t('errorDetail'),
  //     //     life: 4000,
  //     //   })
  //     // }
  //   })
  // }

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
    new BeneficiaryService()
      .saveBeneficiaryAchPanama({
        achInstructions: formObjectPanama.value,
      })
      .then(response => {
        if (response.status === 200) {
          toast.add({
            severity: 'success',
            summary: t('success'),
            detail: t('successDetail'),
            life: 4000,
          })
        } else {
          toast.add({
            severity: 'error',
            summary: t('error'),
            detail: t('errorDetail'),
            life: 4000,
          })
        }
      })
  }

  return {
    formObjectPanama,
    productType,
    //listBeneficiaryPanama,
    save,
  }
}
