<template>
  <PinChangeCard @cancel="handleCancel" @continue="handleChangesPin" />
  <ModalGeneric
    :subtitle="t('labelModalChangePin2')"
    :title="t('labelModalChangePin')"
    :visible="showModal"
    @update:display="closeModal"
  />
</template>
<script lang="ts" setup>
import PinChangeCard from '../../cards/components/PinChangeCard.vue'
import ModalGeneric from '../../../components/ModalGeneric.vue'
import { useI18n } from 'vue-i18n'
import { useChangePin } from '../../cards/changePinRecoveryCard/composable/useChangePinRecovey'
import { useRouter } from 'vue-router'

const { t } = useI18n({ useScope: 'global' })
const { handleChangesPin, showModal } = useChangePin()
const router = useRouter()
const closeModal = () => {
  showModal.value = false
  router.push('/cards/transactions-card')
}

const handleCancel = () => {
  router.push('/cards/transactions-card')
}
</script>
