import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BeneficiaryService } from '../services/beneficiary'
import { WithdrawForm } from '../types/withdraw'

export const useWithdraw = (items: any) => {
  const formObject = ref<WithdrawForm | any>({})
  const router = useRouter()
  const toast = useToast()

  const nextStepPage = (event: any) => {
    for (let field in event.formData) {
      formObject.value[field] = event.formData[field]
    }

    router.push(items.value[event.pageIndex + 1].to)
  }
  const prevStepPage = (event: any) => {
    router.push(items.value[event.pageIndex - 1].to)
  }

  const stepComplete = () => {
    router.push('/withdraw')
    toast.add({
      severity: 'success',
      summary: 'Order submitted',
      detail: 'Your order completed.',
      life: 4000,
    })
  }

  const toBack = () => {
    router.back()
  }

  return {
    formObject,

    nextStepPage,
    prevStepPage,
    stepComplete,
    toBack,
  }
}
