<template>
  <div class="main-container" v-bind:class="{ 'is-fiat': wallet?.name === 'US DOLLAR' }">
    <div class="flex justify-content-start flex-wrap container-name-cripto">
      <h1 class="text-header name-cripto">
        Wallet / {{ isFiat(wallet?.name) }} / <strong>{{ wallet?.name }}</strong>
      </h1>
      <div>
        <div class="flex align-items-center mt-3">
          <Button
            label=""
            icon="pi pi-angle-left"
            iconPos="left"
            class="p-button-text to-back-desktop"
            @click="emit('toBack')"
          />
          <h2>{{ wallet?.name }}</h2>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <div class="flex justify-content-start">
          <p class="text-balance-wallet-historic-desktop mt-3 sm:mt-3 md:mt-3 lg:mt-0 xl:mt-0">
            {{ calculateBalance(wallet.assetCode, wallet.balance, wallet.blockedBalance ?? 0) }}
            <small>{{ wallet?.assetCode }}</small>
          </p>
        </div>
        <div class="flex justify-content-start">
          <div class="line-historic-desktop"></div>
        </div>
        <div class="mt-3">
          <div class="grid flex justify-content-start flex-column">
            <div class="col-4 flex justify-content-start container-link-historic-desktop">
              <router-link class="link-historic-desktop" to="/deposit" exact role="menuitem" v-ripple>
                <h5 class="text-link-historic-desktop">Deposit</h5>
              </router-link>
            </div>
            <div class="col-4 justify-content-start container-link-historic-desktop">
              <router-link class="link-historic-desktop" to="/withdraw" exact role="menuitem" v-ripple>
                <h5 class="text-link-historic-desktop">Withdraw</h5>
              </router-link>
            </div>
            <div class="col-4 justify-content-start container-link-historic-desktop">
              <router-link class="link-historic-desktop" to="/swap" exact role="menuitem" v-ripple>
                <h5 class="text-link-historic-desktop">Swap</h5>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 flex justify-content-center no-padding">
        <img class="icon-cripto-historic-desktop" :src="wallet?.icon" :alt="wallet?.name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { BalanceWallet } from '../../deposit/types/asset.interface'
import Button from 'primevue/button'
import {useBalanceWallet} from "../../../composables/useBalanceWallet";

defineProps<{
  wallet: BalanceWallet
}>()

const { calculateBalance } = useBalanceWallet()

const emit = defineEmits(['toBack'])

const isFiat = (nameWallet: string | undefined) => {
  if (nameWallet === 'US DOLLAR') {
    return 'Fiat'
  } else {
    return 'Crypto'
  }
}
</script>

<style lang="scss">
.text-balance-wallet-historic-desktop {
  margin-left: 4%;
  font-family: KanitMedium !important;
  width: fit-content;

  @media only screen and (min-width: 991px) {
    //991

    /* Set max and min font sizes */
    --max-font: 23;
    --min-font: 20;
    font-size: var(--responsive);
  }

  font-size: var(--responsive);
}

.line-historic-desktop {
  margin-top: 5px;
  margin-left: 4%;

  border: 1px solid #fff;
  width: 30%;
}

.text-link-historic-desktop {
  margin: auto;

  @media only screen and (max-width: 575px) {
    --max-font: 40;
    --min-font: 15;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 576px) {
    --max-font: 20;
    --min-font: 12;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 991px) {
    //991

    /* Set max and min font sizes */
    --max-font: 15;
    --min-font: 10;
    font-size: var(--responsive);
  }
}

.link-historic-desktop {
  color: white;
}

.icon-cripto-historic-desktop {
  width: 70%;
  position: relative;
  top: -40px;
  border-radius: 50%;
  background-color: white;

  @media only screen and (min-width: 992px) {
    max-width: 250px !important;
  }

  @media only screen and (max-width: 991px) {
    width: 20%;
  }
}

.container-link-historic-desktop {
  margin-left: 4%;
}
</style>