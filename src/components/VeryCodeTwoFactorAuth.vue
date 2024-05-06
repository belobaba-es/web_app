<template>
  <div class="lg:bg-contain container">
    <div class="pt-3">
      <div class="field">
        <label class="font-light">{{ t('twoFactorAuthCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputMask placeholder="Write code" :disabled="submitting" v-model="codeForVerify" mask="999-999" />
        </div>
        <div class="help-text">
          <span>{{ t('twoFactorAuthText') }}</span>
        </div>
      </div>
      <div class="container-flex mt-lg-2">
        <div class="float-left w-30" v-if="recoveryLink">
          <p class="green-color cursor-pointer" style="padding-top: 1rem !important" @click="recoveryTwoFactorAuth">
            {{ t('twoFactorAuthRecoveryText') }}
          </p>
        </div>

        <div class="float-right w-30">
          <Button
            type="submit"
            class="mt-4"
            icon="pi pi-angle-right"
            iconPos="right"
            :label="t('verifyCode')"
            :loading="submitting"
            @click="makeVerifyCode()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useTwoFactorAuth } from '../composables/useTwoFactorAuth'
import { useI18n } from 'vue-i18n'
import InputMask from 'primevue/inputmask'
import { useAuth } from '../composables/useAuth'

interface Props {
  recoveryLink?: boolean
}

const props = defineProps<Props>()

const { verifyCode, codeForVerify, submitting } = useTwoFactorAuth()
const { logout } = useAuth()

const { t } = useI18n({ useScope: 'global' })

const codeIsValidEmit = defineEmits(['codeIsValid', 'recoveryTwoFactorAuth'])

const makeVerifyCode = async () => {
  const isValid = await verifyCode()
  codeIsValidEmit('codeIsValid', isValid)
}

const recoveryTwoFactorAuth = () => {
  logout()
  codeIsValidEmit('recoveryTwoFactorAuth', true)
}
</script>
