<template>
  <div class="p-4">
    <div class="card">
      <div class="container-card">
        <h2 class="font-medium mb-0 text-4xl">{{ t('textBlockCardNew') }}</h2>
        <p class="font-normal mt-0 text-2xl">{{ t('textBlockCardNew2') }}</p>
        <Button
          :label="t('textBlockCardNew3')"
          class="p-button-rounded col-6"
          icon="pi pi-plus"
          @click="requestNewCard"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import router from '../../../router/router'

const { t } = useI18n({ useScope: 'global' })

const requestNewCard = () => {
  router.push('/cards/onboarding/reposition')
}
</script>

<style>
.container-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>
