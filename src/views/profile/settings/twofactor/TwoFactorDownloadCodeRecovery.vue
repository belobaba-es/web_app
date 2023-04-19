<template>
  <div class="container-center mt-5">
    <div class="border-2 border-green-200" style="border-radius: 10px">
      <h2 class="text-center">{{ t('downloadYourRecoveryCodes') }}</h2>
      <div class="p-5">
        {{ t('textDownloadRecoveryCodes') }}

        <Message class="mt-5 mb-5" :closable="false">
          <b class="font-semi-bold">{{ t('alertRecoveryCodes') }}</b> <br />
          {{ t('alertDetailRecoveryCodes') }}
        </Message>

        <div class="codes bg-gray-100 mt-5 mb-5">
          <div class="grid text-center">
            <div class="col-6 font-semi-bold" style="font-size: 11pt" v-for="(code, index) in codes">{{ code }}</div>
          </div>
        </div>
        <Button class="float-right mb-5" :label="t('download')" icon="pi pi-download" icon-pos="right" />
        <Divider />

        <Button :label="t('cancel')" outlined class="mb-5" />
        <Button class="float-right mb-5" :label="t('btnSavedRecoveryCodes')" icon="pi pi-download" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Message from 'primevue/message'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useI18n } from 'vue-i18n'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'

const { submitting, activeTwoFactor, lookQRTwoFactor, isShowView, getQR, getSecret, codeForVerify } = useTwoFactorAuth()

const codes = [
  '45435435435',
  '45435435435',
  '45435435435',
  '45435435435',
  '45435435435',
  '45435435435',
  '45435435435',
  '45435435435',
]
const { t } = useI18n({
  useScope: 'global',
})
</script>

<style scoped></style>
