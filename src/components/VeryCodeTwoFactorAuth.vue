<template>

  <div class="lg:bg-contain container">
    <div class="pt-5">
      <div class="field">
        <label class="font-light">Enter verification code</label>
        <div class="p-inputgroup">
          <InputNumber
              :useGrouping="false"
              :disabled="submitting"
              v-model="codeForVerify"
          />
        </div>
        <div class="help-text">
          <span >Enter the code from your two-factor authenticator app. If you've lost your device, you can enter one of your recovery codes.</span>
        </div>
      </div>

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
</template>

<script setup lang="ts">

import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import {useTwoFactorAuth} from "../composables/useTwoFactorAuth";
import {useI18n} from "vue-i18n";



const {verifyCode, codeForVerify, submitting} = useTwoFactorAuth()

const { t } = useI18n({ useScope: 'global' })

const codeIsValidEmit  = defineEmits(['codeIsValid'])

const makeVerifyCode = async () => {
  const isValid = await verifyCode();

  codeIsValidEmit('codeIsValid', isValid)
}

</script>