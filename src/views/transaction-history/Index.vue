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

    <div class="mt-4">
      <div class="flex align-items-center">
        <p class="text-2xl">{{ t('chooseExtract') }}</p>
      </div>
    </div>

    <div class="grid">
      <div class="col-6">
        <div class="grid">
          <div class="col-4">
            <Dropdown
                class="dropdown-full"
                v-model="selectedTypeTransaction"
                :options="transactionTypes"
                optionLabel="name"
                optionValue="code"
                :placeholder="t('allTransactions')"
            />
          </div>
          <div class="col-4">
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

      <div class="col-6">
        <div class="mt-4">
          <div class="flex align-items-center">
            <p class="text-2xl">{{ t('chooseDate') }}</p>
          </div>
        </div>
        <label for="start-date">Date</label>
        <Calendar v-model="startDate" id="start-date" showTime dateFormat="dd/mm/yy"  hourFormat="24" />

        <Calendar v-model="endDate" id="end-date" showTime dateFormat="dd/mm/yy"  hourFormat="24" showIcon/>

        <!--      -->
        <div v-if="!isValidDates">
          <p>Please select a start date that is before the end date.</p>
        </div>
        <!--      -->
      </div>

    </div>

    <div class="container-data mb-0 pb-0">
      <p class="title-historic">{{ t('historicTransactionsTitle') }}</p>

      <div class="grid">
        <div v-for="item in listTransaction" class="col-12 grid">
          <div class="col-12">
            <div class="grid">
              <div class="col-6 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <p class="name_to">test</p>
                <p class="date">
                  {{ item.createdAt }}
                </p>
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
      </div>

      <div class="mt-2" v-if="nextPage.nextPage === true">
        <div class="grid flex justify-content-end">
          <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
            <Button
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
import {computed, defineProps, onMounted, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

import { AssetsService } from '../deposit/services/assets'
import { Asset } from '../deposit/types/asset.interface'

import Calendar from 'primevue/calendar';
import {HistoricService} from "./services/transaction-history";
import {ListTransactionPgType} from "./types/transaction-history-response.interface";

const router = useRouter()
const route = useRoute()

const { t } = useI18n({ useScope: 'global' })

const selectedTypeTransaction = ref()
const assetCode = ref('')
const startDate = ref(null);
const endDate = ref(null);

const transactionTypes = ref([
  { name: t('depositTransactionName'), code: 'deposit' },
  { name: t('withdrawTransactionName'), code: 'withdraw-funds' },
  { name: t('revertTransactionName'), code: 'revert' },
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

  await getHistoric.getHistoric().then(data => {
    data.results.forEach(element => {
      listTransaction.value.push(element)
    })
    if (data.nextPag) {
      nextPage.value.nextPage = true
      nextPage.value.data = data.nextPag
    }
  })
})

const isValidDates = computed(() => {
  return startDate.value && endDate.value && startDate.value < endDate.value;
});

const loadMoreItems = async () => {
  submitting.value = true

  await getHistoric.getHistoricNextPage(nextPage.value.data).then(data => {
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
}

</script>
<style lang="scss">
.dropdown-full {
  width: 100% !important;
}
</style>
