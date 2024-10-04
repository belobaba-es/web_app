import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { DropdownChangeEvent } from 'primevue/dropdown'
import { useWorld } from '../../../../composables/useWorld'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useCryptoBeneficiaryListStore } from '../../../../stores/useCryptoBeneficiaryListStore'
import { Beneficiary, TableFilter } from '../../type/beneficiary.type'
import { BeneficiaryCryptoService } from '../../services/beneficiaryCrypto'
import { BeneficiaryAsset } from '../../interface/beneficiary.interface'
import { useAssets } from '../../../../composables/useAssets'
import { CounterpartyStatus } from '../../enums/beneficiary.enum'
import { processException } from '../../../../shared/processException'

const showInstitutionSection = ref(false)
const assetName = ref<string | undefined>('')
const form = ref<BeneficiaryAsset>({
  counterpartyId: '',
  clientId: '',
  isInternal: '',
  informationOwner: {
    name: '',
    country: '',
  },
  informationWallet: {
    assetId: '',
    address: '',
    relationshipConsumer: 'SIBLING',
    originWallet: 'OTHER',
    institutionName: '',
    label: '',
    institutionAddress: {
      streetOne: '',
      postalCode: '',
      city: '',
      region: '',
      country: '',
    },
  },
})

const currentPage = ref(1)
const totalRecords = ref(0)
const nextPag = ref(1)
const itemsPage = ref(10)
const totalPages = ref(0)
const search = ref(false)
const isAssetEdit = ref(false)
const submitting = ref(false)

