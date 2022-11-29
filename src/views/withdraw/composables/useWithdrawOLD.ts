import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BeneficiaryService } from '../services/beneficiary'
import { WithdrawForm } from '../types/withdraw'

export const useWithdrawOLD = (items: any) => {
  const listBeneficiary = ref<any[]>([])
  const formObject = ref<WithdrawForm | any>({})
  const router = useRouter()
  const toast = useToast()

  const nextStepPage = (event: any) => {
    for (let field in event.formData) {
      formObject.value[field] = event.formData[field]
    }
    console.log(formObject, 'nextpage')
    router.push(items.value[event.pageIndex + 1].to)
  }
  const prevStepPage = (event: any) => {
    router.push(items.value[event.pageIndex - 1].to)
  }

  const stepComplete = () => {
    router.push('successful')
    toast.add({
      severity: 'success',
      summary: 'Order submitted',
      detail: 'Dear, ' + formObject.value.firstname + ' ' + formObject.value.lastname + ' your order completed.',
    })
  }

  const toBack = () => {
    router.back()
  }

  const fetchBeneficiariesDomestic = async () => {
    const beneficiaryService = BeneficiaryService.instance()
    await beneficiaryService.listBeneficiaryDomestic().then(resp => {
      listBeneficiary.value = resp.results
    })
  }

  const fetchBeneficiariesInternational = async () => {
    const beneficiaryService = BeneficiaryService.instance()
    await beneficiaryService.listBeneficiaryInternacional().then(resp => {
      listBeneficiary.value = resp.results
    })
  }

  return {
    formObject,
    listBeneficiary,
    fetchBeneficiariesDomestic,
    fetchBeneficiariesInternational,
    nextStepPage,
    prevStepPage,
    stepComplete,
    toBack,
  }
}
