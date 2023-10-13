<template>
  <section class="section-main">
    <FinishRegisterWarningBar></FinishRegisterWarningBar>

    <p class="text-3xl font-medium">{{ t('deposit') }}</p>

    <div class="flex align-items-center" style="height: 580px">
      <div class="grid justify-content-center w-100">
        <div class="col-12 text-center mb-5">
          <span class="text-center txt-border-bottom text-2xl"
            >{{ t('selectCurrency') }} <b> {{ t('currency') }}</b></span
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
import saveMoney from '../../assets/icons/save-money.svg'
import ewallet from '../../assets/icons/ewallet.svg'
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
}

.p-divider-solid.p-divider-horizontal:before {
  border-color: var(--primary-color);
}
</style>
