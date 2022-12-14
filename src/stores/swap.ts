import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { SwapService } from '../views/swap/services/swap';

export const useSwapStore = defineStore('swap', () => {
  const baseAmount = ref(0.00)
  const feeAmount = ref(0.00)
  const totalAmount = ref(0.00)
  const unitCount = ref(0.00000000)
  const amount = ref(0.00)
  const amountIsUnitCount = ref(false)
  const transactionType = ref('buy')
  const assetId = ref()
  const assetName = ref()
  const assetIcon = ref()
  const quoteId = ref()
  const showModalAssetSelector = ref(false)
  const progressBarPercent = ref(0)
  const progressBarSeconds = ref(0)
  const swapping = ref(false)

  const swapBtnText = computed(() => {
    return progressBarPercent.value === 100 ? 'REFRESH QUOTE' : 'ASSET SWAP'
  })

  const createQuote = async () => {
    if (amount.value === 0.00) return;
    swapping.value = true;
    const swapService = SwapService.instance()
    await swapService.createQuote({
      amount: amount.value,
      amountIsUnitCount: amountIsUnitCount.value,
      transactionType: transactionType.value,
      assetId: assetId.value
    })
      .then(response => {
        assetId.value = response.data.assetId
        quoteId.value = response.data.quoteId
        baseAmount.value = response.data.baseAmount
        feeAmount.value = response.data.feeAmount
        totalAmount.value = response.data.totalAmount
        unitCount.value = response.data.unitCount
        swapping.value = false;
      }).catch(() => {
        swapping.value = false;
      })
  }



  return {
    baseAmount,
    feeAmount,
    totalAmount,
    amount,
    amountIsUnitCount,
    transactionType,
    assetId,
    assetName,
    assetIcon,
    createQuote,
    unitCount,
    showModalAssetSelector,
    progressBarPercent,
    progressBarSeconds,
    swapBtnText
  }
})
