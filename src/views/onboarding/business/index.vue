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
<script setup lang="ts">
import Steps from 'primevue/steps'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { useOnboardingCompany } from '../../../composables/useOnboardingCompany'
import { useAuth } from '../../../composables/useAuth'

const { fetchDataToClient } = useOnboardingCompany()
const { getClientId } = useAuth()
const toast = useToast()
const router = useRouter()
const items = ref([
  {
    label: 'Company information',
    to: `/onboarding/business/step1`,
  },
  {
    label: 'Add shareholders',
    to: `/onboarding/business/step2`,
  },
  {
    label: 'Account purpose',
    to: `/onboarding/business/step3`,
  },
  {
    label: 'Upload documents',
    to: `/onboarding/business/step4`,
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

onMounted(() => {
  console.log('getClientId', getClientId())
  if (getClientId()) {
    fetchDataToClient()
  }
})
</script>
