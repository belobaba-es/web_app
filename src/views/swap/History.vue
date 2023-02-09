<template>
  <section class="section-main">
    <PageLayout :title="t('swap')">
      <div class="flex align-items-center my-3">
        <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="router.push('/swap')" />
        <span class="text-xl"> {{ t('swapHistory') }}</span>
      </div>

      <div class="table-responsive">
        <table class="table">
          <thead class="px-2 mb-2 surface-100">
            <tr>
              <th class="icons-container font-medium p-3">{{ t('swap') }}</th>
              <th class="total-amount-container font-medium p-3">{{ t('moveDone') }}</th>
              <th class="swap-icon-container font-medium p-3"></th>
              <th class="balance-in-container font-medium p-3">{{ t('toYourBalanceIn') }}</th>
              <th class="operation-date-container font-medium p-3">{{ t('operationDate') }}</th>
              <th class="status-container font-medium p-3">{{ t('status') }}</th>
              <th class="fee-amount-container font-medium p-3">{{ t('quotePrice') }}</th>
              <th class="number-of-order-container font-medium p-3">{{ t('numberOfOrder') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in quotes.results">
              <td v-if="item.transactionType === 'buy'" class="h-5rem w-6rem relative icons-container">
                <img :src="usdIcon" class="h-3rem h-3rem absolute top-0 left-0" />
                <img :src="iconAsset(item.code)" class="h-3rem h-3rem absolute bottom-0 right-0" />
              </td>

              <td v-if="item.transactionType === 'sell'" class="h-5rem w-6rem relative icons-container">
                <img :src="iconAsset(item.code)" class="h-3rem h-3rem absolute top-0 left-0" />
                <img :src="usdIcon" class="h-3rem h-3rem absolute bottom-0 right-0" />
              </td>

              <td class="total-amount-container">
                <h3 class="text-center">{{ item.totalAmount }}</h3>
              </td>

              <td class="swap-icon-container">
                <img :src="swapIcon" />
              </td>

              <td class="balance-in-container">
                <h3 class="text-center">{{ item.unitCount }}</h3>
              </td>

              <td class="operation-date-container">
                <h3 class="text-center">{{ secondsToDate(item.createdAt._seconds) }}</h3>
              </td>

              <td class="status-container">
                <h3 class="text-center" :class="statusClass(item.status)">{{ item.status }}</h3>
              </td>

              <td class="fee-amount-container">
                <h3 class="text-center">{{ getPriceQuote(item.totalAmount, item.unitCount, item.transactionType)    }}</h3>
              </td>

              <td class="number-of-order-container">
                <h3 class="text-center">{{ item.quoteId }}</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid flex justify-content-end">
        <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
          <Button
            class="p-button load-more-btn"
            :label="t('loadMore')"
            @click="getNextPage"
            :loading="useSwapStore().loading"
          />
        </div>
      </div>
    </PageLayout>
  </section>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { useSwap } from '../../composables/useSwap'
import { useSwapStore } from '../../stores/swap'
import swapIcon from '../../assets/icons/swap.svg'
import { useRouter } from 'vue-router'

const { t } = useI18n({ useScope: 'global' })
const { quotes } = useSwap()
const { fetchQuotes, getNextPage } = useSwapStore()
const router = useRouter()

onMounted(async () => {
  await fetchQuotes()
})

const usdIcon = 'https://storage.googleapis.com/noba-dev/USD.svg'

const iconAsset = (assetCode: string) => {
  return `https://storage.googleapis.com/noba-dev/${assetCode}.svg`
}

const secondsToDate = (seconds: number) => {
  const locale = localStorage.getItem('noba@lang')
  const date = new Date(seconds * 1000)
  return date.toLocaleString(locale!)
}

const statusClass = (status: string) => {
  return {
    'text-green-500': status === 'process',
    'text-orange-500': status === 'pending',
    'text-red-500': status === 'cancel',
  }
}

const getPriceQuote = (totalAmount:number, unitCount:number, transactionType:string) => {
  const price = totalAmount / unitCount

  if(transactionType === "sell"){
    return price.toFixed(2)
  }
  
  return price.toFixed(8);
}
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table th,
.table td {
  padding: 0.2rem;
  margin: 12rem;
  border-bottom: 1px solid #dee2e6;
  vertical-align: top;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.table .table {
  background-color: #fff;
}

.icons-container {
  min-width: 75px;
}
.total-amount-container {
  min-width: 100px;
}
.swap-icon-container {
  text-align: center !important;
  vertical-align: middle !important;
  min-width: 25px;
}
.balance-in-container {
  min-width: 135px;
}
.operation-date-container {
  min-width: 150px;
}
.status-container {
  min-width: 80px;
}
.fee-amount-container {
  min-width: 110px;
}

.number-of-order-container {
  min-width: 300px;
}

.load-more-btn {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100% !important;
}
</style>
