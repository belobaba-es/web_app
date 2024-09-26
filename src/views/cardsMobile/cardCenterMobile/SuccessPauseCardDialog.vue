<template>
  <Dialog
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :style="{ width: '25rem' }"
    :visible="props.visibleSuccess"
    modal
    @update:close="emit('update:display', $event)"
  >
    <div class="flex justify-content-center pt-3">
      <div
        class="border-circle text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20 p-4"
        style="background-color: #00beb0"
      >
        <i class="pi pi-lock text-5xl text-white"></i>
      </div>
    </div>
    <h2 class="text-center font-medium" style="color: #00beb0">
      {{ cardInfo.status === !StatusCard.LOCKED ? t('cardPause') : t('CardActivated') }}
    </h2>

    <div class="flex justify-content-around mt-4">
      <Button class="text-center col-5" label="Ok" @click="closeModal()" />
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useCardCenter } from '../../cards/cardCenter/Composables/useCardCenter'
import { StatusCard } from '../../cards/enums/statusCard.enum'
import { useI18n } from 'vue-i18n'

interface Props {
  visibleSuccess: boolean
}

const props = defineProps<Props>()
const { t } = useI18n({ useScope: 'global' })

const { cardInfo, selectedCard, pauseCardRequest, showPauseModal } = useCardCenter()

const emit = defineEmits(['update:close', 'update:display'])

const closeModal = () => {
  emit('update:close', false)
  showPauseModal.value = false
}
</script>
