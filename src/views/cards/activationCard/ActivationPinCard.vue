<template>
  <PinCard :confirmPin="confirmPin" :pin="pin" @cancel="handleCancel" @continue="goToQuestions" />
</template>
<script lang="ts" setup>
import { useActivationCard } from './composables/useActivationCard'
import { useI18n } from 'vue-i18n'
import PinCard from '../components/PinCard.vue'
import router from '../../../router/router'

const { pin, confirmPin, goToQuestions } = useActivationCard()
const { t } = useI18n({ useScope: 'global' })

const handleCancel = () => {
  router.push('/dashboard')
}
</script>
