<template>
  <section class="section-main">
    <p class="text-3xl font-medium">{{ t('transactionHistory') }}</p>

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

        <div :class="{'p-col-3 p-md-col-6': true}">
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
                  v-model="assetCode"
                  :options="assets"
                  optionLabel="name"
                  optionValue="code"
                  :placeholder="t('selectAnAsset')"
              />
            </div>
          </div>
        </div>

        <div :class="{'p-col-3 p-md-col-6': true}">
          <label class="label-search">{{ t('datePicker') }}</label>
          <div class="grid">
            <div class="col-6">
              <Calendar v-model="startDate" showTime dateFormat="dd/mm/yy"  hourFormat="24" />
            </div>

            <div class="col-6">
              <Calendar v-model="endDate" showTime dateFormat="dd/mm/yy"  hourFormat="24" showIcon/>
            </div>
          </div>

          <!--        <div v-if="!isValidDates">-->
          <!--          <p>{{ t('invalidDatePeriod') }}.</p>-->
          <!--        </div>-->
        </div>

        <div class="3 padding-search-div" >
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

<!--      <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">-->
<!--        <Button class="p-button wallet-btn" :loading="isLoadingPDF" :label="t('downloadExtract')" @click="downloadExtract" />-->
<!--      </div>-->

    </div>

    <div class="container-data mb-0 pb-0">
      <p class="title-historic">{{ t('historicTransactionsTitle') }}</p>

      <div class="grid mt-4">
        <div v-for="item in listTransaction" class="col-12 grid">
          <div class="col-12">
            <div class="grid">
              <div class="col-6 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <div class="grid">
                  <div class="col-3 flex align-items-center data-hidden">
                    <img class="icon-cripto" alt="icon-{{ item.assetCode }}" :src="asssetImg(item.assetCode)" />
                  </div>
                  <div class="col-9">
                    <p class="name_to">{{ item.nameTo }}</p>
                    <p class="date">
                      {{ item.createdAt }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-3 flex align-items-center data-hidden">
                <p class="reference">{{ item.reference }}</p>
              </div>
              <div class="col-3 flex align-items-center data-hidden">
                <p class="amount">
                  {{ item.amount }}
                  <small>{{ item.assetCode }}</small>
                  &nbsp;
                  <i
                      v-if="item.transactionType === 'withdraw-funds'"
                      class="pi pi-arrow-circle-up icon-withdraw-funds"
                  ></i>
                  <i v-if="item.transactionType === 'deposit'" class="pi pi-arrow-circle-down icon-deposit-funds"></i>
                </p>
              </div>
              <div class="col-6 sm:col-6 md:col-6 lg:col-3 xl:col-3 details-mobile">
                <router-link class="link-modal-data-transaction" to="#" exact role="menuitem" v-ripple>
                  <h4>
                    <i class="pi pi-eye"></i>
                    Ver Detalle
                  </h4>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <template v-if="isLoading">
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px;" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px;" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px;" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px;" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px;" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px;" />
        </template>
      </div>

      <div class="mt-2" v-if="nextPage.nextPage === true">
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
</template>

<script lang="ts" setup>
import {computed, defineProps, onMounted, ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import Calendar from 'primevue/calendar';
import Skeleton from 'primevue/skeleton';

import Dropdown from 'primevue/dropdown'
import { AssetsService } from '../deposit/services/assets'

import { Asset } from '../deposit/types/asset.interface'
import {HistoricService} from "./services/transaction-history";
import {
  ListTransactionPgType,
  TransactionFiltersQueryType,
  TransactionFiltersQueryTypeKeys
} from "./types/transaction-history-response.interface";
import generatePdf, {generatePDFTable, jsPDFOptionsOrientationEnum} from "../../shared/generatePdf";
import logo from "../../assets/img/logo.png";
import {useUserStore} from "../../stores/user";

const router = useRouter()
const route = useRoute()

const { t } = useI18n({ useScope: 'global' })

const selectedTypeTransaction = ref()
const assetCode = ref('')
const startDate = ref();
const endDate = ref();
const isLoading = ref(true);
const isFirstLoad = ref(true);
const isLoadingPDF = ref(true);
const filters: TransactionFiltersQueryType = {
  accountId: "",
  assetCode: "",
  assetType: "",
  initDoc: "",
  nameTo: "",
  startDate: "",
  next: "",
  endDate: "",
  transactionType: "",
};

const transactionTypes = ref([
  { name: t('depositTransactionName'), code: 'deposit' },
  { name: t('withdrawTransactionName'), code: 'withdraw-funds' },
  { name: t('allTransactions'), code: '' },
])

const assetsService = AssetsService.instance()
const assets = ref<Asset[]>([])

const getHistoric = HistoricService.instance()
const listTransaction = ref<ListTransactionPgType[]>([])
const submitting = ref(false)

const nextPage = ref({
  nextPage: false,
  data: '',
})

onMounted(async () => {
  await assetsService.list().then(data => (assets.value = data))
  addUSDToAssets()

  await getTransactions()
})

const addUSDToAssets = () => {
  const usdAsset = {
    "id": "usd id",
    "minimumWithdrawal": 0,
    "code": "USD",
    "assetId": "",
    "fee": 0,
    "name": "USD",
    "icon": "https://storage.googleapis.com/noba-dev/USD.svg",
    "active": true,
    "updatedAt": '',
    "createdAt": '',
    "paymentAddress": ''
  }

  assets.value.unshift(usdAsset)
}

const getTransactions = async(filters: any = {}) => {
  isLoading.value = true;
  isLoadingPDF.value = true;
  submitting.value = true
  listTransaction.value = [];
  await getHistoric.getHistoric(filters).then(data => {
    console.log('--- data', data)
    submitting.value = false
    isLoading.value = false;
    isLoadingPDF.value = false;

    data.results.forEach(element => {
      listTransaction.value.push(element)
    })

    nextPage.value.data = data.nextPag
    nextPage.value.nextPage = false

    if (data.nextPag) {
      nextPage.value.nextPage = true
      nextPage.value.data = data.nextPag
    }
  })
}

const loadMoreItems = async () => {
  isLoading.value = true;
  isLoadingPDF.value = true;
  submitting.value = true
  listTransaction.value = [];

  filtersChange("initDoc", nextPage.value.data)
  await getTransactions(filters)
}

const isValidDates = computed(() => {
  if(isFirstLoad.value) {
    isFirstLoad.value = false
    return;
  }
  if(startDate.value && endDate.value && startDate.value < endDate.value) {
    filtersChange("startDate", startDate.value)
    filtersChange("endDate", endDate.value)
  } else {
    filtersChange("startDate", "")
    filtersChange("endDate", "")
  }
  return startDate.value && endDate.value && startDate.value < endDate.value;
})

watch(assetCode, async (newValue) => {
  if (assetCode) {
    filtersChange("assetCode", newValue)
  }
})

watch(selectedTypeTransaction, async newValue => {
  if (assetCode) {
    filtersChange("transactionType", newValue)
  }
})

const asssetImg = (assetCode: string) => {
  // if(assetCode.toLowerCase() === "USD".toLowerCase()) return "icons/deposit-assets/wallet.svg"
  return assets.value.find(asset => asset.code.toLowerCase() == assetCode.toLowerCase())?.icon
}

const filtersChange = async(key: TransactionFiltersQueryTypeKeys, value: any) => {
  filters[key] = value
}

const userStore = useUserStore()
const title = t('transactionHistory')
const footerPdf = t('footerPdfNobaData')
const username = userStore.getUser.firstName
    ? userStore.getUser.firstName + ' ' + userStore.getUser.lastName
    : userStore.getUser.name
let extractPDFInfo:any = {}
const downloadExtract = ()=>{
  isLoadingPDF.value = true;
  setTimeout(()=>{
    extractPDFInfo = {};
    isLoadingPDF.value = false;
    const nameFile = `${username} ${t('namePdfTransactionHistory')}`
    listTransaction.value.forEach((transaction, i) => {
      extractPDFInfo[i]  = `${transaction.assetCode} ${transaction.reference} ${transaction.createdAt.toString().substr(0, 10)} ${transaction.createdAt.toString().substr(11, 8)}  ${transaction.amount} ${ transaction.assetCode}`
    })
    generatePDFTable(nameFile, logo, title, extractPDFInfo, footerPdf, jsPDFOptionsOrientationEnum.LANDSCAPE)
  }, 2000)
}

const search = async()=> {
  await getTransactions(filters)
}

</script>
<style lang="scss">
.dropdown-full {
  width: 100% !important;
}
.container-data{
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
  margin-left: 0.5rem !important;;
}
.p-button {
  width: 100%;
}
.mb-25 {
  margin-bottom: 2.5rem;
}

@media (max-width: 950px) {
  .search-btn {
    border-radius: 5px !important;
  }
}
</style>