export function useBeneficiaryCrypto() {
  const { fetchCountryAllowUsa, fetchCountries, loadingCountriesField, countryAllowedForUSA } = useWorld()
  const { t } = useI18n({ useScope: 'global' })
  const toast = useToast()
  const router = useRouter()
  const firstName = ref('')
  const lastName = ref('')
  const networkAddress = ref('')
  const isModalOpen = ref(false)
  const cryptoBeneficiaryListStore = useCryptoBeneficiaryListStore()
  const filterOtherCryptoPlatforms = ref<TableFilter>(cryptoBeneficiaryListStore.getFilters())
  const listBeneficiary = ref<Beneficiary[]>(cryptoBeneficiaryListStore.getBeneficiary())
  const listBeneficiarySearch = ref<Beneficiary[]>([])

  const { getAssets, listAssets } = useAssets()
  cryptoBeneficiaryListStore.$subscribe((mutation, state) => {
    filterOtherCryptoPlatforms.value = state.filter
    listBeneficiary.value = state.beneficiary
    listBeneficiarySearch.value = state.listBeneficiarySearch
    totalRecords.value = state.totalRecords
  })

  watch(isAssetEdit, newVal => {
    isAssetEdit.value = newVal
  })

  const originWalletOptions = [
    { label: '', value: '' },
    { label: t('institution'), value: 'INSTITUTION' },
    { label: t('other'), value: 'OTHER' },
    { label: t('unknown'), value: 'UNKNOWN' },
  ]

  const relationshipOptions = [
    { label: t('ex_spouse'), value: 'EX_SPOUSE' },
    { label: t('children'), value: 'CHILDREN' },
    { label: t('parent'), value: 'PARENT' },
    { label: t('sibling'), value: 'SIBLING' },
    { label: t('relative'), value: 'RELATIVE' },
    { label: t('self'), value: 'SELF' },
    { label: t('friend'), value: 'FRIEND' },
    { label: t('business_partner'), value: 'BUSINESS_PARTNER' },
    { label: t('customer'), value: 'CUSTOMER' },
    { label: t('employee'), value: 'EMPLOYEE' },
    { label: t('branch_office'), value: 'BRANCH_OFFICE' },
    { label: t('subsidiary_company'), value: 'SUBSIDIARY_COMPANY' },
    { label: t('holding_company'), value: 'HOLDING_COMPANY' },
    { label: t('supplier'), value: 'SUPPLIER' },
    { label: t('creditor'), value: 'CREDITOR' },
    { label: t('debtor'), value: 'DEBTOR' },
    { label: t('franchisee'), value: 'FRANCHISEE' },
    { label: t('not_related'), value: 'DEBTOR' },
  ]

  const toggleInstitutionSection = (event: DropdownChangeEvent) => {
    showInstitutionSection.value = event.value === 'INSTITUTION'
  }

  const selectAsset = (asset: any) => {
    form.value.informationWallet.assetId = asset.assetId
  }
  const fetchBeneficiariesAssets = async (newList?: boolean) => {
    if (newList) {
      cryptoBeneficiaryListStore.clearFilter()
      cryptoBeneficiaryListStore.setNextPage(1)
      currentPage.value = 1
    }
    submitting.value = true
    new BeneficiaryCryptoService()
      .listBeneficiaryAssets(cryptoBeneficiaryListStore.getFilters())
      .then(resp => {
        nextPag.value = Number(resp.nextPag) ? Number(resp.nextPag) : nextPag.value > 0 ? nextPag.value : 1
        cryptoBeneficiaryListStore.setBeneficiary(resp.results)
        cryptoBeneficiaryListStore.setListBeneficiarySearch(resp.results)
        cryptoBeneficiaryListStore.setTotalRecords(resp.count)
        if (listAssets.value.length === 0) getAssets()
        submitting.value = false
      })
      .catch(error => {
        submitting.value = false
        processException(toast, t, error)
      })
  }

  const beneficiaryAssetSearch = (searchBeneficiary: string) => {
    if (!searchBeneficiary) {
      fetchBeneficiariesAssets(true)
      return
    }

    cryptoBeneficiaryListStore.searchBeneficiary(searchBeneficiary)

    search.value = true
  }

  const saveBeneficiary = () => {
    if (firstName.value === '' || lastName.value === '') {
      toast.add({
        severity: 'warn',
        summary: t('warningAllFieldRequired'),
        detail: t('warningNameAndLastNameRequired'),
        life: 4000,
      })
      return
    }
    if (!isValidForm()) {
      toast.add({
        severity: 'warn',
        detail: t('completeForm'),
        life: 4000,
      })
      return
    }
    submitting.value = true

    new BeneficiaryCryptoService()
      .saveBeneficiaryAssets(form.value)
      .then(() => {
        isModalOpen.value = true
        submitting.value = false
        resetFormOtherPlatform()
        fetchBeneficiariesAssets(true).then()
      })
      .catch(error => {
        processException(toast, t, error)
      })
  }

  const goBack = () => {
    router.go(-1)
  }

  const isValidForm = () => {
    return (
      form.value.informationWallet.assetId &&
      form.value.informationWallet.address &&
      form.value.informationWallet.relationshipConsumer &&
      form.value.informationWallet.originWallet &&
      form.value.informationOwner.name &&
      form.value.informationOwner.country
    )
  }
  const columnsHeader = [
    { field: 'informationOwner.name', header: t('nameAndLastName') },
    { field: 'informationWallet.originWallet', header: t('typeBeneficiary') },
    { field: 'informationWallet.label', header: t('Alias') },
  ]
  const columnsInternalHeader = [{ field: 'informationOwner.name', header: t('nameAndLastName') }]
  const resetFormOtherPlatform = () => {
    isAssetEdit.value = false
    showInstitutionSection.value = false
    form.value = {
      counterpartyId: '',
      isInternal: '',
      informationOwner: {
        name: '',
        country: '',
      },
      informationWallet: {
        assetId: '',
        address: '',
        relationshipConsumer: 'SIBLING',
        originWallet: 'OTHER',
        institutionName: '',
        label: '',
        institutionAddress: {
          streetOne: '',
          postalCode: '',
          city: '',
          region: '',
          country: '',
        },
      },
    }
  }

  const setDataBeneficiary = (beneficiary: Beneficiary) => {
    isAssetEdit.value = true
    prepareData(beneficiary)
    router.push(`/withdraw/crypto/other-platforms/beneficiary/edit`)
  }

  const makeWithdrawalOtherPlatforms = (beneficiary: Beneficiary) => {
    if (beneficiary.status !== CounterpartyStatus.ACTIVE) return
    prepareData(beneficiary, true)
    router.push('/withdraw/crypto/other-platforms/make-withdrawal/' + beneficiary.counterpartyId)
  }
  const prepareData = (beneficiary: Beneficiary, isWithdrawal: boolean = false) => {
    const clientId = isWithdrawal ? beneficiary.clientId : ''
    form.value = {
      ...form.value,
      informationOwner: {
        name: beneficiary.informationOwner.name,
        country: beneficiary.informationOwner.country,
      },
      informationWallet: beneficiary.informationWallet,
      counterpartyId: beneficiary.counterpartyId,
      clientId,
      isInternal: beneficiary.isInternal,
    }
  }

  totalPages.value = Math.ceil(totalRecords.value / itemsPage.value)

  const pagination = reactive({
    totalRecords: totalRecords.value,
    nextPag: nextPag.value,
    currentPage: currentPage.value,
    itemsPage: itemsPage.value,
    totalPages: totalPages.value === 0 ? 1 : totalPages.value,
  })

  watch(totalRecords, newValue => {
    pagination.totalRecords = newValue
    totalPages.value = Math.ceil(newValue / itemsPage.value)
    pagination.totalPages = totalPages.value === 0 ? 1 : totalPages.value
  })

  watch(itemsPage, newValue => {
    totalPages.value = Math.ceil(totalRecords.value / newValue)
    pagination.totalPages = totalPages.value === 0 ? 1 : totalPages.value
  })

  watch(nextPag, newVal => {
    pagination.nextPag = newVal
  })

  watch(currentPage, newVal => {
    pagination.currentPage = newVal
  })

  watch(listBeneficiary, newVal => {
    listBeneficiary.value = newVal
  })

  const nextPage = () => {
    if (currentPage.value <= totalRecords.value) {
      currentPage.value++
      cryptoBeneficiaryListStore.setNextPage(currentPage.value)
      fetchBeneficiariesAssets()
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      cryptoBeneficiaryListStore.setNextPage(currentPage.value)
      fetchBeneficiariesAssets()
    }
  }

  const updateItemsPage = (itemPage: number) => {
    itemsPage.value = itemPage
    currentPage.value = 1
    cryptoBeneficiaryListStore.setNextPage(1)
    cryptoBeneficiaryListStore.setLimit(itemPage)
    fetchBeneficiariesAssets()
  }

  const getIcon = (assetIcon: string) => {
    return ` background: url(${assetIcon}); width: 23px; height: 23px; background-size: cover;`
  }

  return {
    fetchCountryAllowUsa,
    fetchCountries,
    loadingCountriesField,
    countryAllowedForUSA,
    networkAddress,
    form,
    showInstitutionSection,
    toggleInstitutionSection,
    originWalletOptions,
    relationshipOptions,
    selectAsset,
    saveBeneficiary,
    submitting,
    goBack,
    setDataBeneficiary,
    assetName,
    isValidForm,
    isModalOpen,
    fetchBeneficiariesAssets,
    listBeneficiary,
    beneficiaryAssetSearch,
    search,
    columnsHeader,
    columnsInternalHeader,
    nextPag,
    currentPage,
    itemsPage,
    totalRecords,
    totalPages,
    cryptoBeneficiaryListStore,
    isAssetEdit,
    resetFormOtherPlatform,
    makeWithdrawalOtherPlatforms,
    prepareData,
    firstName,
    lastName,
    pagination,
    nextPage,
    prevPage,
    updateItemsPage,
    getIcon,
  }
}
