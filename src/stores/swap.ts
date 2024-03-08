import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { SwapService } from '../views/swap/services/swap'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { ExchangeCreated, ExchangeResponse } from '../views/swap/types/quote-response.interface'
import { SummarySwap } from '../views/swap/types/sumary'
import { ExchangeData } from '../views/swap/types/create-exchange-response.interface'
import { AssetsService } from '../views/deposit/services/assets'
import { Asset, AssetClassificationEnum } from '../views/deposit/types/asset.interface'

export const useSwapStore = defineStore('swap', () => {
  const { t } = useI18n({ useScope: 'global' })

  const router = useRouter()
  const toast = useToast()
  const baseAmount = ref(0.0)
  const feeAmount = ref(0.0)
  const feeNoba = ref(0.0)
  const totalAmount = ref(0.0)
  const unitCount = ref(0.0)
  const amount = ref(0.0)
  const amountAfterRemovingFee = ref(0.0)
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
  let timer: any
  const shouldRefreshQuote = ref(false)
  const assetCode = ref()
  const destinationWalletId = ref()
  const sourceWalletId = ref()
  const exchanges = ref<ExchangeResponse>({
    count: 0,
    nextPag: 1,
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
    amountAfterRemovingFee: 0,
  })
  const feeTradeDesk = ref(0.0)
  const totalSpend = ref(0.0)
  const exchange = ref<ExchangeData>()
  const filteredListAssetCrypto = ref<Asset[]>([])
  const allAssets = ref<Asset[]>([])
  const listAssets = async () => {
    await new AssetsService().list().then(data => {
      allAssets.value = data
      filteredListAssetCrypto.value = data.filter(list => list.assetClassification != AssetClassificationEnum.FIAT)
    })
  }
  listAssets()
  const setFeeTradeDesk = () => {
    if (transactionType.value === 'buy') {
      totalSpend.value = baseAmount.value + feeAmount.value
    } else {
      totalSpend.value = amountAfterRemovingFee.value - feeAmount.value
    }
  }

  const swapBtnText = computed(() => {
    if (!shouldRefreshQuote.value && totalAmount.value === 0.0) {
      return 'REQUEST QUOTE'
    }

    return shouldRefreshQuote.value ? 'REFRESH QUOTE' : 'EXECUTE SWAP'
  })

  const createExchange = async () => {
    if (
      (transactionType.value === 'buy' && amountAfterRemovingFee.value === 0.0) ||
      (transactionType.value === 'sell' && unitCount.value === 0.0)
    )
      return

    loading.value = true

    if (transactionType.value === 'buy') {
      sourceWalletId.value = 'USD'
      destinationWalletId.value = assetCode.value
    } else {
      sourceWalletId.value = assetCode.value
      destinationWalletId.value = 'USD'
    }

    const amountFormated = amountIsUnitCount.value
      ? Math.trunc(unitCount.value * 1e6) / 1e6
      : amountAfterRemovingFee.value
    await new SwapService()
      .createExchange({
        amount: amountFormated,
        sourceWalletId: sourceWalletId.value,
        destinationWalletId: destinationWalletId.value,
        description: `Swap ${amountFormated} ${sourceWalletId} --> ${destinationWalletId.value}`,
      })
      .then(response => {
        exchange.value = response.data
        feeNoba.value = exchange.value?.feeNoba
        baseAmount.value = exchange.value?.sourceDetails.amountDebit
        feeAmount.value = exchange.value?.feeNoba

        totalAmount.value = exchange.value?.sourceDetails.amountDebit + feeAmount.value

        if (transactionType.value === 'buy') {
          unitCount.value = <number>exchange.value?.destinationDetails?.amountCredit
        } else {
          amountAfterRemovingFee.value = <number>exchange.value?.destinationDetails?.amountCredit - feeNoba.value
          unitCount.value = <number>exchange.value?.sourceDetails?.amountDebit
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
    if (amountAfterRemovingFee.value === 0.0) return
    loading.value = true

    await new SwapService()
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
        transactionSummary.value.unitCount = Math.trunc(unitCount.value * 1e6) / 1e6
        transactionSummary.value.exchangeId = exchangeId.value
        transactionSummary.value.feeNoba = feeNoba.value
        transactionSummary.value.feeTradeDesk = feeTradeDesk.value
        transactionSummary.value.totalSpend = totalSpend.value
        transactionSummary.value.amountAfterRemovingFee = amountAfterRemovingFee.value

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
    amountAfterRemovingFee.value = 0.0
    // progressBarSeconds.value = 10
    // progressBarPercent.value = 0
    shouldRefreshQuote.value = false
  }

  const fetchExchanges = async () => {
    loading.value = true

    await new SwapService().exchanges().then(response => {
      exchanges.value = response
      loading.value = false
    })
  }

  const switchTransactionType = async () => {
    if (transactionType.value === 'buy') {
      amountIsUnitCount.value = true
      if (amountAfterRemovingFee.value > 0.0) {
        amountAfterRemovingFee.value = 0.0
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
    await new SwapService().cancelQuote(exchangeId.value).then(() => (exchangeId.value = undefined))
  }

  const getNextPage = async () => {
    loading.value = true

    await new SwapService()
      .exchanges(exchanges.value.nextPag)
      .then(response => {
        response.results.forEach((result: ExchangeCreated) => {
          exchanges.value.results.push(result)
        })
        exchanges.value.nextPag = response.nextPag
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
    fetchExchanges,
    exchanges,
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
    destinationWalletId,
    sourceWalletId,
    amountAfterRemovingFee,
    filteredListAssetCrypto,
    allAssets,
  }
})
