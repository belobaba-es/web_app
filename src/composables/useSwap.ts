import { useSwapStore } from '../stores/swap'
import { storeToRefs } from 'pinia'
import successIcon from '../assets/icons/success.svg'
import { useAssets } from './useAssets'

export const useSwap = () => {
  const swapStore = useSwapStore()
  const swap = storeToRefs(swapStore)
  const { formatAmountAccordingTypeAsset } = useAssets()

  const formatFiat = (amount: number) => {
    const total = isNaN(amount) ? 0 : amount
    return formatAmountAccordingTypeAsset(total, "USD")
  }

  return { ...swap, successIcon, formatFiat }
}
