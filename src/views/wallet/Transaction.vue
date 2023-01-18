<template>
  <TransactionHeaderMobile class="transaction-header-mobile" v-if="wallet" :wallet="wallet" @to-back="toBack()" />

  <TransactionHeaderDesktop class="transaction-header-desktop" v-if="wallet" :wallet="wallet" @to-back="toBack()" />

  <TransactionTable v-if="wallet" :assetCode=getAssetCode() />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useBalanceWallet } from '../../composables/useBalanceWallet'
import { BalanceWallet } from '../deposit/types/asset.interface'

import TransactionHeaderMobile from './components/TransactionHeaderMobile.vue'
import TransactionHeaderDesktop from './components/TransactionHeaderDesktop.vue'
import TransactionTable from './components/TransactionTable.vue'

const router = useRouter()
const route = useRoute()
const { getWalletByAssetCode } = useBalanceWallet()

const assetCode: string = route.params.assetCode.toString()

const wallet = ref<BalanceWallet | undefined>()

onMounted(async () => {
  wallet.value = getWalletByAssetCode(assetCode)
})

const toBack = () => {
  router.back()
}

const getAssetCode = () => {
  console.log('XXXX', wallet.value?.assetCode)
  return wallet.value?.assetCode
}
</script>

<style lang="scss">
* {
  --responsive: calc((var(--min-font) * 1px) + (var(--max-font) - var(--min-font)) * ((100vw - 420px) / (1200 - 420)));
}

.main-container {
  border: 1px solid #ebebeb;
  padding: 1rem;
  margin: 0.5rem;
  color: #ffff;
  background-color: #0f655d;
  box-shadow: 0px 3px 5px rgb(0 0 0 / 2%), 0px 0px 2px rgb(0 0 0 / 5%), 0px 1px 4px rgb(0 0 0 / 8%) !important;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

.container-data {
  font-family: KanitLight !important;
  padding: 1rem;
  margin: 0.5rem;

  border: 1px solid #ebebeb;
  background-color: #fff;
  box-shadow: 0px 3px 5px rgb(0 0 0 / 2%), 0px 0px 2px rgb(0 0 0 / 5%), 0px 1px 4px rgb(0 0 0 / 8%) !important;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

.container-name-cripto {
  display: flex !important;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: column;
  flex-wrap: nowrap;
}

.name-cripto {
  font-family: KanitMedium !important;
}

.text-header {
  --max-font: 18;
  --min-font: 15;
  font-size: var(--responsive);
}

.icon-cripto-historic {
  width: 70%;
  border-radius: 50%;
  background-color: white;

  @media only screen and (min-width: 992px) {
    max-width: 200px !important;
  }

  @media only screen and (max-width: 991px) {
    width: 20%;
  }
}

.is-fiat {
  background-color: #134591 !important;
}

.text-balance-wallet-historic {
  font-family: KanitMedium !important;
  margin: auto;
  width: fit-content;

  /* Set max and min font sizes in mobile view */
  @media only screen and (max-width: 575px) {
    --max-font: 100;
    --min-font: 20;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 576px) {
    --max-font: 24;
    --min-font: 12;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 991px) {
    //991

    /* Set max and min font sizes */
    --max-font: 22;
    --min-font: 8;
    font-size: var(--responsive);
  }

  font-size: var(--responsive);
}

.line-historic {
  max-width: 400px;
}

.link-historic {
  color: white;
}

.text-link-historic {
  font-family: KanitMedium !important;
  margin: auto;
  width: fit-content;

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

.title-historic {
  font-family: KanitMedium !important;
  font-weight: bold !important;
  width: fit-content;

  /* Set max and min font sizes in mobile view */
  @media only screen and (min-width: 992px) {
    --max-font: 12;
    --min-font: 10;
    font-size: var(--responsive);
  } 

  --max-font: 20;
  --min-font: 15;
  font-size: var(--responsive);
}

.no-padding {
  padding: 0px !important;
}

.transaction-header-mobile {
  @media only screen and (min-width: 992px) {
    display: none;
  }
}

.transaction-header-desktop {
  display: none;

  @media only screen and (min-width: 992px) {
    display: block;
  }
}
</style>
