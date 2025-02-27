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

          <tbody v-if="!isLoading">
            <!--          todo-->
            <tr v-for="item in exchanges.results as ExchangeCreated[]">
              <td
                v-if="item.sourceDetails.assetCode === FiatAssetCodes.USD"
                class="h-5rem w-6rem relative icons-container"
              >
                <img :src="usdIcon" class="h-3rem h-3rem absolute top-0 left-0" />
                <img
                  :src="iconAssetByCode(item.destinationDetails.assetCode, listAssets)"
                  class="h-3rem h-3rem absolute bottom-0 right-0"
                />
              </td>

              <!--              sell-->
              <td v-if="item.sourceDetails.assetCode !== 'USD'" class="h-5rem w-6rem relative icons-container">
                <img
                  :src="iconAssetByCode(item.sourceDetails.assetCode, listAssets)"
                  class="h-3rem h-3rem absolute top-0 left-0"
                />
                <img :src="usdIcon" class="h-3rem h-3rem absolute bottom-0 right-0" />
              </td>

              <td class="total-amount-container">
                <h3 class="text-center">{{ item.sourceDetails.amountDebit }} {{ item.sourceDetails.assetCode }}</h3>
              </td>

              <td class="swap-icon-container"><img :src="swapIcon" /></td>

              <!--              buy-->
              <td v-if="item.sourceDetails.assetCode === 'USD'" class="balance-in-container">
                <h3 class="text-center">
                  {{ item.destinationDetails.amountCredit }} {{ item.destinationDetails.assetCode }}
                </h3>
              </td>

              <!--              sell-->
              <td v-if="item.sourceDetails.assetCode !== 'USD'" class="total-amount-container">
                <h3 class="text-center">{{ item.totalAmount }} {{ item.destinationDetails.assetCode }}</h3>
              </td>

              <td class="operation-date-container">
                <h3 class="text-center">{{ item.createdAt }}</h3>
              </td>

              <td class="status-container">
                <h3 class="text-center" :class="statusClass(item.status)">{{ item.status }}</h3>
              </td>

              <td class="fee-amount-container">
                <h3 class="text-center">
                  <small>US$</small>
                  {{ getPriceQuote(item.sourceDetails, item.destinationDetails) }}
                </h3>
              </td>

              <td class="number-of-order-container">
                <h3 class="text-center">{{ item.exchangeId }}</h3>
              </td>
            </tr>
          </tbody>

          <template v-if="isLoading">
            <tr>
              <td>
                <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
              </td>
              <td>
                <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
              </td>
              <td>
                <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
              </td>
              <td>
                <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
              </td>
              <td>
                <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
              </td>
              <td>
                <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
              </td>
              <td>
                <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
              </td>
              <td>
                <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
              </td>
            </tr>
          </template>
        </table>
      </div>

      <div class="grid flex justify-content-end" v-if="exchanges.nextPag > 1">
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
import { useRouter } from 'vue-router'
import { Asset } from '../deposit/types/asset.interface'
import { AssetsService } from '../deposit/services/assets'
import { ExchangeCreated } from './types/quote-response.interface'
import Skeleton from 'primevue/skeleton'
import swapIcon from '../../assets/icons/swap.svg'
import { iconAssetByCode } from '../../shared/iconAssetByCode'
import { processException } from '../../shared/processException'
import { useToast } from 'primevue/usetoast'
import { FiatAssetCodes } from '../wallet/types/assetCodes.interface'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const { exchanges } = useSwap()
const { fetchExchanges, getNextPage } = useSwapStore()
const router = useRouter()
const listAssets = ref<Asset[]>([])
const isLoading = ref<boolean>(true)
const exchangesList = ref<ExchangeCreated[]>()

onMounted(async () => {
  await new AssetsService()
    .list()
    .then(data => {
      listAssets.value = data
    })
    .catch(e => {
      processException(toast, t, e)
    })

  await fetchExchanges()
  isLoading.value = false
  exchangesList.value = [
    ...((exchangesList.value as ExchangeCreated[]) ?? []),
    ...(exchanges.value.results as ExchangeCreated[]),
  ]
})

const usdIcon = 'https://storage.googleapis.com/noba-dev/USD.svg'

const statusClass = (status: string) => {
  return {
    'text-green-500': status === 'ACCEPTED',
    'text-orange-500': status === 'REQUESTED',
    'text-red-500': status === 'cancel',
  }
}

const getPriceQuote = (sourceDetail: any, destinationDetail: any) => {
  let price: number
  if (sourceDetail.assetCode === 'USD') {
    price = sourceDetail.amountDebit / destinationDetail.amountCredit
  } else {
    price = destinationDetail.amountCredit / sourceDetail.amountDebit
  }

  return price.toFixed(2)
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

small {
  font-size: 7.5pt;
}
</style>
