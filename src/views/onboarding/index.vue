<template>
  <section class="section-main">


    <div class="flex align-items-center" style="height: 580px">
      <div class="grid justify-content-center w-100">
        <div class="col-12 text-center mb-5">
          <h1  class="text-1xl">{{ t('onboardingTitle') }}</h1>
          <h3 class="text-center txt-border-bottom text-2xl mb-0">{{ t('subtitleUploadDocuments') }}</h3>

          <div class="grid flex justify-content-center">
            <div class="col-12 sm:col-12 md:col-6 lg:col-6 xl:col-4">
              <Divider></Divider>
            </div>
          </div>
        </div>

        <router-link to="/onboarding/business/step1">
          <CardButon class="m-4 pt-5 pb-5" :icon="business" :label="t('businessAccount')" />
        </router-link>

        <router-link to="/onboarding/personal/step1">
          <CardButon class="m-4 pt-5 pb-5" :icon="personal" :label="t('personalAccount')" />
        </router-link>
      </div>
    </div>

    <router-view />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CardButon from './components/CardButton.vue'

import business from '../../assets/icons/business.svg'
import personal from '../../assets/icons/userAccount.svg'

import Divider from 'primevue/divider'

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
