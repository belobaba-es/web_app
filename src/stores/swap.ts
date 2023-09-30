import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { SwapService } from '../views/swap/services/swap'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBalanceWallet } from '../composables/useBalanceWallet'
import { QuoteResponse } from '../views/swap/types/quote-response.interface'
import { SummarySwap } from '../views/swap/types/sumary'
import { ExchangeData } from '../views/swap/types/create-quote-response.interface'

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
  const exchangeId = ref()
  const showModalAssetSelector = ref(false)
  const progressBarPercent = ref(0)
  const progressBarSeconds = ref(10)
  const loading = ref(false)
  let timer: number
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
    exchangeId: '',
    feeNoba: 0,
    feeTradeDesk: 0,
    totalSpend: 0,
  })
  const feeTradeDesk = ref(0.0)
  const totalSpend = ref(0.0)
  const exchange = ref<ExchangeData>()

  const setFeeTradeDesk = () => {
    console.log(' transactionType.value', transactionType.value)
    console.log('+setFeeTradeDesk')

    console.log(
      '== baseAmount.value, unitCount.value, feeNoba.value, totalAmount.value',
      baseAmount.value,
      unitCount.value,
      feeNoba.value,
      totalAmount.value
    )
    feeTradeDesk.value = Number((baseAmount.value - unitCount.value).toFixed(2))

    totalSpend.value = totalAmount.value
  }

  const swapBtnText = computed(() => {
    return shouldRefreshQuote.value ? 'REFRESH QUOTE' : 'ASSET SWAP'
  })

  const createExchange = async () => {
    if (
      (transactionType.value === 'buy' && amount.value === 0.0) ||
      (transactionType.value === 'sell' && unitCount.value === 0.0)
    )
      return

    loading.value = true
    let sourceWalletId = ''
    let destinationWalletId = ''
    const swapService = SwapService.instance()

    if (transactionType.value === 'buy') {
      sourceWalletId = 'USD'
      destinationWalletId = assetCode.value
    } else {
      sourceWalletId = assetCode.value
      destinationWalletId = 'USD'
    }

    const amountFormated = amountIsUnitCount.value ? Math.trunc(unitCount.value * 1e6) / 1e6 : amount.value
    await swapService
      .createExchange({
        amount: amountFormated,
        sourceWalletId,
        destinationWalletId,
        description: `Swap ${amountFormated} ${sourceWalletId} --> ${destinationWalletId}`,
      })
      .then(response => {
        exchange.value = response.data
        feeNoba.value = exchange.value?.feeNoba
        unitCount.value = <number>exchange.value?.destination_details?.amount_to_credit
        baseAmount.value = exchange.value?.source_details.amount_to_debit
        feeAmount.value = exchange.value?.feeNoba

        totalAmount.value = exchange.value?.source_details.amount_to_debit + feeAmount.value

        if (transactionType.value === 'sell') {
          unitCount.value = Number(unitCount.value.toFixed(6))
        }

        exchangeId.value = exchange.value?.exchangeId

        setFeeTradeDesk()

        loading.value = false

        // startTimer()
      })
      .catch(error => {
        loading.value = false
        shouldRefreshQuote.value = true
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
      .execute(exchangeId.value)
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
        transactionSummary.value.exchangeId = exchangeId.value
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
    timer = setInterval(() => {
      if (progressBarSeconds.value > 0) {
        progressBarSeconds.value = progressBarSeconds.value - 1
        progressBarPercent.value = progressBarSeconds.value * 10
      }
    }, 1000)
  }
  const clearTimer = () => {
    clearInterval(timer)
    timer = 0
    progressBarSeconds.value = 60
    progressBarPercent.value = 0
  }

  watch(progressBarSeconds, async newValue => {
    if (newValue === 0) {
      if (exchangeId.value && !successExecuted.value) {
        shouldRefreshQuote.value = true
        await cancelQuote()
      }
    }
  })

  const refreshQuote = async () => {
    baseAmount.value = 0.0
    feeAmount.value = 0.0
    totalAmount.value = 0.0
    unitCount.value = 0.0
    amount.value = 0.0
    // progressBarSeconds.value = 10
    // progressBarPercent.value = 0
    shouldRefreshQuote.value = false
  }

  const fetchQuotes = async () => {
    loading.value = true
    const swapService = SwapService.instance()
    await swapService.exchanges().then(response => {
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

    if (exchangeId.value) {
      // clearTimer()
      await cancelQuote()
    }

    if (shouldRefreshQuote.value) {
      shouldRefreshQuote.value = false
    }

    await clearSwap(transactionType.value)
  }

  const cancelQuote = async () => {
    const swapService = SwapService.instance()
    await swapService.cancelQuote(exchangeId.value).then(() => (exchangeId.value = undefined))
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
    // clearTimer()
    exchangeId.value = ''
    // if (exchangeId.value) {
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
    createExchange,
    unitCount,
    showModalAssetSelector,
    progressBarPercent,
    progressBarSeconds,
    swapBtnText,
    loading,
    swapHandler,
    exchangeId,
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
    totalSpend,
    exchange,
  }
})
