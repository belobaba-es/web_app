<template>
  <Dialog
    v-model:visible="props.showModal"
    :modal="true"
    closeIcon="pi pi-times-circle"
    class="modal-asset-selector"
    :style="{ width: '30rem' }"
  >
    <template #header>
      <div class="header-container ml-6">
        <h2 class="font-medium text-center mb-0" style="color: #00beb0">{{ t('deleteVirtualCard') }}</h2>
        <p class="text-center">{{ t('deleteCardText') }}</p>
      </div>
    </template>
    <div class="body-container"></div>
    <template #footer>
      <div class="footer-container">
        <Button
          @click="handleDeleteCardModal(false)"
          class="accept-button w-4 py-2"
          severity="secondary"
          :label="t('cancel')"
        />
        <Button
          icon="pi pi-sync"
          iconPos="right"
          class="bg-red-500 border-red-500 w-4 py-2"
          :label="t('confirm')"
          @click="handleDeleteCard()"
          :disabled="loading"
          :loading="loading"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'

import { defineProps } from 'vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useCardCenter } from '../Composables/useCardCenter'

const { t } = useI18n({ useScope: 'global' })
const { handleDeleteCard, handleDeleteCardModal, loading } = useCardCenter()

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
})
</script>

<style scoped></style>
