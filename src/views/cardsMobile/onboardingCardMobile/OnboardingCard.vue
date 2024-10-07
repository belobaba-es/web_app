<template>
  <section class="section-main mt-4 mb-5">
    <OnboardingHeader />
    <Steps class="w-full" v-model:activeStep="currentStepIndex" :model="stepperItems" :readonly="false" />
    <router-view v-slot="{ Component }" @complete="complete">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </section>
</template>
<script setup>
import Steps from 'primevue/steps'
import { useOnboardingCard } from '../../cards/composables/useOnboardingCard'
import { useToast } from 'primevue/usetoast'
import router from '../../../router/router'
import { useI18n } from 'vue-i18n'
import OnboardingHeader from './components/OnboardingHeader.vue'

const { t } = useI18n({ useScope: 'global' })

const { stepperItems, currentStepIndex } = useOnboardingCard()
const toast = useToast()
const complete = () => {
  toast.add({
    severity: 'success',
    summary: t('orderSubmitted'),
    detail: t('orderCompleted'),
    life: 4000,
  })
  router.push('/dashboard')
}
</script>
<style lang="scss" scoped>
.p-steps {
  margin: 0 auto;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
}

.p-steps-item .p-steps-current .p-menuitem-link {
  background: none;
}
</style>
