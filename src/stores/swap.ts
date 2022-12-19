import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { SwapService } from '../views/swap/services/swap'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBalanceWallet } from '../composables/useBalanceWallet'

export const useSwapStore = defineStore('swap', () => {
  const { t } = useI18n({ useScope: 'global' })
  const { updateBlockedBalanceWalletByCode } = useBalanceWallet()
  const router = useRouter()
  const toast = useToast()
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
  const loading = ref(false)
  const timer = ref()
  const shouldRefreshQuote = ref(false)
  const assetCode = ref()
  const quotes = ref({
    count: 0,
    nextPag: null,
    prevPag: null,
    results: [],
  })

  const swapBtnText = computed(() => {
    return shouldRefreshQuote.value ? 'REFRESH QUOTE' : 'ASSET SWAP'
  })

  const createQuote = async () => {
    
    if (
      (transactionType.value === 'buy' && amount.value === 0.0) ||
      (transactionType.value === 'sell' && unitCount.value === 0.0)
    ) return

    loading.value = true
    const swapService = SwapService.instance()
    await swapService
      .createQuote({
        amount: amountIsUnitCount.value ? unitCount.value : amount.value,
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
        if (transactionType.value === 'buy') {
          unitCount.value = response.data.unitCount
        }
        loading.value = false
        if (transactionType.value === 'sell') {
          amount.value = response.data.baseAmount
        }
        startTimer()
      })
      .catch(() => {
        loading.value = false
      })
  }

  const executeQuote = async () => {
    if (amount.value === 0.0) return
    loading.value = true
    const swapService = SwapService.instance()
    await swapService
      .execute(quoteId.value)
      .then(response => {
        toast.add({
          severity: 'success',
          summary: t('successfulOperation'),
          detail: response.message,
          life: 4000,
        })
        loading.value = false;
        updateBlockedBalanceWalletByCode("USD", amount.value)
        clearTimer()
        router.push('/swap/success')
      })
      .catch(error => {
        loading.value = false
        toast.add({
          severity: 'error',
          summary: t('somethingWentWrong'),
          detail: error.response.data.message,
          life: 4000,
        })
      })
  }

  const swapHandler = async () => {
    if (shouldRefreshQuote.value) {
      refreshQuote()
      cancelQuote()
    } else {
      executeQuote()
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
    progressBarSeconds.value = 0
    progressBarPercent.value = 0
  }

  watch(progressBarSeconds, newValue => {
    if (newValue === 10) clearTimer()
  })

  watch(timer, (newValue, oldValue) => {
    console.log(newValue, oldValue);
    if (!newValue && oldValue) {
      shouldRefreshQuote.value = true
    }
  })

  const refreshQuote = async () => {
    assetId.value = undefined
    baseAmount.value = 0.0
    feeAmount.value = 0.0
    totalAmount.value = 0.0
    unitCount.value = 0.0
    amount.value = 0.0
    progressBarSeconds.value = 0
    progressBarPercent.value = 0
    assetIcon.value = undefined
    assetName.value = undefined
    shouldRefreshQuote.value = false
    assetCode.value = undefined
  }

  const fetchQuotes = async () => {
    const swapService = SwapService.instance()
    await swapService.quotes().then(response => {
      quotes.value = response
    })
  }

  const switchTransactionType = async () => {
    if (transactionType.value === 'buy') {
      amountIsUnitCount.value = true
      if (amount.value > 0.00) {
        amount.value = 0.00
      }
      transactionType.value = 'sell'
    } else {
      amountIsUnitCount.value = false
      if (unitCount.value > 0.00) {
        unitCount.value = 0.00
      }
      transactionType.value = 'buy'
    }

    if (quoteId.value) {
      clearTimer()
    }

    if (shouldRefreshQuote.value) {
      shouldRefreshQuote.value = false
    }
    
  }

  const cancelQuote = async () => {
    const swapService = SwapService.instance()
    await swapService.cancelQuote(quoteId.value).then(() => quoteId.value = undefined)
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
    loading,
    swapHandler,
    quoteId,
    startTimer,
    clearTimer,
    fetchQuotes,
    quotes,
    switchTransactionType,
    assetCode,
    refreshQuote
  }
})
