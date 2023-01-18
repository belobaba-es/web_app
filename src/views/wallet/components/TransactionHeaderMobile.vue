<template>
  <div class="main-container" v-bind:class="{ 'is-fiat': wallet?.name === 'US DOLLAR' }">
    <div class="flex justify-content-start flex-wrap container-name-cripto">
      <h1 class="text-header name-cripto">
        Wallet / {{ isFiat(wallet?.name) }} / <strong>{{ wallet?.name }}</strong>
      </h1>
      <div>
        <div class="flex align-items-center mt-3">
          <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="emit('toBack')" />
          <h2>{{ wallet?.name }}</h2>
        </div>
      </div>
    </div>
    <div class="grid container-test">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 flex justify-content-center container-test">
        <img class="icon-cripto-historic" :src="wallet?.icon" :alt="wallet?.name" />
      </div>
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 container-test">
        <div>
          <p class="text-balance-wallet-historic mt-3 sm:mt-3 md:mt-3 lg:mt-0 xl:mt-0">
            {{wallet.balance}}
            <small>{{ wallet?.assetCode }}</small>
          </p>
        </div>
        <div>
          <hr class="line-historic" />
        </div>
        <div class="mt-3">
          <div class="grid">
            <div class="col-4 flex justify-content-center">
              <router-link class="link-historic" to="/deposit" exact role="menuitem" v-ripple>
                <h5 class="text-link-historic">Deposit</h5>
              </router-link>
            </div>
            <div class="col-4 flex justify-content-center">
              <router-link class="link-historic" to="/withdraw" exact role="menuitem" v-ripple>
                <h5 class="text-link-historic">Withdraw</h5>
              </router-link>
            </div>
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
import {defineProps} from "vue";
import {BalanceWallet} from "../../deposit/types/asset.interface";
import Button from 'primevue/button'

defineProps<{
  wallet: BalanceWallet

}>()

const emit = defineEmits(['toBack']);

const isFiat = (nameWallet: string | undefined) => {
  if (nameWallet === 'US DOLLAR') {
    return 'Fiat'
  } else {
    return 'Crypto'
  }
}
</script>