<template>
  <section class="section-main">
    <div class="flex align-items-center">
      <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="toBack" />
      <span class="text-xl">Onboarding</span>
    </div>

    <Steps :model="items" :readonly="false" />
    <router-view v-slot="{ Component }" @complete="complete">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Steps from 'primevue/steps'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const router = useRouter()
const toast = useToast()

const items = ref([
  {
    label: 'Personal data',
    to: `/onboarding/personal/personal-data`,
  },
  {
    label: 'Investment profile',
    to: `/onboarding/personal/investment-data`,
  },
  {
    label: 'Upload documents',
    to: `/onboarding/personal/upload-documents`,
  },
])

const toBack = () => {
  router.back()
}

const complete = () => {
  toast.add({
    severity: 'success',
    summary: 'Order submitted',
    detail: ' your order completed.',
    life: 4000,
  })

  router.push('/dashboard')
}
</script>
