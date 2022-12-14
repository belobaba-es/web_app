import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { SwapService } from '../views/swap/services/swap'

export const useSwapStore = defineStore('swap', () => {
  const baseAmount = ref(0.0)
  const feeAmount = ref(0.0)
  const totalAmount = ref(0.0)
  const unitCount = ref(0.0)
  const amount = ref(0.0)
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
  const timer = ref()
  const shouldRefreshQuote = ref(false)

  const swapBtnText = computed(() => {
    return progressBarPercent.value === 100 ? 'REFRESH QUOTE' : 'ASSET SWAP'
  })

  const createQuote = async () => {
    if (amount.value === 0.0) return
    swapping.value = true
    const swapService = SwapService.instance()
    await swapService
      .createQuote({
        amount: amount.value,
        amountIsUnitCount: amountIsUnitCount.value,
        transactionType: transactionType.value,
        assetId: assetId.value,
      })
      .then(response => {
        assetId.value = response.data.assetId
        quoteId.value = response.data.quoteId
        baseAmount.value = response.data.baseAmount
        feeAmount.value = response.data.feeAmount
        totalAmount.value = response.data.totalAmount
        unitCount.value = response.data.unitCount
        swapping.value = false
        startTimer()
      })
      .catch(() => {
        swapping.value = false
      })
  }

  const swapHandler = async () => {
    if (amount.value === 0.0) return
    console.log(shouldRefreshQuote.value)
    if (!shouldRefreshQuote.value) {
      swapping.value = true
      const swapService = SwapService.instance()
      await swapService
        .execute(quoteId.value)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      refreshQuote()
    }
  }

  const startTimer = () => {
    timer.value = setInterval(() => {
      if (progressBarSeconds.value < 10) {
        progressBarSeconds.value = progressBarSeconds.value + 1
        progressBarPercent.value = progressBarSeconds.value * 10
      }
    }, 1000)
  }
  const clearTimer = () => {
    clearInterval(timer.value)
    timer.value = undefined
  }

  watch(progressBarSeconds, newValue => {
    if (newValue === 10) clearTimer()
  })

  watch(timer, (newValue, oldValue) => {
    if (!newValue && oldValue) shouldRefreshQuote.value = true
  })

  const refreshQuote = () => {
    assetId.value = undefined
    quoteId.value = undefined
    baseAmount.value = 0.0
    feeAmount.value = 0.0
    totalAmount.value = 0.0
    unitCount.value = 0.0
    amount.value = 0.0
    progressBarSeconds.value = 0
    progressBarPercent.value = 0
    assetIcon.value = undefined
    assetName.value = undefined
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
    swapBtnText,
    swapping,
    swapHandler,
    quoteId,
    startTimer,
    clearTimer,
  }
})
