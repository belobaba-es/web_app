<template>
  <Dialog
    v-model:visible="props.showModal"
    :modal="true"
    closeIcon="pi pi-times-circle"
    class="modal-asset-selector"
    :style="{ width: '25rem' }"
  >
    <template #header>
      <div class="flex justify-content-center w-12 pl-4">
        <i class="pi pi-check-circle" style="font-size: 5rem; color: #26a212"></i>
      </div>
    </template>
    <div class="body-container">
      <h2 class="font-medium text-center mb-0" style="color: #00beb0">{{ t('confirmationModal') }}</h2>
      <p class="text-center">
        {{ t('confirmationModalText') }}
      </p>
    </div>
    <template #footer>
      <div class="footer-container">
        <Button label="Ok" class="w-12 py-2 flex justify-content-center" @click="handleGoToTransation()"> OK</Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { defineProps } from 'vue'
import { useActivationCard } from '../composables/useActivationCard'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
})

const { t } = useI18n({ useScope: 'global' })

const { handleGoToTransation } = useActivationCard()
</script>

<style scoped></style>
