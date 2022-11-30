<template>
  <p class="text-3xl font-medium">{{ t('withdraw') }} </p>
  <section class="container-center">
    <div class="grid justify-content-center">

      <div class="col-5 text-center line">

        <img src="../../assets/icons/cash-back.svg" alt="" srcset="">
        <p class="">{{ t('withdrawFiat') }}</p>
        <p class="text-base">{{ t('withdrawFiatSelectMsg') }}</p>

        <CardButon class="m-4" :label="t('betweenNOBA')" to="/withdraw/fiat/noba/internal"/>

        <CardButon class="m-4" :label="t('domesticWire')" to="/withdraw/fiat/domestic"/>

        <CardButon class="m-4" :label="t('internationalWire')" to="/withdraw/fiat/international"/>

      </div>
      <div class="col-5 text-center">
        <img src="../../assets/icons/blockchain.svg" alt="" srcset="">
        <p class="">{{ t('withdrawCrypto') }}</p>
        <p class="text-base">{{ t('withdrawCryptoSelectMsg') }}</p>
        <router-link to="/withdraw/crypto/noba">
          <CardButon class="m-4" :label="t('betweenNOBACrypto')"/>
        </router-link>

        <router-link to="/withdraw/crypto">
          <CardButon class="m-4" :label="t('otherPlatformCrypto')"/>
        </router-link>
      </div>

    </div>
  </section>


  <router-view/>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useI18n} from 'vue-i18n'
import CardButon from './components/CardButon.vue'

const {t} = useI18n({useScope: 'global'})
const active = ref<number>(1);

</script>

<style lang="css">
.line {
  border-right: 1px solid #e5f6eb;
}
</style>