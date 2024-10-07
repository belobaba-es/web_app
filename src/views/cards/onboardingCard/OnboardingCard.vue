<template>
  <section class="section-main mt-4 mb-5">
    <Steps v-model:activeStep="currentStepIndex" :model="stepperItems" :readonly="false" />
    <router-view v-slot="{ Component }" @complete="complete">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </section>
</template>
<script lang="ts" setup>
import Steps from 'primevue/steps'
import { useOnboardingCard } from '../composables/useOnboardingCard'
import { useToast } from 'primevue/usetoast'
import router from '../../../router/router'

const { stepperItems, currentStepIndex } = useOnboardingCard()

const toast = useToast()
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
<style lang="scss" scoped>
.p-steps {
  width: 800px;
  margin: 0 auto;
}

.p-steps-item .p-steps-current .p-menuitem-link {
  background: none;
}
</style>
