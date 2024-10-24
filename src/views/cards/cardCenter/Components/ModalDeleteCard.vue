<template>
  <Dialog
    v-model:visible="props.showModal"
    :modal="true"
    :style="{ width: '30rem' }"
    class="modal-asset-selector"
    closeIcon="pi pi-times-circle"
  >
    <template #header>
      <div class="header-container ml-6">
        <h2 class="font-medium text-center mb-0" style="color: var(--primary-color)">{{ t('deleteVirtualCard') }}</h2>
        <p class="text-center">{{ t('deleteCardText') }}</p>
      </div>
    </template>
    <div class="body-container"></div>
    <template #footer>
      <div class="footer-container">
        <Button
          :label="t('cancel')"
          class="accept-button w-4 py-2"
          severity="secondary"
          @click="handleDeleteCardModal(false)"
        />
        <Button
          :disabled="loading"
          :label="t('confirm')"
          :loading="loading"
          class="bg-red-500 border-red-500 w-4 py-2"
          icon="pi pi-sync"
          iconPos="right"
          @click="handleDeleteCard()"
        />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
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
