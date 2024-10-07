import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { Beneficiary, TableFilter } from '../../../type/beneficiary.type'
import { CounterpartyStatus, CounterpartyType, NetworkBank } from '../../../enums/beneficiary.enum'
import { AccountService } from '../../../../../shared/services/account'
import { BeneficiaryService } from '../../../services/beneficiary'
import { useWithdraw } from '../../../composable/useWithdraw'
import { validateEmail } from '../../../../../shared/helpers/validateEmail'
import { processException } from '../../../../../shared/processException'
import { useInternalBeneficiaryListFiatStore } from '../../../../../stores/useInternalBeneficiaryListFiatStore'
import { useBeneficiaryUsaListStore } from '../../../../../stores/useBeneficiaryUsaListStore'

const internalListInitial = ref<Beneficiary>({
  accountId: '',
  assetCode: '',
  assetIcon: '',
  assetId: '',
  clientId: '',
  counterpartyId: '',
  counterpartyType: CounterpartyType.FIAT,
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
  networkBank: [],
  status: CounterpartyStatus.ACTIVE,
  isInternal: '',
})
const currentPage = ref(1)
const totalRecords = ref(0)
const nextPag = ref(1)
const numberRecords = ref(10)
const totalPage = ref(0)

export function useListBeneficiaryInternal() {
  const { t } = useI18n({ useScope: 'global' })
  const toast = useToast()
  const router = useRouter()
  const internalBeneficiaryListStore = useInternalBeneficiaryListFiatStore()
  const listInternalBeneficiary = ref<Beneficiary[]>(internalBeneficiaryListStore.getBeneficiary())
  const { setSelectedCounterpartyId } = useBeneficiaryUsaListStore()

  const loading = ref(false)
  const isModalOpen = ref(false)

  const filterInternal = ref<TableFilter>(internalBeneficiaryListStore.getFilters())

  const { prepareFormData } = useWithdraw()
  internalBeneficiaryListStore.$subscribe((mutation, state) => {
    filterInternal.value = state.filter
    listInternalBeneficiary.value = [...state.beneficiary]
    totalRecords.value = state.totalRecords
  })

  totalPage.value = Math.ceil(totalRecords.value / numberRecords.value)

  const fetchInternalBeneficiary = async (newListInternal?: boolean): Promise<void> => {
    if (newListInternal) {
      internalBeneficiaryListStore.clearFilter()
      internalBeneficiaryListStore.setNextPage(1)
    }
    loading.value = true
    new BeneficiaryService()
      .listBeneficiaryFiatInternal(internalBeneficiaryListStore.getFilters())
      .then(async result => {
        loading.value = false
        nextPag.value = Number(result.nextPag) ? Number(result.nextPag) : nextPag.value > 0 ? nextPag.value : 1
        internalBeneficiaryListStore.setNextPage(Number(result.nextPag))
        internalBeneficiaryListStore.setBeneficiary(result.results)
        internalBeneficiaryListStore.setTotalRecords(result.count)
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

        internalListInitial.value.informationOwner.name = resp.name
        internalListInitial.value.clientId = resp.clientId
        internalListInitial.value.counterpartyId = resp.clientId
        internalBeneficiaryListStore.setBeneficiaryInternalPrevious(listInternalBeneficiary.value)

        listInternalBeneficiary.value = []
        listInternalBeneficiary.value.push(internalListInitial.value)

        internalBeneficiaryListStore.setBeneficiary(listInternalBeneficiary.value)
        internalBeneficiaryListStore.setTotalRecords(listInternalBeneficiary.value.length)
      })
      .catch(error => {
        loading.value = false
        processException(toast, t, error)
      })
  }

  const onSearch = (searchText: string) => {
    const search = searchText.trim()
    if (!validateEmail(search)) {
      toast.add({
        severity: 'error',
        summary: t('invalidEmail'),
        detail: '',
        life: 4000,
      })
      return
    }
    beneficiaryInternalSearch(search)
  }

  const handleChange = async (searchText: string) => {
    if (searchText == '') {
      await fetchInternalBeneficiary(true)
      return
    }
  }

  const goBack = () => {
    router.go(-1)
  }

  const columnsInternalHeader = [{ field: 'informationOwner.name', header: t('nameAndLastName') }]

  const makeWithdrawalInternal = (data: Beneficiary) => {
    if (data.status !== CounterpartyStatus.ACTIVE) return
    setSelectedCounterpartyId(data.counterpartyId)
    prepareFormData(data, true)
    router.push('/withdraw/fiat/internal/withdraw')
  }
  const pagination = reactive({
    totalRecords: totalRecords.value,
    nextPag: nextPag.value,
    currentPage: currentPage.value,
    itemsPage: numberRecords.value,
    totalPages: totalPage.value === 0 ? 1 : totalPage.value,
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
    onSearch,
    handleChange,
    makeWithdrawalInternal,
    beneficiaryInternalSearch,
    internalBeneficiaryListStore,
    totalPage,
    updateItemsPage,
    prevPage,
    nextPage,
    pagination,
  }
}
