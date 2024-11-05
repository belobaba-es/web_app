<template>
  <div
    class="main-container"
    v-bind:class="{
      'is-fiat': assetClassification === AssetClassification.FIAT,
    }"
  >
    <DepositInstructionsModal v-model:visible="visible" :asset-code="wallet?.assetCode" />

    <div class="flex justify-content-start flex-wrap container-name-cripto">
      <h1 class="text-header name-cripto">
        Wallet / {{ isFiat(wallet) }} / <strong>{{ wallet?.name }}</strong>
      </h1>
      <div>
        <div class="flex align-items-center mt-3">
          <Button class="p-button-text" icon="pi pi-angle-left" iconPos="left" label="" @click="emit('toBack')" />
          <h2>{{ wallet?.name }}</h2>
        </div>
      </div>
    </div>
    <div class="grid no-padding">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 flex justify-content-center no-padding">
        <img :alt="wallet?.name" :src="wallet?.icon" class="icon-cripto-historic" />
      </div>
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 no-padding">
        <div>
          <p class="text-balance-wallet-historic mt-3 sm:mt-3 md:mt-3 lg:mt-0 xl:mt-0">
            {{ calculateBalance(wallet.assetCode, wallet.balance, wallet.blockedBalance ?? 0) }}
            <small>{{ wallet?.assetCode }}</small>
          </p>
        </div>
        <div>
          <hr class="line-historic" />
        </div>
        <div class="mt-3">
          <div class="grid">
            <div class="col-4 flex justify-content-center">
              <router-link
                v-if="assetClassification !== AssetClassification.FIAT"
                v-ripple
                :to="depositURL"
                class="link-historic"
                exact
                role="menuitem"
              >
                <h5 class="text-link-historic">{{ t('deposit') }}</h5>
              </router-link>
              <h5
                v-if="assetClassification === AssetClassification.FIAT"
                class="text-link-historic ml-0 cursor-pointer"
                @click="openDepositInstructions(wallet)"
              >
                {{ t('deposit') }}
              </h5>
            </div>
            <WithdrawRouteSelectMobile :asset-code="wallet?.assetCode"></WithdrawRouteSelectMobile>
            <div class="col-4 flex justify-content-center">
              <router-link v-ripple class="link-historic" exact role="menuitem" to="/swap">
                <h5 class="text-link-historic">{{ t('swap') }}</h5>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { AssetClassification, BalanceWallet } from '../../deposit/types/asset.interface'
import Button from 'primevue/button'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import WithdrawRouteSelectMobile from './WithdrawRouteSelectMobile.vue'
import { FiatAssetCodes } from '../types/assetCodes.interface'
import DepositInstructionsModal from './DepositInstructionsModal.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  wallet: BalanceWallet
  assetClassification: AssetClassification
}>()
let depositURL = ''
const { t } = useI18n({ useScope: 'global' })
const { calculateBalance } = useBalanceWallet()
const emit = defineEmits(['toBack'])
const visible = ref(false)

const isFiat = (wallet: BalanceWallet | undefined) => {
  if (props.assetClassification === AssetClassification.FIAT) {
    depositURL = '/deposit/fiat'
    return AssetClassification.FIAT
  } else {
    depositURL = '/deposit/crypto/' + wallet?.assetCode
    return AssetClassification.CRYPTO
  }
}

const openDepositInstructions = (wallet: BalanceWallet | undefined) => {
  if ([FiatAssetCodes.USD, FiatAssetCodes.USD_PANAMA].includes(wallet?.assetCode as FiatAssetCodes)) {
    visible.value = true
  }
}
</script>