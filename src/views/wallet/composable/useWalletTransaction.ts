import { onMounted, ref } from 'vue'
import { HistoricService } from '../services/historic'
import { formatDate } from '../../../shared/formatDate'
import { TransactionModalPayload } from '../../../types/transactionModal.interface'
import { LisTransaction } from '../types/historic-transactions-response.interface'
import { useAssets } from '../../../composables/useAssets'
import { FiatAssetCodes } from '../types/assetCodes.interface'
import { TypeBankDetails } from '../../withdraw/enums/beneficiary.enum'
import { BankData } from '../../deposit/types/fiat.interface'
import { processException } from '../../../shared/processException'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { FiatService } from '../../deposit/services/fiat'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import { Asset, BalanceWallet } from '../../deposit/types/asset.interface'
import { useRoute } from 'vue-router'
import { TransactionType } from '../../swap/types/quote-response.interface'

const dataBank = ref<BankData>()
const bankNational = ref()
const bankInternational = ref()
const bankPanama = ref()
const asset = ref<Asset | null>()
const wallet = ref<BalanceWallet | undefined>()
export const useWalletTransaction = () => {
  const listTransaction = ref<LisTransaction[]>([])
  const submitting = ref(false)
  const nextPage = ref({
    nextPage: false,
    data: '',
  })
  const displayModalTransactionDetail = ref(false)
  const isLoadingTransactionDetails = ref(false)
  const modalTransactionDetail: any = ref({})
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const { listAssets, getAssetByAssetId, getAssetByAssetCode } = useAssets()
  const { getWalletByAssetCode } = useBalanceWallet()
  const route = useRoute()
  const assetCode: string = route.params.assetCode.toString()
  asset.value = getAssetByAssetCode(assetCode)
  const fetchWalletTransactions = async (assetCode: string) => {
    isLoadingTransactionDetails.value = true
    await new HistoricService()
      .historic(assetCode)
      .then(data => {
        data.results.forEach(element => {
          listTransaction.value.push(element)
        })
        if (data.nextPag) {
          nextPage.value.nextPage = true
          nextPage.value.data = data.nextPag
        }
        isLoadingTransactionDetails.value = false
      })
      .catch(error => {
        isLoadingTransactionDetails.value = false
        processException(toast, t, error)
      })
  }
  const getTransactionType = (transactionData: any) => {
    if (
      transactionData.assetCode === FiatAssetCodes.USD &&
      transactionData.transactionType === TransactionType.DEPOSIT
    ) {
      return 'deposit-fiat'
    }

    if (transactionData.assetCode === FiatAssetCodes.USD && transactionData.isInternal) {
      return 'internal-fiat'
    }

    if (
      !transactionData.isInternal &&
      transactionData.assetCode === FiatAssetCodes.USD &&
      transactionData.to?.typeBeneficiaryBankWithdrawal === TypeBankDetails.NATIONAL
    ) {
      return 'external-fiat-domestic'
    }

    if (
      !transactionData.isInternal &&
      transactionData.assetCode === FiatAssetCodes.USD &&
      transactionData.to?.typeBeneficiaryBankWithdrawal === TypeBankDetails.INTERNATIONAL
    ) {
      return 'external-fiat-international'
    }

    if (
      transactionData.transactionType === TransactionType.DEPOSIT &&
      transactionData.assetCode !== FiatAssetCodes.USD
    ) {
      return 'deposit-asset'
    }

    if (transactionData.isInternal && transactionData.assetCode !== FiatAssetCodes.USD) {
      return 'internal-asset'
    }

    if (!transactionData.isInternal && transactionData.assetCode !== FiatAssetCodes.USD) {
      return 'external-asset'
    }
  }

  onMounted(async () => {
    wallet.value = getWalletByAssetCode(assetCode)
    new FiatService()
      .bankData()
      .then(data => {
        dataBank.value = data

        bankNational.value = dataBank.value.domestic

        bankInternational.value = dataBank.value.international

        bankPanama.value = dataBank.value.achPab
      })
      .catch(e => {
        processException(toast, t, e)
      })
  })
  const loadMoreItems = async (assetCode?: string) => {
    if (!assetCode) return
    submitting.value = true

    await new HistoricService()
      .historicNextPage(assetCode, nextPage.value.data)
      .then(data => {
        data.results.forEach(element => {
          listTransaction.value.push(element)
        })

        nextPage.value.data = data.nextPag
        nextPage.value.nextPage = false
        submitting.value = false

        if (data.nextPag) {
          nextPage.value.nextPage = true
        }
      })
      .catch(e => {
        processException(toast, t, e)
      })
  }

  const prepareTransactionName = (transaction: any) => {
    return {
      ...transaction,
      nameTo: `${transaction.beneficiary?.name ?? transaction?.nameTo ?? transaction.to?.label ?? ''}`,
    }
  }
  const openModalTransactionDetails = (event: any, transaction: any) => {
    isLoadingTransactionDetails.value = true
    transaction.specificType = getTransactionType(transaction)

    transaction.formatedDate = formatDate(transaction.createdAt)

    modalTransactionDetail.value = transaction

    loadTransactionDetail(transaction)
  }

  const loadTransactionDetail = async (transaction: any) => {
    const assetCode = getAssetByAssetId(transaction.assetId)?.code ?? ''
    await new HistoricService()
      .findTransactionByTransactionId(transaction.transactionId, transaction.isInternal, assetCode)
      .then(data => {
        const nameTo = `${transaction.beneficiary?.name ?? transaction?.nameTo ?? transaction.to?.label ?? ''}`
        displayModalTransactionDetail.value = true
        isLoadingTransactionDetails.value = false
        modalTransactionDetail.value = {
          ...modalTransactionDetail.value,
          ...(data as TransactionModalPayload),
          nameTo,
        } as TransactionModalPayload
      })
      .catch(e => {
        processException(toast, t, e)
      })
  }
  return {
    listTransaction,
    submitting,
    nextPage,
    loadTransactionDetail,
    isLoadingTransactionDetails,
    fetchWalletTransactions,
    loadMoreItems,
    prepareTransactionName,
    openModalTransactionDetails,
    displayModalTransactionDetail,
    modalTransactionDetail,
    getTransactionType,
    listAssets,
    dataBank,
    bankNational,
    bankInternational,
    bankPanama,
    wallet,
    asset,
  }
}