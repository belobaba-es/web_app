<template>
  <div class="container-new-wallet" style="height: 172px; paddingbottom: 2rem">
    <div class="grid">
      <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <p class="text-btn-new-wallet font-semi-bold mb-3">{{ t('textNewWalletAddress') }}</p>
        <div class="container-btn-add-wallet">
          <Button class="p-button wallet-btn" :label="t('newWallet')" @click="displayNew = !displayNew" />
        </div>
      </div>
    </div>
  </div>

  <NewWallet @create="onCreateAddress" v-model:display="displayNew" v-model:asset-select="assetSelect" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import NewWallet from '../views/deposit/components/NewWallet.vue'
import { Asset, PaymentAddressResponse } from '../views/deposit/types/asset.interface'
import { AssetsService } from '../views/deposit/services/assets'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const displayNew = ref(false)
const nextPag = ref('')
const display = ref(false)
const lazyLoading = ref(false)

const assetSelect = ref(null)
const selectViewAsset = ref<Asset | null>(null)
const selectPaymentAddress = ref<PaymentAddressResponse | null>(null)

const assets = ref<Asset[]>([])
const paymentAddress = ref<PaymentAddressResponse[]>([])

const findAsset = (assetId: string) => {
  const assetSelect = assets.value.find(asset => asset.assetId == assetId)
  if (assetSelect) {
    return assetSelect
  }
  return null
}

const searchWallets = () => {
  lazyLoading.value = true
  new AssetsService().list().then(data => (assets.value = data))
  new AssetsService().listPaymentAddress().then(data => {
    lazyLoading.value = false
    paymentAddress.value = data
    // paymentAddress.value = data.results
    // nextPag.value = data.nextPag
  })
}

const onCreateAddress = (event: any) => {
  selectPaymentAddress.value = {
    label: event.name,
    address: event.paymentAddress,
    assetId: event.assetId,
    qr: event.qr,
  } as PaymentAddressResponse

  selectViewAsset.value = findAsset(event.assetId)
  displayNew.value = false
  display.value = true

  searchWallets()
}
</script>

<style lang="scss">
.container-new-wallet {
  background-color: #fff;
  padding: 1rem;
  width: 100%;
  border-top: 1px solid var(--surface-border);

  @media only screen and (max-width: 991px) {
    position: fixed;
    bottom: 4.5rem;
  }
}

.text-btn-new-wallet {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;

  @media only screen and (min-width: 991px) {
    margin-bottom: 0rem;
    margin-top: 0rem;
    text-align: start;
  }
}

.wallet-btn {
  width: 100%;

  @media only screen and (min-width: 991px) {
    width: 80%;
  }
}

.container-btn-add-wallet {
  display: flex;
  justify-content: center;

  @media only screen and (min-width: 991px) {
    justify-content: start;
  }
}
</style>
