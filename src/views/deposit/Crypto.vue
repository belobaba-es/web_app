<template>
  <NewWallet
      @create="onCreateAddress"
      v-model:display="displayNew"
      v-model:asset-select="assetSelect"
  />
  <ViewAddress v-model:visible="display" :asset="selectViewAsset"
               :payment-address="selectPaymentAddress"/>

  <p class="text-3xl font-medium mb-4">{{ t('deposit') }} / <span class="text-primary">{{ t('crypto') }} </span></p>

  <div class="grid">
    <div class="col-8 lg:col-6">
        <span class="p-input-icon-left flex p-fluid">
            <i class="pi pi-search"/>
            <InputText type="text" class="b-gray" :placeholder="t('searchWallet')"/>
            <Button
                class="p-button search-btn"
                style="border-top-left-radius: 0;border-bottom-left-radius: 0;"
                :label="t('search')"
            />
        </span>
    </div>
    <div class="col-4 lg:col-4">
      <Button class="p-button" :label="t('newWallet')" @click="displayNew = !displayNew"/>
    </div>
    <div class="col-12 lg:col-10 ">.
      <VirtualScroller scrollHeight="500px" :items="paymentAddress" :itemSize="75" showLoader :loading="lazyLoading"
                       :lazy=true @lazy-load="onLazyLoad">
        <template v-slot:item="{ item, options }">
          <div :class="['scroll-item pr-2', {'odd': options.odd}]">
            <AssetDetail :assets="assets" :payment-address="item" @select="viewAddressAsset($event)"></AssetDetail>
          </div>
        </template>
        <template v-slot:loader="{ options }">
          <div :class="['scroll-item p-2', {'odd': options.odd}]" style="height: 50px">
            <Skeleton :width="options.even ? '60%' : '50%'" height="1.3rem"/>
          </div>

        </template>
      </VirtualScroller>

    </div>
    <div class="col-4">
      <Button class="p-button" :label="t('newWallet')" @click="displayNew = !displayNew"/>
    </div>
  </div>


</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useI18n} from 'vue-i18n'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import VirtualScroller from 'primevue/virtualscroller';
import {Asset, PaymentAddress} from './types/asset.interface';
import NewWallet from './components/NewWallet.vue'
import ViewAddress from './components/ViewAddress.vue';
import {AssetsService} from './services/assets';
import AssetDetail from './components/AssetDetail.vue';
import Skeleton from 'primevue/skeleton';


const {t} = useI18n({useScope: 'global'})
const nextPag = ref('')
const display = ref(false);
const displayNew = ref(false);
const lazyLoading = ref(false);

const assetSelect = ref(null)
const selectViewAsset = ref<Asset | null>(null);
const selectPaymentAddress = ref<PaymentAddress | null>(null);

const findAsset = (assetId: string) => {
  const assetSelect = assets.value.find(asset => asset.assetId == assetId)
  if (assetSelect) {
    return assetSelect
  }
  return null
}

const viewAddressAsset = (item: PaymentAddress) => {
  display.value = !display.value;
  display.value = true;

  selectPaymentAddress.value = item
  selectViewAsset.value = findAsset(item.assetsId)
}

const assetsService = AssetsService.instance();
const assets = ref<Asset[]>([])
const paymentAddress = ref<PaymentAddress[]>([])

onMounted(async () => {
  assetsService.list().then(data => assets.value = data);
  await searchWallets()
});

const searchWallets = () => {
  lazyLoading.value = true;
  assetsService.list().then(data => assets.value = data);
  assetsService.listPaymentAddress().then(data => {
    lazyLoading.value = false;
    paymentAddress.value = data.results;
    nextPag.value = data.nextPag
  })
}

const onCreateAddress = (event: any) => {

  selectPaymentAddress.value =  {
    label: event.name,
    accountId: "",
    address: event.paymentAddress,
    assetsId: event.assetId,
    qr: event.qr,
  }

  selectViewAsset.value = findAsset(event.assetId)
  displayNew.value = false;
  display.value = true;

  searchWallets()
}

const onLazyLoad = (event: any) => {
  const {first, last} = event;

  if (last == paymentAddress.value.length && nextPag.value != '') {
    lazyLoading.value = true;
    assetsService.listPaymentAddress(nextPag.value).then(data => {
      paymentAddress.value = [...paymentAddress.value, ...data.results]
      nextPag.value = data.nextPag

    }).finally(() => {
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
</style>