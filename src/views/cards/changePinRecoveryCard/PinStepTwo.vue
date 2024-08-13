<template>
  <PinCard @cancel="handleCancel" @continue="handleChangesPin" />
  <ModalGeneric
    :subtitle="t('labelModalChangePin2')"
    :title="t('labelModalChangePin')"
    :visible="showModal"
    @update:display="closeModal"
  />
</template>
<script lang="ts" setup>
import PinCard from '../components/PinCard.vue'
import { useChangePin } from './composable/useChangePinRecovey'
import ModalGeneric from '../../../components/ModalGeneric.vue'
import { useI18n } from 'vue-i18n'
import router from '../../../router/router'

const { t } = useI18n({ useScope: 'global' })
const { handleChangesPin, showModal } = useChangePin()

const closeModal = () => {
  showModal.value = false
  router.push('/cards/transactions-card')
}

const handleCancel = () => {
  router.push('/cards/transactions-card')
}
</script>