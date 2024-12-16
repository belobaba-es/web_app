import { ref } from 'vue'
import { CalculateFee } from '../type/withdraw'
import { WithdrawService } from '../services/withdraw'
import { processException } from '../../../shared/processException'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

export const useCalculateFee = () => {
  const fee = ref(0)
  const assetsCode = ref('')
  const withdrawService = new WithdrawService()
  const submitting = ref(false)
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })

  const handleCalculateFee = async (feeData: CalculateFee) => {
    submitting.value = true
    try {
      const response = await withdrawService.makeCalculateFee(feeData)
      fee.value = response.fee
      assetsCode.value = response.assetCode
    } catch (e) {
      processException(toast, t, e)
    } finally {
      submitting.value = false
    }
  }

  return { fee, assetsCode, handleCalculateFee, submitting }
}
