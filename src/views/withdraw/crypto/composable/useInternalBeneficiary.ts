import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { Beneficiary, TableFilter } from '../../type/beneficiary.type'
import { BeneficiaryCryptoService } from '../../services/beneficiaryCrypto'
import { AccountService } from '../../../../shared/services/account'
import { CounterpartyStatus, CounterpartyType, NetworkBank } from '../../enums/beneficiary.enum'
import { useInternalBeneficiaryListStore } from '../../../../stores/useInternalBeneficiaryListStore'
import { useBeneficiaryCrypto } from './useBeneficiaryCrypto'
import { useWithdrawalCrypto } from './useWithdrawalCrypto'
import { useAssets } from '../../../../composables/useAssets'
import { processException } from '../../../../shared/processException'

const internalBeneficiaryListInitial = ref<Beneficiary>({
  accountId: '',
  assetCode: '',
  assetIcon: '',
  assetId: '',
  clientId: '',
  counterpartyId: '',
  counterpartyType: CounterpartyType.CRYPTO,
  createdAt: '',
  informationBank: {
    accountNumber: '',
    address: {
      city: '',
      country: '',
      postalCode: 0,
      region: '',
      streetOne: '',
      streetTwo: '',
    },
    bankName: '',
    networkBank: NetworkBank.WIRE,
  },
  informationOwner: {
    address: {
      city: '',
      country: '',
      postalCode: 0,
      region: '',
      streetOne: '',
      streetTwo: '',
    },
    name: '',
    counterpartyId: '',
    email: '',
    country: '',
  },
  informationWallet: {
    assetId: '',
    address: '',
    relationshipConsumer: 'SIBLING',
    originWallet: 'OTHER',
    institutionName: '',
    institutionAddress: {
      streetOne: '',
      postalCode: '',
      city: '',
      region: '',
      country: '',
    },
  },
  status: CounterpartyStatus.ACTIVE,
  networkBank: [],
  isInternal: '',
})
const currentPage = ref(1)
const totalRecords = ref(0)
const nextPag = ref(1)
const numberRecords = ref(10)
const totalPage = ref(0)

