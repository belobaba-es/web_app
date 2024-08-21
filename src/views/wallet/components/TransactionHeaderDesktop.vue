<template>
  <div
    class="main-container"
    v-bind:class="{
      'is-fiat': wallet?.assetCode === FiatAssetCodes.USD || wallet?.assetCode === FiatAssetCodes.USD_PANAMA,
    }"
  >
    <DepositInstructionsModal v-model:visible="visible" :asset-code="wallet?.assetCode" />
    <div class="flex justify-content-start flex-wrap container-name-cripto">
      <h1 class="text-header name-cripto">
        Wallet / {{ isFiat(wallet) }} / <strong>{{ wallet?.name }}</strong>
      </h1>
      <div>
        <div class="flex align-items-center mt-3">
          <Button
            class="p-button-text to-back-desktop"
            icon="pi pi-angle-left"
            iconPos="left"
            label=""
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
              <router-link
                v-if="!wallet?.assetCode.startsWith('USD')"
                v-ripple
                :to="depositURL"
                class="link-historic-desktop"
                exact
                role="menuitem"
              >
                <h5 class="text-link-historic-desktop link-historic-desktop">{{ t('deposit') }}</h5>
              </router-link>
              <h5
                v-if="wallet?.assetCode.startsWith('USD')"
                class="link-historic-desktop text-link-historic-desktop ml-0 cursor-pointer"
                @click="openDepositInstructions(wallet)"
              >
                {{ t('deposit') }}
              </h5>
            </div>
            <WithdrawRouteSelectDesktop :asset-code="wallet?.assetCode"></WithdrawRouteSelectDesktop>
            <div class="col-4 justify-content-start container-link-historic-desktop">
              <router-link v-ripple class="link-historic-desktop" exact role="menuitem" to="/swap">
                <h5 class="text-link-historic-desktop">{{ t('swap') }}</h5>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 flex justify-content-center no-padding">
        <img :alt="wallet?.name" :src="wallet?.icon" class="icon-cripto-historic-desktop" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { BalanceWallet } from '../../deposit/types/asset.interface'
import Button from 'primevue/button'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import WithdrawRouteSelectDesktop from './WithdrawRouteSelectDesktop.vue'
import DepositInstructionsModal from './DepositInstructionsModal.vue'
import { FiatAssetCodes } from '../types/assetCodes.interface'
import { useI18n } from 'vue-i18n'

defineProps<{
  wallet: BalanceWallet
}>()

const { t } = useI18n({ useScope: 'global' })

let depositURL = ''
const { calculateBalance } = useBalanceWallet()
const emit = defineEmits(['toBack'])

const visible = ref(false)

const isFiat = (wallet: BalanceWallet | undefined) => {
  if (wallet?.assetCode === FiatAssetCodes.USD || wallet?.assetCode === FiatAssetCodes.USD_PANAMA) {
    depositURL = '/deposit/fiat'
    return 'Fiat'
  } else {
    depositURL = '/deposit/crypto/' + wallet?.assetCode
    return 'Crypto'
  }
}

const openDepositInstructions = (wallet: BalanceWallet | undefined) => {
  if ([FiatAssetCodes.USD, FiatAssetCodes.USD_PANAMA].includes(wallet?.assetCode as FiatAssetCodes)) {
    visible.value = true
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
  filter: invert(100%) sepia(90%) brightness(200%) contrast(100%);

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
