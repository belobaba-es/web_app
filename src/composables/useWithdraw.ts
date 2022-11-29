import { ref } from 'vue'
import { BeneficiaryInternal } from '../views/withdraw/types/beneficiary.interface'

export const useWithdraw = () => {
  const withdrawAsset = ref('USD')
  const beneficiary = ref<BeneficiaryInternal>()

  const setWithdrawAsset = (assetCode: string) => {
    withdrawAsset.value = assetCode
  }

  const setBeneficiary = (b: BeneficiaryInternal) => {
    console.log('SELECT', b)
    beneficiary.value = b
  }

  const getBeneficiary = (): BeneficiaryInternal => {
    return beneficiary.value as BeneficiaryInternal
  }

  const getWithdrawAsset = () => {
    return withdrawAsset
  }

  return {
    setBeneficiary,
    setWithdrawAsset,
    getBeneficiary,
    getWithdrawAsset,
  }
}
