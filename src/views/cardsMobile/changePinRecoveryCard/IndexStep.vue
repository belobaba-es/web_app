<template>
  <div class="card flex flex-column justify-content-center align-items-end p-0">
    <SelectCardHeader title="changePin" />
    <div class="w-12 px-3">
      <Steps v-model:activeStep="activeStep" :model="steps" :readonly="false" class="mt-5 px-5" />
      <router-view v-slot="{ Component }" @complete="complete">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Steps from 'primevue/steps'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useChangePin } from '../../cards/changePinRecoveryCard/composable/useChangePinRecovey'
import { useRouter } from 'vue-router'
import SelectCardHeader from '../components/SelectCardHeader.vue'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const { activeStep, steps } = useChangePin()

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
  width: 800px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100% !important;
  }
}
</style>
