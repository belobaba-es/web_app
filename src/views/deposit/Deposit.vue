<template>
  <section class="section-main">
    <FinishRegisterWarningBar />

    <h2 class="text-3xl font-bold ml-6">{{ t('deposit') }}</h2>

    <div class="flex align-items-center" style="height: 600px; paddingBottom: 5rem">
      <div class="grid justify-content-center w-100">
        <div class="col-12 text-center mb-5">
          <span class="text-center txt-border-bottom text-2xl font-semi-bold"
            >{{ t('selectCurrency') }} <b class="font-bold"> {{ t('currency') }}</b></span
          >

          <div class="grid flex justify-content-center">
            <div class="col-12 sm:col-12 md:col-6 lg:col-6 xl:col-4">
              <Divider></Divider>
            </div>
          </div>
        </div>

        <router-link to="/deposit/fiat">
          <CardButon class="m-4" :icon="saveMoney" :label="t('fiatWallet')" />
        </router-link>

        <router-link to="/deposit/crypto">
          <CardButon class="m-4" :icon="ewallet" :label="t('cryptoWallet')" />
        </router-link>
      </div>
    </div>

    <router-view />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CardButon from './components/CardButon.vue'
import saveMoney from '../../assets/icons/fiat-wallet.svg'
import ewallet from '../../assets/icons/crypto-wallet.svg'
import Divider from 'primevue/divider'
import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'

interface tabItem {
  label: string
  icon?: string
  to: string
}

const { t } = useI18n({ useScope: 'global' })
const active = ref<number>(1)

const menuItems = ref<tabItem[]>([
  {
    label: 'Deposit',
    to: '/deposit',
  },
  {
    label: 'Accionistas',
    to: '/deposit/crypto',
  },
  {
    label: 'Perfil',
    to: '/deposit/fiat',
  },
])
</script>

<style lang="css" scoped>
.p-divider-solid.p-divider-horizontal:before {
  border-color: var(--primary-color);
  border-width: medium;
}

.p-divider-solid.p-divider-horizontal:before {
  border-color: var(--primary-color);
  border-width: medium;
}
</style>
