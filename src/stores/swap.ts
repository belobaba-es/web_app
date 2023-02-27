import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { SwapService } from '../views/swap/services/swap'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBalanceWallet } from '../composables/useBalanceWallet'
import { QuoteResponse } from '../views/swap/types/quote-response.interface'
import { SummarySwap } from '../views/swap/types/sumary'

export const useSwapStore = defineStore('swap', () => {
  const { t } = useI18n({ useScope: 'global' })
  const { fetchBalanceWallets } = useBalanceWallet()
  const router = useRouter()
  const toast = useToast()
  const baseAmount = ref(0.0)
  const feeAmount = ref(0.0)
  const feeNoba = ref(0.0)
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
  const quotes = ref<QuoteResponse>({
    count: 0,
    nextPag: '',
    prevPag: '',
    results: [],
  })
  const successExecuted = ref(false)
  const transactionSummary = ref<SummarySwap>({
    feeAmount: 0.0,
    totalAmount: 0.0,
    assetIcon: '',
    assetName: '',
    unitCount: 0.0,
    transactionType: '',
    quoteId: '',
    feeNoba: 0,
    feeTradeDesk: 0, totalSpend:0
  })
  const feeTradeDesk= ref(0.0)
  const totalSpend= ref(0.0)

  const setFeeTradeDesk = () => {
    if (transactionType.value === 'buy') {
      feeTradeDesk.value = Number((totalAmount.value - amount.value).toFixed(2))
      totalSpend.value = Number((totalAmount.value + feeNoba.value).toFixed(2))
      return
    }

    feeTradeDesk.value = Number((baseAmount.value - totalAmount.value).toFixed(2))
    totalSpend.value = Number((totalAmount.value - feeNoba.value).toFixed(2))
  }

  const swapBtnText = computed(() => {
    return shouldRefreshQuote.value ? 'REFRESH QUOTE' : 'ASSET SWAP'
  })

  const createQuote = async () => {
    if (
      (transactionType.value === 'buy' && amount.value === 0.0) ||
      (transactionType.value === 'sell' && unitCount.value === 0.0)
    )
      return

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
        feeNoba.value = response.data.feeNoba
        if (transactionType.value === 'buy') {
          unitCount.value = response.data.unitCount
        }

        amount.value = Number(response.data.amount)

        setFeeTradeDesk()

        loading.value = false
        if (transactionType.value === 'sell') {
          amount.value = response.data.baseAmount
        }
        startTimer()
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

  const executeQuote = async () => {
    if (amount.value === 0.0) return
    loading.value = true
    const swapService = SwapService.instance()
    await swapService
      .execute(quoteId.value)
      .then(async response => {
        successExecuted.value = true
        clearTimer()

        toast.add({
          severity: 'success',
          summary: t('successfulOperation'),
          detail: response.message,
          life: 5000,
        })
        loading.value = false

        transactionSummary.value.assetIcon = assetIcon.value
        transactionSummary.value.assetName = assetName.value
        transactionSummary.value.feeAmount = feeAmount.value
        transactionSummary.value.totalAmount = totalAmount.value
        transactionSummary.value.transactionType = transactionType.value
        transactionSummary.value.unitCount = unitCount.value
        transactionSummary.value.quoteId = quoteId.value
        transactionSummary.value.feeNoba = feeNoba.value
        transactionSummary.value.feeTradeDesk = feeTradeDesk.value
        transactionSummary.value.totalSpend = totalSpend.value

        router.push('/swap/success')
      })
      .catch(async error => {
        loading.value = false
        toast.add({
          severity: 'error',
          summary: t('somethingWentWrong'),
          detail: error.response.data.message,
          life: 4000,
        })
        await cancelQuote()
        clearTimer()
        refreshQuote()
      })
  }

  const swapHandler = async () => {
    if (shouldRefreshQuote.value) {
      refreshQuote()
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

  watch(progressBarSeconds, async newValue => {
    if (newValue === 10) {
      clearTimer()
      if (quoteId.value && !successExecuted.value) {
        shouldRefreshQuote.value = true
        await cancelQuote()
      }
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
    loading.value = true
    const swapService = SwapService.instance()
    await swapService.quotes().then(response => {
      quotes.value = response
      loading.value = false
    })
  }

  const switchTransactionType = async () => {
    if (transactionType.value === 'buy') {
      amountIsUnitCount.value = true
      if (amount.value > 0.0) {
        amount.value = 0.0
      }
      transactionType.value = 'sell'
    } else {
      amountIsUnitCount.value = false
      if (unitCount.value > 0.0) {
        unitCount.value = 0.0
      }
      transactionType.value = 'buy'
    }

    if (quoteId.value) {
      clearTimer()
      await cancelQuote()
    }

    if (shouldRefreshQuote.value) {
      shouldRefreshQuote.value = false
    }

    await clearSwap(transactionType.value)
  }

  const cancelQuote = async () => {
    const swapService = SwapService.instance()
    await swapService.cancelQuote(quoteId.value).then(() => (quoteId.value = undefined))
  }

  const getNextPage = async () => {
    loading.value = true
    const swapService = SwapService.instance()
    await swapService
      .nextQuotes(quotes.value.nextPag)
      .then(response => {
        response.results.forEach(result => {
          const existInResults = quotes.value.results.find(item => item.id === result.id)
          if (!existInResults) quotes.value.results.push(result)
        })
        quotes.value.nextPag = response.nextPag
      })
      .finally(() => {
        loading.value = false
      })
  }

  const clearSwap = async (typeTransaction = 'buy') => {
    refreshQuote()
    clearTimer()
    quoteId.value = ''
    // if (quoteId.value) {
    //   await cancelQuote();
    // }
    transactionType.value = typeTransaction
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
    refreshQuote,
    getNextPage,
    shouldRefreshQuote,
    clearSwap,
    transactionSummary,
    feeNoba,
    feeTradeDesk,
    totalSpend
  }
})
