import { computed, onMounted, ref } from 'vue'
import { MakeFiatExternalTransfer } from '../../types/withdraw'
import { useToast } from 'primevue/usetoast'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useAuth } from '../../../../composables/useAuth'

const transactionData = ref<MakeFiatExternalTransfer>({} as MakeFiatExternalTransfer)

export const useTransactionPab = () => {
  const { getUserFeeACHPA } = useAuth()
  const transactionId = ref('')

  const toast = useToast()
  const { getBalanceByCode } = useBalanceWallet()
  const fee = ref(0)
  const balance = ref(0)
  const amount = ref(0)
  
  balance.value = getBalanceByCode('USD_PA')

  const events = ref<any>([
    { amount: '15', label: 'Fee', name: false },
    { amount: '10', label: `You send to `, name: true },
  ])

  onMounted( async () =>{
    getUserFee()
  })

  const getUserFee = () => {
    fee.value = getUserFeeACHPA().out
  }
  const amountFee = computed(() => {
    const total = isNaN(transactionData.value.amount + fee.value) ? 0 : amount.value + fee.value
    if (total > balance.value) {
      toast.add({
        severity: 'warn',
        summary: 'Order structure',
        detail: 'Please enter the amount you wish to send.',
        life: 4000,
      })

      transactionData.value.amount = 0

      return 0
    }

    return total
  })

  const validateField = (): boolean => {
    if (transactionData.value.amount == 0) {
      toast.add({
        severity: 'warn',
        summary: 'Order structure',
        detail: 'Please enter the amount you wish to send.',
        life: 4000,
      })

      return false
    }

    if (transactionData.value.reference.trim().length === 0) {
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
    amountFee,
    balance,
    amount,
    fee,
    transactionId,
  }
}
