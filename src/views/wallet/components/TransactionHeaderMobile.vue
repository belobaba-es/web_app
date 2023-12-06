<template>
  <div class="main-container" v-bind:class="{ 'is-fiat': wallet?.assetCode === 'USD' }">
    <div class="flex justify-content-start flex-wrap container-name-cripto">
      <h1 class="text-header name-cripto">
        Wallet / {{ isFiat(wallet) }} / <strong>{{ wallet?.name }}</strong>
      </h1>
      <div>
        <div class="flex align-items-center mt-3">
          <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="emit('toBack')" />
          <h2>{{ wallet?.name }}</h2>
        </div>
      </div>
    </div>
    <div class="grid no-padding">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 flex justify-content-center no-padding">
        <img class="icon-cripto-historic" :src="wallet?.icon" :alt="wallet?.name" />
      </div>
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 no-padding">
        <div>
          <p class="text-balance-wallet-historic mt-3 sm:mt-3 md:mt-3 lg:mt-0 xl:mt-0">
            {{ calculateBalance(wallet.assetCode, wallet.balance, wallet.blockedBalance ?? 0, true) }}
            <small>{{ wallet?.assetCode }}</small>
          </p>
        </div>
        <div>
          <hr class="line-historic" />
        </div>
        <div class="mt-3">
          <div class="grid">
            <div class="col-4 flex justify-content-center">
              <router-link class="link-historic" :to="depositURL" exact role="menuitem" v-ripple>
                <h5 class="text-link-historic">Deposit</h5>
              </router-link>
            </div>
            <WithdrawRouteSelectMobile :isFiat="wallet?.assetCode === 'USD'"></WithdrawRouteSelectMobile>
            <div class="col-4 flex justify-content-center">
              <router-link class="link-historic" to="/swap" exact role="menuitem" v-ripple>
                <h5 class="text-link-historic">Swap</h5>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { BalanceWallet } from '../../deposit/types/asset.interface'
import Button from 'primevue/button'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import WithdrawRouteSelectMobile from './WithdrawRouteSelectMobile.vue'

defineProps<{
  wallet: BalanceWallet
}>()
let depositURL = ''
const { calculateBalance } = useBalanceWallet()
const emit = defineEmits(['toBack'])

const isFiat = (wallet: BalanceWallet | undefined) => {
  if (wallet?.assetCode === 'USD') {
    depositURL = '/deposit/fiat'
    return 'Fiat'
  } else {
    depositURL = '/deposit/crypto/' + wallet?.assetCode
    return 'Crypto'
  }
}
</script>