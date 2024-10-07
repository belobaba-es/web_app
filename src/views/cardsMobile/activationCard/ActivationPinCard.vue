<template>
  <div>
    <SelectCardHeader title="activation" />
    <PinCard :confirmPin="confirmPin" :pin="pin" @cancel="handleCancel" @continue="goToQuestions" />
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import PinCard from '../../cards/components/PinCard.vue'
import { useActivationCard } from '../../cards/activationCard/composables/useActivationCard'
import router from '../../../router/router'
import SelectCardHeader from '../components/SelectCardHeader.vue'

const { pin, confirmPin, goToQuestions } = useActivationCard()
const { t } = useI18n({ useScope: 'global' })

const handleCancel = () => {
  router.push('/dashboard')
}
</script>
