<template>
  <div class="card mt-4">
    <div class="flex flex-column align-items-center justify-content-center p-5">
      <div class="surface-card p-4 border-round w-full md:w-50rem text-center pb-5 pt-5">
        <i class="pi pi-check-circle text-8xl text-green-500 mb-4"></i>
        <h1 class="text-5xl font-medium mb-2">{{ t('requestSent') }}</h1>
        <p class="text-gray-600 mb-4 text-2xl">{{ t('stateEmail') }}</p>
        <Button class="p-button-outlined p-button-secondary" label="Regresar al inicio" @click="goHome" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script lang="ts" setup>
import Button from 'primevue/button'
import router from '../../../../router/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const goHome = () => {
  router.push('/')
}
</script>
