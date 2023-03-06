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
            placeholder="Select a asset"
          />

          <Button
            class="p-button search-btn"
            style="border-top-left-radius: 0; border-bottom-left-radius: 0"
            :label="t('search')"
            @click="findAssetByName"
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
import { Asset, PaymentAddress } from './types/asset.interface'
import NewWallet from './components/NewWallet.vue'
import ViewAddress from './components/ViewAddress.vue'
import { AssetsService } from './services/assets'
import AssetDetail from './components/AssetDetail.vue'
import Skeleton from 'primevue/skeleton'
import Dropdown from 'primevue/dropdown'

const { t } = useI18n({ useScope: 'global' })

const assetCode = ref('')
const nextPag = ref('')
const display = ref(false)
const displayNew = ref(false)
const lazyLoading = ref(false)

const assetSelect = ref(null)
const selectViewAsset = ref<Asset | null>(null)
const selectPaymentAddress = ref<PaymentAddress | null>(null)

const findAsset = (assetId: string) => {
  const assetSelect = assets.value.find(asset => asset.assetId == assetId)
  if (assetSelect) {
    return assetSelect
  }
  return null
}

const findAssetByName = () => {
  console.log(assets.value)
  if (assetCode.value) {
    assetsService
      .listPaymentAddress(nextPag.value, assetCode.value)
      .then(data => {
        console.log('== data', data)
        // todo check why it is used paymentAddress.value
        console.log('paymentAddress', paymentAddress.value)
        paymentAddress.value = [...paymentAddress.value, ...data.results]
        nextPag.value = data.nextPag
      })
      .finally(() => {
        lazyLoading.value = false
      })
  }
}

const viewAddressAsset = (item: PaymentAddress) => {
  display.value = !display.value
  display.value = true

  selectPaymentAddress.value = item
  selectViewAsset.value = findAsset(item.assetsId)
}

const assetsService = AssetsService.instance()
const assets = ref<Asset[]>([])
const paymentAddress = ref<PaymentAddress[]>([])

onMounted(async () => {
  assetsService.list().then(data => (assets.value = data))
  await searchWallets()
})

const searchWallets = () => {
  lazyLoading.value = true
  assetsService.list().then(data => (assets.value = data))
  assetsService.listPaymentAddress().then(data => {
    lazyLoading.value = false
    paymentAddress.value = data.results
    nextPag.value = data.nextPag
  })
}

const onCreateAddress = (event: any) => {
  selectPaymentAddress.value = {
    label: event.name,
    accountId: '',
    address: event.paymentAddress,
    assetsId: event.assetId,
    qr: event.qr,
  }

  selectViewAsset.value = findAsset(event.assetId)
  displayNew.value = false
  display.value = true

  searchWallets()
}

const onLazyLoad = (event: any) => {
  const { first, last } = event

  if (last == paymentAddress.value.length && nextPag.value != '') {
    lazyLoading.value = true
    assetsService
      .listPaymentAddress(nextPag.value)
      .then(data => {
        paymentAddress.value = [...paymentAddress.value, ...data.results]
        nextPag.value = data.nextPag
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
</style>
