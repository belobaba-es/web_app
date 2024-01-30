import { useTransactionAchPabStore } from '../stores/useTransactionAchPabStore'
import { ref } from 'vue'
import { MakeFiatExternalTransfer } from '../../types/withdraw'
import { useToast } from 'primevue/usetoast'

const { setInitialTransactionAchPab } = useTransactionAchPabStore()
const transactionData = ref<MakeFiatExternalTransfer>()
const toast = useToast()
export const useTransactionPab = () => {
  const events = ref<any>([
    { amount: '2,5', label: 'Fee', name: false },
    { amount: '2,5', label: `You send to `, name: true },
  ])

  const validateField = (): boolean => {
    if (transactionData.value?.amount == 0) {
      toast.add({
        severity: 'warn',
        summary: 'Order structure',
        detail: 'Please enter the amount you wish to send.',
        life: 4000,
      })

      return false
    }

    if (transactionData.value?.reference.trim().length === 0) {
      toast.add({
        severity: 'warn',
        summary: 'Order structure',
        detail: 'Please include a reference.',
        life: 4000,
      })

      return false
    }

    return true
  }

  return {
    transactionData,
    events,
    validateField,
  }
}
