import { useSwapStore } from '../stores/swap'
import { storeToRefs } from 'pinia'
import successIcon from '../assets/icons/success.svg'
import calculateBalance from '../shared/calculateBalance'

export const useSwap = () => {
  const swapStore = useSwapStore()
  const swap = storeToRefs(swapStore)

  const formatFiat = (amount: number) => {
    return calculateBalance('USD', amount, 0)
  }

  return { ...swap, successIcon, formatFiat }
}
