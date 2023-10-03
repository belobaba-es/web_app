<template>
  <section class="section-main">
    <p class="text-3xl font-medium">{{ t('transactionHistory') }}</p>

    <ProgressSpinner
      v-if="isLoadingTransactionDetails"
      style="width: 50px; height: 50px"
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />

    <!--    filters-->
    <section v-if="!props.isDashboard">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 mt-3">
        <div class="flex align-items-center">
          <router-link to="/dashboard">
            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
          </router-link>
          <span class="text-xl">{{ t('extractGenerated') }}</span>
        </div>
      </div>

      <div class="mt-4 mb-25">
        <div class="flex align-items-center">
          <p class="text-2xl">{{ t('chooseExtract') }}</p>
        </div>
      </div>

      <div class="col-12">
        <div class="grid">
          <div :class="{ 'p-col-3 p-md-col-6': true }">
            <div class="grid">
              <div class="col-6">
                <label class="label-search">{{ t('transactionType') }}</label>
                <Dropdown
                  class="dropdown-full"
                  v-model="selectedTypeTransaction"
                  :options="transactionTypes"
                  optionLabel="name"
                  optionValue="code"
                  :placeholder="t('allTransactions')"
                />
              </div>
              <div class="col-6">
                <label class="label-search">{{ t('assetType') }}</label>
                <Dropdown
                  class="dropdown-full"
                  v-model="assetId"
                  :options="assets"
                  optionLabel="name"
                  optionValue="assetId"
                  :placeholder="t('selectAnAsset')"
                />
              </div>
            </div>
          </div>

          <div :class="{ 'p-col-3 p-md-col-6 lg:ml-4': true }">
            <label class="label-search">{{ t('datePicker') }}</label>
            <div class="grid">
              <div class="col-6 m-0">
                <Calendar v-model="startDate" showTime dateFormat="dd/mm/yy" hourFormat="24" />
              </div>

              <div class="col-6 m-0">
                <Calendar v-model="endDate" showTime dateFormat="dd/mm/yy" hourFormat="24" showIcon />
              </div>
            </div>
          </div>

          <div class="3 padding-search-div">
            <div class="grid">
              <div class="col-12">
                <span class="p-input-icon-left flex p-fluid">
                  <i class="pi pi-search" />
                  <InputText type="text" class="b-gray" :placeholder="t('searchWallet')" />
                  <Button
                    class="p-button search-btn"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0"
                    :label="t('search')"
                    @click="search"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 mt-3 pl-0">
        <div class="flex align-items-center">
          <Button
            class="p-button"
            :label="t('extractGenerated')"
            @click="downloadExtract()"
            :loading="isLoadingPDF"
            icon="pi pi-download"
            iconPos="right"
          />
        </div>
      </div>
      <!--          -->
    </section>

    <div class="container-data mb-0 pb-0">
      <div class="grid">
        <div class="col-6 flex justify-content-start align-items-center">
          <span class="text-xl">{{ t('historicTransactionsTitle') }}</span>
        </div>
        <div v-if="props.isDashboard" class="col-6 flex justify-content-end align-items-center">
          <span class="text-xl">{{ t('viewAllTransactions') }}</span>
          <router-link to="/transaction-history">
            <Button label="" icon="pi pi-angle-right" iconPos="left" class="p-button-text" />
          </router-link>
        </div>
      </div>

      <div class="grid mt-4">
        <div v-for="item in listTransaction" class="col-12 grid">
          <div class="col-12">
            <div class="grid">
              <div class="col sm:col-1 md:col-6 lg:col-3 xl:col-3">
                <div class="grid">
                  <div class="col-3 flex align-items-center data-hidden">
                    <img
                      class="icon-cripto"
                      :alt="item.assetId"
                      :src="iconAsset(item.counterparty?.informationWallet?.assetId ?? item.assetId, listAssets)"
                    />
                  </div>
                  <div class="col-9">
                    <p class="name_to">{{ item.counterparty?.informationOwner?.name ?? '' }}</p>
                    <p class="date">
                      {{ item.formatedDate }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-4 data-hidden">
                <p class="reference">{{ item.reference }}</p>
              </div>
              <div class="col sm:col-6 lg:col-3">
                <p class="amount-x font-semi-bold">
                  {{ item.amount }}
                  <small>{{ getAsset(item.assetId, listAssets).code }}</small> &nbsp;
                  <i
                    v-if="item.transactionType === 'withdraw-funds'"
                    class="pi pi-arrow-circle-up icon-withdraw-funds"
                  ></i>
                  <i v-if="item.transactionType === 'deposit'" class="pi pi-arrow-circle-down icon-deposit-funds"></i>
                </p>
              </div>
              <div class="sm:col-3 md:col-6 lg:col-2 details-mobile">
                <router-link
                  class="link-modal-data-transaction"
                  to="#"
                  exact
                  role="menuitem"
                  v-ripple
                  @click="openModalTransactionDetails($event, item)"
                >
                  <h4>
                    <i class="pi pi-eye"></i>
                    {{ t('viewDetails') }}
                  </h4>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <template v-if="isLoading">
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
        </template>
      </div>

      <div class="mt-2" v-if="nextPage.nextPage === true && !props.isDashboard">
        <div class="grid flex justify-content-end">
          <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
            <Button
              v-if="nextPage.nextPage"
              class="p-button load-more-btn"
              :label="t('loadMore')"
              @click="loadMoreItems"
              :loading="submitting"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <ModalTransactionDetails
    v-model:display="displayModalTransactionDetail"
    :transaction="modalTransactionDetail as TransactionHistory ?? {} as TransactionHistory"
  ></ModalTransactionDetails>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Skeleton from 'primevue/skeleton'
import ModalTransactionDetails from '../components/ModalTransactionDetails.vue'
import Dropdown from 'primevue/dropdown'
import { generateTransactionHistory, jsPDFOptionsOrientationEnum } from '../shared/generatePdf'
import logo from '../assets/img/logo.png'
import { useToast } from 'primevue/usetoast'
import { formatDate } from '../shared/formatDate'
import {
  TransactionFiltersQueryType,
  TransactionFiltersQueryTypeKeys,
  TransactionHistory,
} from '../views/transaction-history/types/transaction-history-response.interface'
import { AssetsService } from '../views/deposit/services/assets'
import { TransactionHistoricService } from '../views/transaction-history/services/transaction-history'
import { HistoricService } from '../views/wallet/services/historic'
import { iconAsset } from '../shared/iconAsset'
import { useUserStore } from '../stores/user'
import { Asset } from '../views/deposit/types/asset.interface'
import { getAsset } from '../shared/getAsset'

const router = useRouter()
const route = useRoute()
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
const toast = useToast()
const assetsService = AssetsService.instance()
const assets = ref<{ name: string; assetId: string }[]>([])
const listAssets = ref<Asset[]>([])
const getHistoric = TransactionHistoricService.instance()
const getTransactonHistoric = HistoricService.instance()
const listTransaction = ref<TransactionHistory[]>([])
const submitting = ref(false)
const displayModalTransactionDetail = ref(false)
const isLoadingTransactionDetails = ref(false)
const modalTransactionDetail = ref<TransactionHistory>()
const nextPage = ref({
  nextPage: false,
  data: '',
})
const props = defineProps({
  isDashboard: {
    type: Boolean,
    required: true,
  },
})
const lastDateFiltersRegistry: any = ref({
  transactions: [],
  data: {
    startDate: null,
    endDate: null,
  },
})

onMounted(async () => {
  await getAssets()
  await getTransactions()
})

const getAssets = async () => {
  await assetsService.list().then(data => {
    listAssets.value = data
    let a = []
    const allAssetsOption = {
      name: t('allItems'),
      assetId: '',
    }

    // Initialize the variable to store the "USD" asset
    let usdAsset = null

    data.forEach(asset => {
      if (asset.code === 'USD') {
        // If the asset's assetId is "USD", store it in the usdAsset variable
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
  })
}

const getTransactions = async (filters: any = {}) => {
  registerSearchFilters([], {})
  isLoading.value = true
  isLoadingPDF.value = true
  submitting.value = true
  listTransaction.value = []

  // todo send nextPage as page into the payload
  await getHistoric
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

      registerSearchFilters(data.results, { startDate: startDate.value, endDate: endDate.value })
    })
    .catch(() => {
      registerSearchFilters([], {})
    })
}

const loadMoreItems = async () => {
  isLoading.value = true
  isLoadingPDF.value = true
  submitting.value = true
  listTransaction.value = []

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

const userStore = useUserStore()
const title = t('transactionHistory')
const footerPdf = t('footerPdfNobaData')
const user = userStore.getUser
// todo set company name when ready
const username =
  userStore.getUser.client.type === 'NATURAL_PERSON' ? userStore.getUser.client.name : userStore.getUser.client.name
let extractPDFInfo: any = {}
const downloadExtract = () => {
  isLoadingPDF.value = true

  setTimeout(() => {
    extractPDFInfo = []

    const owner = {
      name: username,
      id: user.taxId ?? user.client.dni,
      address: `${user.client.streetOne} ${user.client.city}`,
    }

    isLoadingPDF.value = false

    const nameFile = `${username} ${t('namePdfTransactionHistory')}`

    listTransaction.value.forEach((transaction, i) => {
      const data = {
        assetCode: getAsset(transaction.assetId, listAssets.value).code,
        reference: transaction.reference,
        createdAt: transaction.formatedDate,
        amount: Number(transaction.amount.toFixed(8).replace(/\.?0*$/, '')),
      }
      extractPDFInfo[i] = data
    })

    generateTransactionHistory(
      nameFile,
      logo,
      'noba.cash',
      footerPdf,
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
    startDate: lastDateFiltersRegistry.value.dates.startDate
      ? formatDate(lastDateFiltersRegistry.value.dates.startDate)
      : '',
    endDate: lastDateFiltersRegistry.value.dates.endDate ? formatDate(lastDateFiltersRegistry.value.dates.endDate) : '',
  }
}

const registerSearchFilters = (transactions: TransactionHistory[], filters: any) => {
  lastDateFiltersRegistry.value = {
    transactions,
    dates: {
      startDate: filters.startDate,
      endDate: filters.endDate,
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

  await getTransactions(filters)
}

const openModalTransactionDetails = (event: any, transaction: TransactionHistory) => {
  isLoadingTransactionDetails.value = true
  transaction.formatedDate = transaction.formatedDate
  transaction.amount = Number(transaction.amount.toFixed(8).replace(/\.?0*$/, ''))
  modalTransactionDetail.value = transaction
  console.log('transaction', transaction)

  // loadTransactionDetail(transaction)

  displayModalTransactionDetail.value = true
  isLoadingTransactionDetails.value = false
}

// const loadTransactionDetail = async (transaction: TransactionHistory) => {
//   await getTransactonHistoric
//     .findTransactionByTransactionId(transaction.transactionId, transaction.isInternal, transaction.assetCode)
//     .then(data => {
//       // const nameTo = `${transaction.beneficiary?.name ?? transaction?.nameTo ?? transaction.to?.label ?? ''}`
//       // todo
//       const nameTo = ``
//
//       console.log('loadTransactionDetail transaction', transaction)
//       console.log('loadTransactionDetail data', data)
//       displayModalTransactionDetail.value = true
//       isLoadingTransactionDetails.value = false
//       modalTransactionDetail.value = transaction
//
//       console.log('modalTransactionDetail.value', modalTransactionDetail.value)
//     })
// }
</script>

<style lang="scss" scoped>
.dropdown-full {
  width: 100% !important;
}
.container-data {
  margin: -14px;
  margin-top: 30px;
}
.padding-search-div {
  padding-top: 1.62rem !important;
  padding-left: 0.5rem;
}
.mb-15 {
  margin-bottom: 1.5rem;
}
.label-search {
  margin-left: 0.5rem !important;
}
.p-button {
  width: 100%;
}
.mb-25 {
  margin-bottom: 2.5rem;
}

.icon-cripto {
  width: 60%;
}

.amount-x {
  font-size: 14pt;
}
.details-mobile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pi-chevron-right {
  color: var(--primary-color);
}

.pl-0 {
  padding-left: 0;
}

.search-btn {
  border-radius: 5px !important;
}

.reference {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.p-progress-spinner {
  position: fixed;
  margin-left: 33%;
  z-index: 999;
  margin-top: 30%;
}
</style>
