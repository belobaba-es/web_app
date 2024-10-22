<template>
  <div class="card flex flex-column justify-content-center align-items-center m-4 pb-8 pt-6">
    <div
      class="flex justify-content-center align-items-center"
      style="background-color: #f7d41b; width: 80px; height: 80px; border-radius: 50%"
    >
      <i class="icon pi-credit-card pi" style="font-size: 26px"></i>
    </div>
    <h2 class="m-0 font-medium mb-0">{{ t('createPin') }}</h2>
    <p class="m-0 font-normal">{{ t('createPinText') }}</p>

    <div class="flex flex-column justify-content-center align-items-center mt-4">
      <div>
        <label>{{ t('newPin') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <Password
            v-model="pin"
            :feedback="false"
            class="w-20rem"
            placeholder="****"
            required
            toggleMask
            type="text"
          />
        </div>
        <div>
          <span class="help-text">{{ t('enterPin') }}</span>
        </div>
      </div>
      <div class="mt-3">
        <label>{{ t('repeatPin') }}<span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <Password
            v-model="confirmPin"
            :feedback="false"
            class="w-20rem"
            placeholder="****"
            required
            toggleMask
            type="text"
          />
        </div>
        <div>
          <span class="help-text">{{ t('enterPin') }}</span>
        </div>
      </div>
    </div>
    <div class="footer-container mt-6 flex justify-content-center">
      <Button
        :label="t('cancel')"
        class="accept-button py-3 mr-4 w-7rem"
        severity="secondary"
        @click="$emit('cancel')"
      />
      <Button
        :disabled="pin.length !== 4 || confirmPin.length !== 4"
        :label="t('continue')"
        class="accept-button py-3"
        type="button"
        @click="goToActionsRequest"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import Button from 'primevue/button'
import Password from 'primevue/password'
import { useI18n } from 'vue-i18n'
import { useActivationCard } from '../activationCard/composables/useActivationCard'

const emits = defineEmits(['continue', 'cancel'])

const { pin, confirmPin } = useActivationCard()

const { t } = useI18n({ useScope: 'global' })

const goToActionsRequest = () => {
  emits('continue')
}
</script>
