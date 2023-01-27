<template>
  <section v-show="useUser.isAccountActive()">
    <CardWallet />

    <NewWallet @create="onCreateAddress" v-model:display="displayNew" v-model:asset-select="assetSelect" />

    <div class="grid m-2">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <p class="text-btn-new-wallet">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <Button class="p-button wallet-btn" :label="t('newWallet')" @click="displayNew = !displayNew" />
      </div>
    </div>
  </section>

  <AccountValidationProcess v-show="!useUser.isAccountActive()" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import CardWallet from '../../components/CardWallet.vue'
import NewWallet from '../deposit/components/NewWallet.vue'

import AccountValidationProcess from '../../components/AccountValidationProcess.vue'
import { Asset, PaymentAddress } from '../deposit/types/asset.interface'
import { AssetsService } from '../deposit/services/assets'

import { useUserStore } from '../../stores/user'
import { useI18n } from 'vue-i18n'

const useUser = useUserStore()
const { t } = useI18n({ useScope: 'global' })

const displayNew = ref(false)
const nextPag = ref('')
const display = ref(false)
const lazyLoading = ref(false)

const assetSelect = ref(null)
const selectViewAsset = ref<Asset | null>(null)
const selectPaymentAddress = ref<PaymentAddress | null>(null)

const assetsService = AssetsService.instance()
const assets = ref<Asset[]>([])
const paymentAddress = ref<PaymentAddress[]>([])

const findAsset = (assetId: string) => {
  const assetSelect = assets.value.find(asset => asset.assetId == assetId)
  if (assetSelect) {
    return assetSelect
  }
  return null
}

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
</script>
<style lang="scss">
.text-btn-new-wallet {
  font-size: 1.1rem;
}
</style>
