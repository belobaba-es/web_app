<template>
  <div class="mt-4">
    <div class="flex flex-column align-items-center justify-content-center p-5">
      <div class="surface-card py-4 border-round w-full md:w-50rem text-center pb-5 pt-5">
        <img :src="cardDone" alt="#" />
        <h1 class="text-5xl font-medium mb-2">{{ t('requestSent') }}</h1>
        <p class="text-gray-600 mb-4 text-2xl">{{ t('stateEmail') }}</p>
        <Button
          class="p-button-outlined p-button-secondary"
          text
          :label="t('backHome')"
          icon="pi pi-arrow-left"
          style="color: #007aff"
          @click="goHome"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import cardDone from '../../../../assets/icons/card-done.png'

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })
const goHome = () => {
  router.push('/')
}
</script>
