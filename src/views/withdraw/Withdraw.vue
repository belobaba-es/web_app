<template>
  <section class="section-main">
    <FinishRegisterWarningBar />

    <p class="text-3xl font-medium">{{ t('withdraw') }}</p>

    <section class="container-center">
      <div class="grid justify-content-center">
        <CardButon class="m-4" :label="t('betweenNOBA')" to="/withdraw/noba/asset" />
      </div>
    </section>

    <section class="container-center">
      <div class="grid justify-content-center">
        <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 text-center line">
          <img src="../../assets/icons/cash-back.svg" alt="" srcset="" />
          <p class="text-2xl font-medium p-3">{{ t('withdrawFiat') }}</p>
          <p class="text-base">{{ t('withdrawFiatSelectMsg') }}</p>

          <CardButon class="m-4" :label="t('domesticWire')" to="/withdraw/usa/fiat/domestic" />

          <CardButon class="m-4" :label="t('internationalWire')" to="/withdraw/usa/fiat/international" />

          <CardButon v-show="isExistsWallet('USD_PA')" class="m-4" :label="t('ACH Panama')" to="/withdraw/panama" />
        </div>

        <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 text-center">
          <img src="../../assets/icons/blockchain.svg" alt="" srcset="" />
          <p class="text-2xl font-medium p-3">{{ t('withdrawCrypto') }}</p>
          <p class="text-base">{{ t('withdrawCryptoSelectMsg') }}</p>

          <CardButon class="m-4" :label="t('otherPlatformCrypto')" to="/withdraw/crypto/other" />
        </div>
      </div>
    </section>

    <router-view />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CardButon from './components/CardButon.vue'
import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'
import CreditCardBanner from '../../components/CreditCardBanner.vue'
import { useBalanceWallet } from '../../composables/useBalanceWallet'

const { t } = useI18n({ useScope: 'global' })
const active = ref<number>(1)

const { isExistsWallet } = useBalanceWallet()
</script>

<style lang="scss">
.line {
  @media only screen and (min-width: 992px) {
    border-right: 2px solid #e5f6eb;
  }

  @media only screen and (max-width: 991px) {
    border-bottom: 2px solid #e5f6eb;
    margin-bottom: 2rem;
  }
}

.crypto {
  margin-top: 35px !important;
}
</style>
