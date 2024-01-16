<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <p class="text-3xl font-medium mb-4">
        {{ t('withdraw') }} / <span class="text-primary">{{ t('fiat') }} </span>
      </p>
      <div class="flex align-items-center">
        <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="toBack" />
        <span class="text-xl"> {{ type }} Wire hola</span>
      </div>
      <Steps class="stepper" :model="items" :readonly="false" />

      <router-view
        v-slot="{ Component }"
        :toNew="newBeneficiary"
        :formData="formObject"
        @prevPage="prevStepPage($event)"
        @nextPage="nextStepPage($event)"
        @complete="stepComplete"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'

import Steps from 'primevue/steps'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

import { useWithdraw } from '../composables/useWithdraw'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const search = ref('')
const type = ref('ACHPanama')

route.meta.noCache = true

const items = ref([
  {
    label: 'Accounts',
    to: '/withdraw/fiat/domestic',
  },
  {
    label: 'Amount',
    to: '/withdraw/fiat/domestic/amount',
  },
  {
    label: 'Confirmation',
    to: '/withdraw/fiat/domestic/confirmation',
  },
])

const {
  formObject,

  nextStepPage,
  prevStepPage,
  stepComplete,
  toBack,
} = useWithdraw(items)

const newBeneficiary = () => {
  return router.push(`/withdraw/fiat/${route.params.type}/new`)
}

onMounted(async () => {
  console.log('Domestic view', route.params.type)
  if (route.params.type !== 'domestic') {
    type.value = 'panama'
  }
})
</script>

<style scoped>
.search-btn {
  width: 30% !important;
}
</style>