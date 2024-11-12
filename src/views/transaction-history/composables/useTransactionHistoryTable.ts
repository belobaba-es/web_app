import { onMounted, ref, watch } from 'vue'
import {
  TransactionFiltersQueryType,
  TransactionFiltersQueryTypeKeys,
  TransactionHistory,
} from '../types/transaction-history-response.interface'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '../../../composables/useAuth'
import { TransactionHistoricService } from '../services/transaction-history'
import { formatDate } from '../../../shared/formatDate'
import { getAsset } from '../../../shared/getAsset'
import { generateTransactionHistory, jsPDFOptionsOrientationEnum } from '../../../shared/generatePdf'
import logo from '../../../assets/img/logo.png'
import { useI18n } from 'vue-i18n'
import { useAssets } from '../../../composables/useAssets'

export const useTransactionHistoryTable = () => {
  const { t } = useI18n({ useScope: 'global' })
  const selectedTypeTransaction = ref()
  const assetId = ref('')
  const startDate = ref()
  const endDate = ref()
  const isLoading = ref(true)
  const isLoadingPDF = ref(false)
  const filters: TransactionFiltersQueryType | any = {
    clientId: '',
    assetId: '',
    assetType: '',
    perPage: 10,
    startDate: '',
    page: 1,
    endDate: '',
    transactionType: '',
  }
  const transactionTypes = ref([
    { name: t('allTransactions'), code: '' },
    { name: t('depositTransactionName'), code: 'deposit' },
    { name: t('withdrawTransactionName'), code: 'withdraw-funds' },
  ])
  const lastFiltersApplied: any = ref({
    transactions: [],
    data: {
      startDate: null,
      endDate: null,
      assetId: '',
      assetType: '',
      selectedTransactionType: '',
    },
    nextPage: {
      nextPage: false,
      data: '',
    },
  })
  const toast = useToast()
  const assets = ref<{ name: string; assetId: string }[]>([])
  const { getUserName, getUserDni, getUserAddress } = useAuth()
  const listTransaction = ref<TransactionHistory[]>([])
  const submitting = ref(false)
  const displayModalTransactionDetail = ref(false)
  const isLoadingTransactionDetails = ref(false)
  const modalTransactionDetail = ref<TransactionHistory>()
  const nextPage = ref({
    nextPage: false,
    data: '',
  })
  const { getAssets, listAssets } = useAssets()
  const shouldClearPaginator = ref(true)
  onMounted(async () => {
    await getAssetsHistory()
    await getTransactions({
      perPage: 10,
      startDate: '',
      page: 1,
    })
  })

  const getAssetsHistory = async () => {
    await getAssets()

    let a = []
    const allAssetsOption = {
      name: t('allItems'),
      assetId: '',
    }

    // Initialize the variable to stores the "USD" asset
    let usdAsset = null

    listAssets.value.forEach(asset => {
      if (asset.code === 'USD') {
        // If the asset's assetId is "USD", stores it in the usdAsset variable
        usdAsset = {
          name: asset.name,
          assetId: asset.assetId,
        }
      } else {
        a.push({
          name: asset.name,
          assetId: asset.assetId,
        })
      }
    })

    // If the "USD" asset was found, add it to the beginning of the array
    if (usdAsset) {
      a.unshift(usdAsset)
    }

    // add al options at the begining
    a.unshift(allAssetsOption)

    assets.value = a
  }

  const getTransactions = async (filters: any = {}) => {
    registerSearchFilters({})
    isLoading.value = true
    isLoadingPDF.value = true
    submitting.value = true

    // todo send nextPage as page into the payload
    await new TransactionHistoricService()
      .getHistoric(filters)
      .then(data => {
        submitting.value = false
        isLoading.value = false
        isLoadingPDF.value = false

        data.results.forEach((element: TransactionHistory) => {
          element.formatedDate = formatDate(element.createdAt)
          element.assetCode = getAsset(element.assetId, listAssets.value).code
          listTransaction.value.push(element)
        })

        nextPage.value.data = data.nextPag
        nextPage.value.nextPage = false

        if (data.nextPag) {
          nextPage.value.nextPage = true
          nextPage.value.data = data.nextPag
        }

        registerSearchFilters({
          assetId: filters.assetId,
          assetType: filters.assetType,
          startDate: startDate.value,
          endDate: endDate.value,
          selectedTransactionType: filters.transactionType,
        })
      })
      .catch(() => {
        registerSearchFilters({})
      })
  }

  const loadMoreItems = async () => {
    isLoading.value = true
    isLoadingPDF.value = true
    submitting.value = true

    await filtersChange('page', nextPage.value.data)
    await getTransactions(filters)
  }

  const isValidDates = (): boolean => {
    if (!startDate.value) {
      return true
    }

    if (startDate.value && endDate.value && startDate.value < endDate.value) {
      filtersChange('startDate', startDate.value)
      filtersChange('endDate', endDate.value)
    } else {
      filtersChange('startDate', '')
      filtersChange('endDate', '')
    }

    return startDate.value && endDate.value && startDate.value <= endDate.value
  }

  watch(startDate, async newValue => {
    if (startDate) {
      await filtersChange('startDate', newValue)
    }
  })

  watch(endDate, async newValue => {
    if (startDate) {
      await filtersChange('endDate', newValue)
    }
  })

  watch(selectedTypeTransaction, async newValue => {
    if (selectedTypeTransaction) {
      await filtersChange('transactionType', newValue)
    }
  })

  watch(assetId, async newValue => {
    if (assetId) {
      await filtersChange('assetId', newValue)
    }
  })

  const filtersChange = async (key: TransactionFiltersQueryTypeKeys, value: any) => {
    filters[key] = value
  }

  const title = t('transactionHistory')
  const footerPdf = t('footerPdfNobaData')

  // todo set company name when ready
  const username = getUserName()
  let extractPDFInfo: any = {}
  const downloadExtract = () => {
    isLoadingPDF.value = true

    setTimeout(() => {
      extractPDFInfo = []

      const owner = {
        name: username,
        id: getUserDni(),
        address: getUserAddress(),
      }

      isLoadingPDF.value = false

      const nameFile = `${username} ${t('namePdfTransactionHistory')}`
      const maxReferenceLength = 59

      listTransaction.value.forEach((transaction, i) => {
        const data = {
          assetCode: getAsset(transaction.assetId, listAssets.value).code,
          reference:
            transaction.reference.length > maxReferenceLength
              ? transaction.reference.slice(0, maxReferenceLength)
              : transaction.reference,
          createdAt: transaction.formatedDate,
          amount: Number(transaction.amount.toFixed(8).replace(/\.?0*$/, '')),
        }
        extractPDFInfo[i] = data
      })

      generateTransactionHistory(
        nameFile,
        logo,
        'BELOBABA',
        jsPDFOptionsOrientationEnum.LANDSCAPE,
        extractPDFInfo,
        owner,
        {
          ownersName: t('ownersName'),
          documentPlaceholder: t('documentPlaceholder'),
          divisorLabel: t('divisorLabel'),
          extractGenerated: t('extractGenerated'),
          from: t('from'),
          to: t('to'),
        },
        prepareDatesFilterPDF()
      )
    }, 2000)
  }

  const prepareDatesFilterPDF = () => {
    return {
      startDate: lastFiltersApplied.value.data.startDate ? formatDate(lastFiltersApplied.value.data.startDate) : '',
      endDate: lastFiltersApplied.value.data.endDate ? formatDate(lastFiltersApplied.value.data.endDate) : '',
    }
  }

  const registerSearchFilters = (filters: any) => {
    lastFiltersApplied.value = {
      data: {
        startDate: filters.startDate,
        endDate: filters.endDate,
        assetId: filters.assetId,
        assetType: filters.assetType,
        selectedTransactionType: filters.selectedTransactionType,
      },
    }
  }

  const search = async () => {
    if (!isValidDates()) {
      toast.add({
        severity: 'info',
        summary: t('somethingWentWrong'),
        detail: t('endDateGreaterStartDate'),
        life: 4000,
      })
    }

    const shouldResetPaginator = !areFiltersEqual()

    // when filters has changed, should reset the paginator
    if (shouldResetPaginator) {
      nextPage.value.data = '1'
      filters.page = '1'
    }
    listTransaction.value = []
    await getTransactions(filters)
  }

  const areFiltersEqual = (): boolean => {
    const transactionType1 = selectedTypeTransaction.value ? selectedTypeTransaction.value : ''
    const assetId1 = filters.assetId ? filters.assetId : ''
    const startDate1 = filters.startDate ? filters.startDate : ''
    const endDate1 = filters.endDate ? filters.endDate : ''

    const transactionType2 = lastFiltersApplied.value.data.selectedTransactionType
      ? lastFiltersApplied.value.data.selectedTransactionType
      : ''
    const assetId2 = lastFiltersApplied.value.data.assetId ? lastFiltersApplied.value.data.assetId : ''
    const startDate2 = lastFiltersApplied.value.data.startDate ? lastFiltersApplied.value.data.startDate : ''
    const endDate2 = lastFiltersApplied.value.data.endDate ? lastFiltersApplied.value.data.endDate : ''

    const areTransantionTypesEqual = transactionType1 === transactionType2

    const areAssetIdsEqual = assetId1 === assetId2

    const areDatesEqual = startDate1 === startDate2 && endDate1 === endDate2

    return areDatesEqual && areAssetIdsEqual && areTransantionTypesEqual
  }

  const openModalTransactionDetails = (event: any, transaction: TransactionHistory) => {
    isLoadingTransactionDetails.value = true
    transaction.formatedDate = transaction.formatedDate
    transaction.amount = Number(transaction.amount.toFixed(8).replace(/\.?0*$/, ''))
    modalTransactionDetail.value = transaction

    // loadTransactionDetail(transaction)

    displayModalTransactionDetail.value = true
    isLoadingTransactionDetails.value = false
  }

  const isNullOrUndefinedOrEmpty = (value: any) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '') ||
      (Array.isArray(value) && value.length === 0)
    )
  }

  return {
    title,
    assetId,
    assets,
    selectedTypeTransaction,
    startDate,
    listAssets,
    endDate,
    isLoading,
    isLoadingPDF,
    filters,
    transactionTypes,
    listTransaction,
    submitting,
    displayModalTransactionDetail,
    isLoadingTransactionDetails,
    modalTransactionDetail,
    nextPage,
    downloadExtract,
    search,
    openModalTransactionDetails,
    loadMoreItems,
    shouldClearPaginator,
    isNullOrUndefinedOrEmpty,
    getAssetsHistory,
    getTransactions,
  }
}
