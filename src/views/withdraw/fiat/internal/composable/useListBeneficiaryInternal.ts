import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { Beneficiary, TableFilter } from '../../../type/beneficiary.type'
import { CounterpartyStatus, CounterpartyType, NetworkBank } from '../../../enums/beneficiary.enum'
import { useInternalBeneficiaryListStore } from '../../../../../stores/useInternalBeneficiaryListStore'
import { AccountService } from '../../../../../shared/services/account'
import { BeneficiaryService } from '../../../services/beneficiary'
import { useBeneficiaryUsaListStore } from '../../../../../stores/useBeneficiaryUsaListStore'
import { useAssets } from '../../../../../composables/useAssets'
import { useWithdraw } from '../../../composable/useWithdraw'
import { validateEmail } from '../../../../../shared/helpers/validateEmail'
import { processException } from '../../../../../shared/processException'

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
const internalBeneficiaryListStore = useInternalBeneficiaryListStore()
const listInternalBeneficiary = ref<Beneficiary[]>(internalBeneficiaryListStore.getBeneficiary())

export function useListBeneficiaryInternal() {
  const { t } = useI18n({ useScope: 'global' })
  const toast = useToast()
  const router = useRouter()

  const { setSelectedCounterpartyId } = useBeneficiaryUsaListStore()

  const loading = ref(false)
  const isModalOpen = ref(false)
  const { getAssets, listAssets } = useAssets()

  const filterInternal = ref<TableFilter>(internalBeneficiaryListStore.getFilters())

  const { prepareFormData } = useWithdraw()
  internalBeneficiaryListStore.setBeneficiary([])
  internalBeneficiaryListStore.$subscribe((mutation, state) => {
    filterInternal.value = state.filter
    listInternalBeneficiary.value = state.beneficiary
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
        listInternalBeneficiary.value = []
        internalListInitial.value.informationOwner.name = resp.name
        internalListInitial.value.clientId = resp.clientId
        internalListInitial.value.counterpartyId = resp.clientId
        listInternalBeneficiary.value.push(internalListInitial.value)
        internalBeneficiaryListStore.setBeneficiary(listInternalBeneficiary.value)
        internalBeneficiaryListStore.setTotalRecords(listInternalBeneficiary.value.length)
      })
      .catch(error => {
        processException(toast, t, error)
      })
  }

  const onSearch = (searchText: string) => {
    if (!validateEmail(searchText)) {
      toast.add({
        severity: 'error',
        summary: t('invalidEmail'),
        detail: '',
        life: 4000,
      })
      return
    }
    beneficiaryInternalSearch(searchText)
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
  }
}
