<template>
  <div class="card flex flex-column justify-content-center align-items-end m-4 pb-8 pt-6">
    <div class="w-12 pl-3">
      <h2 class="m-0 font-medium mb-0">{{ t('labelPinChange') }}</h2>
      <p class="font-regular mt-0 text-2xl">
        {{ t('labelChangePin') }}
      </p>
      <Steps v-model:activeStep="activeStep" :model="steps" :readonly="false" class="mt-5" />
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
import { useChangePin } from './composable/useChangePinRecovey'
import router from '../../../router/router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n()
const toast = useToast()
const { activeStep, steps } = useChangePin()

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
</style>