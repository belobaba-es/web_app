<template>
  <TwoFactorSkeleton v-show="!isShowView" />

  <div v-show="isShowView && !visibleRecoveryCodes" class="container-center mt-5">
    <div class="border-2 border-green-200" style="border-radius: 10px">
      <h2 class="text-center">{{ t('enableTwoFactor') }}</h2>
      <div class="p-5">
        <h3 class="font-semi-bold">{{ t('authenticatorApp') }}</h3>
        Password managers like 1Password, Authy, Microsoft Authenticator, etc. have apps and browser extensions that you
        can use to get 2FA codes when prompted during sign-in.
        <h3 class="font-semi-bold mt-5">Scan the QR code</h3>

        Use an authenticator app or browser extension to scan,
        <a class="cursor-pointer" @click="visible = true">enter this secret key.</a>
        If you are unable to scan, instead. Password managers can use it to generate 2FA codes.

        <div class="mt-5 mb-5">
          <Image :src="getQR" />
        </div>

        <div class="md:col-4">
          <Label>Verify the code from the app</Label>
          <div class="p-inputgroup">
            <InputMask placeholder="Write code" v-model="codeForVerify" mask="999-999" />
          </div>
          <div class="p-inputgroup">
            <Button
              class="w-50 p-button mt-5"
              :label="'Active'"
              @click="nextStep()"
              :loading="submitting"
              icon="pi pi-check"
              iconPos="right"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <TwoFactorDownloadCodeRecovery :code_recovery="getCodeRecovery()" v-if="visibleRecoveryCodes" />

  <Dialog v-model:visible="visible" modal header="Your two-factor secret" :style="{ width: '30vw' }">
    <Divider />
    <p>{{ getSecret }}</p>
    <Divider />
    <template #footer>
      <Button outlined label="Copy" icon="pi pi-check" @click="copyToClipboard" text />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Image from 'primevue/image'
import InputMask from 'primevue/inputmask'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import TwoFactorSkeleton from './TwoFactorSkeleton.vue'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import { onMounted, ref } from 'vue'
import TwoFactorDownloadCodeRecovery from './TwoFactorDownloadCodeRecovery.vue'

const { t } = useI18n({
  useScope: 'global',
})

const { submitting, lookQRTwoFactor, isShowView, getQR, getSecret, codeForVerify, verifyCode, getCodeRecovery } =
  useTwoFactorAuth()

const visible = ref(false)
const visibleRecoveryCodes = ref(false)

const toast = useToast()

onMounted(() => {
  lookQRTwoFactor()
})

const copyToClipboard = () => {
  visible.value = false
  navigator.clipboard.writeText(String(getSecret))
  toast.add({
    severity: 'success',
    summary: t('successfulOperation'),
    detail: t('textCopySuccessful'),
    life: 6000,
  })
}

const nextStep = async () => {
  const codeValid = await verifyCode()

  if (codeValid) {
    visibleRecoveryCodes.value = true
  }
}
</script>

<style>
.border-green-200 {
  border-color: var(--primary-color) !important;
}
</style>
