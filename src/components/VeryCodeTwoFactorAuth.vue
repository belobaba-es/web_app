<template>
  <div class="lg:bg-contain container">
    <div class="pt-3">
      <div class="field">
        <label class="font-light">{{ t('twoFactorAuthCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputNumber :useGrouping="false" :disabled="submitting" v-model="codeForVerify" />
        </div>
        <div class="help-text">
          <span>{{ t('twoFactorAuthText') }}</span>
        </div>
      </div>
      <div class="container-flex mt-lg-2">
        <div class="float-left w-30">
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

        <div class="float-right w-30" v-if="recoveryLink">
          <p class="green-color cursor-pointer" style="padding-top: 2rem !important" @click="recoveryTwoFactorAuth">
            {{ t('twoFactorAuthRecoveryText') }}
          </p>
        </div>
      </div>

        <div class="w-50 mt-5" style="margin: 0 auto">
            <Button
                    type="button"
                    icon="pi pi-angle-left"
                    :label="t('backButtonTitle')"
                    class="font-light mt-lg-5 with-buttons p-button-outlined border-300 sm: mt-5 w-100"
                    @click="redirectToLogin()"
            />
        </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { useTwoFactorAuth } from '../composables/useTwoFactorAuth'
import { useI18n } from 'vue-i18n'
import {useRouter} from "vue-router";


interface Props {
  accountId?: string
  recoveryLink?: boolean
}

const props = defineProps<Props>()

const router = useRouter()
const { verifyCode, codeForVerify, submitting } = useTwoFactorAuth()

const { t } = useI18n({ useScope: 'global' })

const codeIsValidEmit = defineEmits(['codeIsValid', 'recoveryTwoFactorAuth'])

const makeVerifyCode = async () => {
  const isValid = await verifyCode(props.accountId)

  codeIsValidEmit('codeIsValid', isValid)
}

const recoveryTwoFactorAuth = () => {
  codeIsValidEmit('recoveryTwoFactorAuth', true)
}

const redirectToLogin = () => {
    window.location.href = '/'
}
</script>
