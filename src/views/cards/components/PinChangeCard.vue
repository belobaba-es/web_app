<template>
  <div class="flex flex-column justify-content-center align-items-center m-4 pb-3 md:pt-4">
    <div
      v-if="isMobile"
      class="flex justify-content-center align-items-center"
      style="background-color: #f7d41b; width: 80px; height: 80px; border-radius: 50%"
    >
      <i class="icon pi-credit-card pi" style="font-size: 26px"></i>
    </div>

    <p class="m-0 font-normal text-center" style="font-size: 18px">{{ t('createPinText') }}</p>

    <div class="flex flex-column md:flex-row justify-content-center md:justify-content-between align-items-center mt-4">
      <div class="mt-3 md:mx-3">
        <label>{{ t('newPin') }} <span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <Password
            v-model="pin"
            :feedback="false"
            class="w-25rem password"
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
      <div class="mt-3 md:mx-3">
        <label>{{ t('repeatPin') }}<span v-tooltip.top="'Mandatory'" class="bg-red">*</span></label>
        <div class="p-inputgroup">
          <Password
            v-model="confirmPin"
            :feedback="false"
            class="w-25rem password"
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
    <div class="footer-container mt-6 flex justify-content-center md:justify-content-end w-full">
      <Button
        :label="t('cancel')"
        class="accept-button py-2 mr-4 w-9rem"
        severity="secondary"
        outlined
        @click="$emit('cancel')"
      />
      <Button
        :disabled="pin.length !== 4 || confirmPin.length !== 4"
        :label="t('continue')"
        class="accept-button py-2 w-9rem"
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
import { useMediaQuery } from '../../../composables/useMediaQuery'

const emits = defineEmits(['continue', 'cancel'])

const { pin, confirmPin } = useActivationCard()

const { t } = useI18n({ useScope: 'global' })
const { isMobile } = useMediaQuery()

const goToActionsRequest = () => {
  emits('continue')
}
</script>
<style>
.password > input {
  border-radius: 6px !important;
  padding: 0.85rem 0.5rem !important;
}
</style>