export function useInternalBeneficiary() {
  const { t } = useI18n({ useScope: 'global' })
  const toast = useToast()
  const router = useRouter()
  const { prepareData, isAssetEdit } = useBeneficiaryCrypto()
  const { resetFormWithdrawal, isWithdrawal } = useWithdrawalCrypto()
  const loading = ref(false)
  const isModalOpen = ref(false)
  const { getAssets, listAssets } = useAssets()
  const internalBeneficiaryListStore = useInternalBeneficiaryListStore()
  const filterInternal = ref<TableFilter>(internalBeneficiaryListStore.getFilters())
  const listInternalBeneficiary = ref<Beneficiary[]>(internalBeneficiaryListStore.getBeneficiary())

  internalBeneficiaryListStore.$subscribe((mutation, state) => {
    filterInternal.value = state.filter
    listInternalBeneficiary.value = state.beneficiary
    totalRecords.value = state.totalRecords
  })

  const fetchInternalBeneficiary = async (newListInternal?: boolean): Promise<void> => {
    if (newListInternal) {
      internalBeneficiaryListStore.clearFilter()
      internalBeneficiaryListStore.setNextPage(1)
    }
    loading.value = true

    new BeneficiaryCryptoService()
      .listBeneficiaryAssetsInternal(internalBeneficiaryListStore.getFilters())
      .then(result => {
        loading.value = false

        nextPag.value = Number(result.nextPag) ? Number(result.nextPag) : nextPag.value > 0 ? nextPag.value : 1
        internalBeneficiaryListStore.setNextPage(Number(result.nextPag))
        internalBeneficiaryListStore.setBeneficiary(result.results)

        internalBeneficiaryListStore.setTotalRecords(result.count)

        if (listAssets.value.length === 0) getAssets()
      })
      .catch(error => {
        processException(toast, t, error)
      })
  }

  const beneficiaryInternalSearch = (searchBeneficiary: string) => {
    let email = searchBeneficiary
    if (email.trim() === '') {
      toast.add({
        severity: 'warn',
        summary: 'please write an email',
        life: 4000,
      })
      return
    }

    loading.value = true
    new AccountService()
      .getAccountByEmail(email.toLowerCase())
      .then(resp => {
        loading.value = false

        internalBeneficiaryListInitial.value.informationOwner.name = resp.name
        internalBeneficiaryListInitial.value.clientId = resp.clientId
        internalBeneficiaryListInitial.value.counterpartyId = resp.clientId

        listInternalBeneficiary.value.push(internalBeneficiaryListInitial.value)
        internalBeneficiaryListStore.setBeneficiaryInternalPrevious(listInternalBeneficiary.value)

        listInternalBeneficiary.value = []
        listInternalBeneficiary.value.push(internalBeneficiaryListInitial.value)

        internalBeneficiaryListStore.setBeneficiary(listInternalBeneficiary.value)
        internalBeneficiaryListStore.setTotalRecords(listInternalBeneficiary.value.length)
      })
      .catch(error => {
        processException(toast, t, error)
      })
  }

  const goBack = () => {
    router.go(-1)
  }

  const columnsInternalHeader = [{ field: 'informationOwner.name', header: t('nameAndLastName') }]

  const makeWithdrawalInternal = (beneficiary: Beneficiary) => {
    if (beneficiary.status !== CounterpartyStatus.ACTIVE) return
    isAssetEdit.value = false
    isWithdrawal.value = true
    resetFormWithdrawal()
    prepareData(beneficiary)
    router.push('/withdraw/crypto/internal/make-withdrawal/' + beneficiary.counterpartyId)
  }

  totalPage.value = Math.ceil(totalRecords.value / numberRecords.value)

  const pagination = reactive({
    totalRecords: totalRecords.value,
    nextPag: nextPag.value,
    currentPage: currentPage.value,
    itemsPage: numberRecords.value,
    totalPages: totalPage.value === 0 ? 1 : totalPage.value,
  })
  watch(listInternalBeneficiary, newVal => {
    listInternalBeneficiary.value = newVal
  })

  watch([nextPag, currentPage, numberRecords, totalRecords], () => {
    pagination.totalRecords = totalRecords.value
    pagination.nextPag = nextPag.value
    pagination.currentPage = currentPage.value
    pagination.itemsPage = numberRecords.value
    pagination.totalPages = totalPage.value === 0 ? 1 : totalPage.value
  })

  const nextPage = () => {
    if (currentPage.value <= totalRecords.value) {
      currentPage.value++
      internalBeneficiaryListStore.setNextPage(currentPage.value)
      fetchInternalBeneficiary()
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      internalBeneficiaryListStore.setNextPage(currentPage.value)
      fetchInternalBeneficiary()
    }
  }

  const updateItemsPage = (itemPage: number) => {
    numberRecords.value = itemPage
    currentPage.value = 1
    internalBeneficiaryListStore.setNextPage(1)
    internalBeneficiaryListStore.setLimit(itemPage)
    fetchInternalBeneficiary()
  }

  watch(numberRecords, newValue => {
    totalPage.value = Math.ceil(totalRecords.value / newValue)
    pagination.totalPages = totalPage.value === 0 ? 1 : totalPage.value
  })
  return {
    loading,
    goBack,
    isModalOpen,
    fetchInternalBeneficiary,
    listInternalBeneficiary,
    columnsInternalHeader,
    nextPag,
    currentPage,
    numberRecords,
    totalRecords,
    makeWithdrawalInternal,
    beneficiaryInternalSearch,
    internalBeneficiaryListStore,
    totalPage,
    pagination,
    nextPage,
    prevPage,
    updateItemsPage,
  }
}
