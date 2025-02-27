<template>
  <section class="section-main">
    <NewWallet @create="onCreateAddress" v-model:display="displayNew" v-model:asset-select="assetSelect" />
    <ViewAddress v-model:visible="display" :asset="selectViewAsset" :payment-address="selectPaymentAddress" />

    <p class="text-3xl font-medium mb-4">
      {{ t('deposit') }} / <span class="text-primary">{{ t('crypto') }} </span>
    </p>

    <div class="grid">
      <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
        <span class="p-input-icon-left flex p-fluid">
          <i class="pi pi-search" />
          <Dropdown
            class="select-asset"
            v-model="assetCode"
            :options="assets"
            optionLabel="name"
            optionValue="code"
            :placeholder="t('selectAnAsset')"
            :showClear="true"
            @change="onChange"
          />

          <Button
            class="p-button search-btn"
            style="border-top-left-radius: 0; border-bottom-left-radius: 0"
            :label="t('search')"
            @click="findAssetByName"
            :loading="submitting"
          />
        </span>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <Button class="p-button wallet-btn" :label="t('newWallet')" @click="displayNew = !displayNew" />
      </div>
    </div>

    <div class="col-12 lg:col-9 xl:col-9">
      <VirtualScroller
        scrollHeight="500px"
        class="test"
        :items="paymentAddress"
        :itemSize="75"
        showLoader
        :loading="lazyLoading"
        :lazy="true"
        @lazy-load="onLazyLoad"
      >
        <template v-slot:item="{ item, options }">
          <div :class="['scroll-item pr-2', { odd: options.odd }]">
            <AssetDetail :assets="assets" :payment-address="item" @select="viewAddressAsset($event)"></AssetDetail>
          </div>
        </template>
        <template v-slot:loader="{ options }">
          <div :class="['scroll-item p-2', { odd: options.odd }]" style="height: 50px">
            <Skeleton :width="options.even ? '60%' : '50%'" height="1.3rem" />
          </div>
        </template>
      </VirtualScroller>
    </div>

    <div class="grid">
      <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <Button class="p-button wallet-btn" :label="t('newWallet')" @click="displayNew = !displayNew" />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import VirtualScroller from 'primevue/virtualscroller'
import { Asset, PaymentAddressResponse } from './types/asset.interface'
import NewWallet from './components/NewWallet.vue'
import ViewAddress from './components/ViewAddress.vue'
import { AssetsService } from './services/assets'
import AssetDetail from './components/AssetDetail.vue'
import Skeleton from 'primevue/skeleton'
import Dropdown from 'primevue/dropdown'
import { useRoute } from 'vue-router'
import { processException } from '../../shared/processException'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const assetCode = ref('')
const nextPag = ref('')
const display = ref(false)
const displayNew = ref(false)
const lazyLoading = ref(false)
const assetSelect = ref(null)
const selectViewAsset = ref<Asset | null>(null)
const selectPaymentAddress = ref<PaymentAddressResponse | null>(null)
const submitting = ref(false)
const route = useRoute()
const assets = ref<Asset[]>([])
const paymentAddress = ref<PaymentAddressResponse[]>([])

onMounted(async () => {
  await new AssetsService()
    .list()
    .then(data => (assets.value = data))
    .catch(error => {
      processException(toast, t, error)
    })

  const assetCode = (route.params.assetCode as string) ?? ''

  if (assetCode) {
    const currentAsset = assets.value.find(asset => asset.code === assetCode)
    if (currentAsset) await searchWallet(currentAsset?.assetId)

    return
  }

  await searchWallets()
})

const findAsset = (assetId: string) => {
  const assetSelect = assets.value.find(asset => asset.assetId == assetId)
  if (assetSelect) {
    return assetSelect
  }
  return null
}

const findAssetByName = () => {
  submitting.value = true
  lazyLoading.value = true
  if (assetCode.value) {
    new AssetsService()
      .listPaymentAddress(nextPag.value, assetCode.value)
      .then(data => {
        paymentAddress.value = [...data]
        // paymentAddress.value = [...data.results]
        // nextPag.value = data.nextPag
        submitting.value = false
        lazyLoading.value = false
      })
      .catch(error => {
        processException(toast, t, error)
      })
      .finally(() => {
        submitting.value = false
        lazyLoading.value = false
      })
  }
}

function onChange(e: any) {
  if (e.value === null) {
    searchWallets()
  }
}

const viewAddressAsset = (item: PaymentAddressResponse) => {
  display.value = !display.value
  display.value = true

  selectPaymentAddress.value = item
  selectViewAsset.value = findAsset(item.assetId)
}

const searchWallets = () => {
  lazyLoading.value = true
  new AssetsService()
    .list()
    .then(data => (assets.value = data))
    .catch(error => {
      processException(toast, t, error)
    })
  new AssetsService()
    .listPaymentAddress()
    .then((data: PaymentAddressResponse[]) => {
      paymentAddress.value = data
      lazyLoading.value = false
    })
    .catch(error => {
      processException(toast, t, error)
    })
}

const searchWallet = (assetId: string) => {
  lazyLoading.value = true
  new AssetsService()
    .list()
    .then(data => (assets.value = data))
    .catch(error => {
      processException(toast, t, error)
    })
  new AssetsService()
    .listPaymentAddress()
    .then(data => {
      lazyLoading.value = false
      paymentAddress.value = data.filter((res: PaymentAddressResponse) => res.assetId === assetId)
    })
    .catch(error => {
      processException(toast, t, error)
    })
}

const onCreateAddress = (event: any) => {
  // selectPaymentAddress.value = {
  //   label: event.name,
  //   accountId: '',
  //   address: event.paymentAddress,
  //   assetsId: event.assetId,
  //   qr: event.qr,
  // }
  //
  // selectPaymentAddress.value ={
  //   address: ""
  //   icon: string
  //   name: string
  //   label: event.name,
  //   networkName: string
  //   network: string
  //   qr: string
  // }

  selectViewAsset.value = findAsset(event.assetId)
  displayNew.value = false
  display.value = true

  searchWallets()
}

const onLazyLoad = (event: any) => {
  const { first, last } = event

  if (last == paymentAddress.value.length && nextPag.value != '') {
    lazyLoading.value = true
    new AssetsService()
      .listPaymentAddress(nextPag.value)
      .then(data => {
        paymentAddress.value = [...paymentAddress.value, ...data]
      })
      .catch(error => {
        processException(toast, t, error)
      })
      .finally(() => {
        lazyLoading.value = false
      })
  }
}
</script>

<style lang="css" scoped>
.b-gray {
  background-color: var(--surface-overlay);
}

.search-btn {
  width: 30% !important;
}

.wallet-btn {
  width: 100% !important;
}

.select-asset {
  width: 100%;
}

.pi-search {
  z-index: 9;
  color: var(--primary-color) !important;
}

.select-asset {
  padding-left: 26px !important;
}
</style>
