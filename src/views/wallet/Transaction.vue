<template>
  <div class="main-container" v-bind:class="{ 'is-fiat': wallet?.name === 'US DOLLAR' }">
    <div class="flex justify-content-start flex-wrap container-name-cripto">
      <h1 class="text-header name-cripto">
        Wallet / {{ isFiat(wallet?.name) }} / <strong>{{ wallet?.name }}</strong>
      </h1>
      <div>
        <div class="flex align-items-center mt-3">
          <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="toBack" />
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
            {{ calc(wallet?.assetCode, wallet?.balance, wallet?.blockedBalance ?? 0) }}
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

  <div class="container-data">
    <p class="title-historic">Historico de transacciones</p>

    <ScrollPanel style="width: 100%; height: 400px" class="mt-4 custom">
      <div class="grid">
        <div v-for="item in listTransaction" class="col-12 grid">
          <div class="col-12">
            <ItemTransactionFiatInternal
              :item="item"
              v-if="getTransactionType(item) === 'internal-fiat'"
            ></ItemTransactionFiatInternal>

            <ItemTransactionFiatExternalDosmestic
              :item="item"
              v-if="getTransactionType(item) === 'external-fiat-domestic'"
            ></ItemTransactionFiatExternalDosmestic>

            <ItemTransactionFiatExternalInternational
              :item="item"
              v-if="getTransactionType(item) === 'external-fiat-international'"
            ></ItemTransactionFiatExternalInternational>

            <ItemTransactionAssetExternal
              :item="item"
              v-if="getTransactionType(item) === 'external-asset'"
            ></ItemTransactionAssetExternal>

            <ItemTransactionAssetInternal
              :item="item"
              v-if="getTransactionType(item) === 'internal-asset'"
            ></ItemTransactionAssetInternal>
          </div>
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { HistoricService } from './services/historic'
import { LisTransaction } from './types/historic-transactions-response.interface'
import { useBalanceWallet } from '../../composables/useBalanceWallet'
import { BalanceWallet } from '../deposit/types/asset.interface'

import ItemTransactionFiatInternal from './components/ItemTransactionFiatInternal.vue'
import ItemTransactionFiatExternalDosmestic from './components/ItemTransactionFiatExternalDosmestic.vue'
import ItemTransactionFiatExternalInternational from './components/ItemTransactionFiatExternalInternational.vue'
import ItemTransactionAssetInternal from './components/ItemTransactionAssetInternal.vue'
import ItemTransactionAssetExternal from './components/ItemTransactionAssetExternal.vue'

import ScrollPanel from 'primevue/scrollpanel'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()
const { getWalletByAssetCode } = useBalanceWallet()

const assetCode: string = route.params.assetCode.toString()

const wallet = ref<BalanceWallet | undefined>()

const getHistoric = HistoricService.instance()
const listTransaction = ref<LisTransaction[]>([])

onMounted(async () => {
  await getHistoric.historic(assetCode).then(data => {
    data.results.forEach(element => {
      listTransaction.value.push(element)
    })
  })
  wallet.value = getWalletByAssetCode(assetCode)
})

const isFiat = (nameWallet: string | undefined) => {
  if (nameWallet === 'US DOLLAR') {
    return 'Fiat'
  } else {
    return 'Crypto'
  }
}

const getTransactionType = (transactionData: any) => {
  if (transactionData.assetCode === 'USD' && transactionData.isInternal === true) {
    return 'internal-fiat'
  }

  if (
    !transactionData.isInternal &&
    transactionData.assetCode === 'USD' &&
    transactionData.to.typeBeneficiaryBankWithdrawal === 'DOMESTIC'
  ) {
    return 'external-fiat-domestic'
  }

  if (
    !transactionData.isInternal &&
    transactionData.assetCode === 'USD' &&
    transactionData.to.typeBeneficiaryBankWithdrawal === 'INTERNATIONAL'
  ) {
    return 'external-fiat-international'
  }

  if (transactionData.isInternal && transactionData.assetCode !== 'USD') {
    return 'internal-asset'
  }

  if (!transactionData.isInternal && transactionData.assetCode !== 'USD') {
    return 'external-asset'
  }
}

const toBack = () => {
  router.back()
}

const calc = (assetCode: string | undefined, balance: number | undefined, blocked: number | undefined) => {
  if (assetCode === undefined) {
    return 0
  }
  if (balance === undefined) {
    return 0
  }
  if (blocked === undefined) {
    return 0
  }

  const total = isNaN(balance - blocked) ? 0 : balance - blocked
  if (assetCode === 'USD' || assetCode === 'USDC') {
    return total.toFixed(2)
  }

  return total.toFixed(8)
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
.container-test{
  padding: 0px !important;
}
</style>
