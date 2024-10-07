<template>
  <div>
    <SelectCardHeader title="activation" />
    <div class="flex flex-column justify-content-center align-items-center m-4 pb-8 pt-6">
      <div
        class="flex justify-content-center align-items-center"
        style="background-color: #f7d41b; width: 80px; height: 80px; border-radius: 50%"
      >
        <i class="icon pi-credit-card pi" style="font-size: 26px"></i>
      </div>
      <h2 class="m-0 font-medium mb-0">{{ t('cardApproved') }}</h2>
      <p class="m-0 font-normal">{{ t('cardApprovedText') }}</p>
      <div class="flex justify-content-center mt-4">
        <div class="flex mb-4">
          <ValidationInput />
        </div>
      </div>
      <div class="footer-container">
        <Button type="button" class="accept-button py-3" @click="goToPin()">{{ t('continue') }}</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import ValidationInput from '../../cards/activationCard/components/ValidationInput.vue'
import { useI18n } from 'vue-i18n'
import { useActivationCard } from '../../cards/activationCard/composables/useActivationCard'
import SelectCardHeader from '../components/SelectCardHeader.vue'

const { t } = useI18n({ useScope: 'global' })
const { goToPin } = useActivationCard()
</script>
