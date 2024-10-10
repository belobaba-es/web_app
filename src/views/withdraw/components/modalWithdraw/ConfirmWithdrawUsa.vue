<template>
  <div class="p-3">
    <div class="text-center">
      <h2 class="font-medium mb-0 text-color-primary">{{ t('ModalConfirmTitle') }}</h2>
      <h4 class="m-0 font-medium">{{ props.subtitle }}</h4>
    </div>

    <div class="flex mt-4 line-top">
      <div class="col">
        <p class="m-0 font-medium">{{ t('textSend') }}:</p>
        <h3 class="m-0 font-medium text-color-primary">{{ t('amount') }}:</h3>
        <p class="m-0 font-medium">{{ t('fee') }}:</p>
      </div>
      <div class="col text-right">
        <p class="m-0 font-medium">
          {{ dataBeneficiaryWithdrawal.informationBank.accountNumber }}
        </p>
        <h3 class="m-0 font-medium text-color-primary">${{ transactionData.amount }}</h3>
        <p class="m-0 font-medium">${{ fee }}</p>
      </div>
    </div>
    <div class="line-top"></div>

    <div class="flex mt-3 pt-2 pb-2" style="background: #eceff1">
      <div class="col-4">
        <p class="m-0 font-medium">{{ t('textReceives') }}:</p>
        <p class="m-0 font-medium">{{ t('Bank') }}:</p>
      </div>
      <div class="col text-right">
        <p class="m-0 font-medium">{{ dataBeneficiaryWithdrawal.informationOwner.name }}</p>
        <p class="m-0 font-medium">{{ dataBeneficiaryWithdrawal.informationBank.bankName }}</p>
      </div>
    </div>

    <div class="flex line-top mt-4">
      <div class="col">
        <h2 class="font-medium">{{ t('ModalConfirmTotal') }}</h2>
      </div>
      <div class="col text-right">
        <h2 class="font-medium text-color-primary">${{ transactionData.amount }}</h2>
      </div>
    </div>

    <div class="flex justify-content-center">
      <Button
        :label="t('confirmWithdraw')"
        :loading="loading"
        class="px-5 p-3"
        @click="showModalVeryCodeTwoFactorOrMakeTransaction()"
      />
    </div>

    <Dialog
      v-model:visible="visibleModalVeryCodeTwoFactor"
      :draggable="false"
      :show-header="false"
      :modal="true"
      position="bottom"
    >
      <div class="flex justify-content-end text-2xl cursor-pointer">
        <button
          aria-label="Close"
          class="p-dialog-header-icon p-dialog-header-close p-link p-2 mt-3"
          type="button"
          @click="close()"
        >
          <span class="p-dialog-header-close-icon pi pi-times-circle"></span>
        </button>
      </div>
      <VeryCodeTwoFactorAuth @codeIsValid="codeIsValid" />
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useWithdraw } from '../../composable/useWithdraw'
import Dialog from 'primevue/dialog'
import VeryCodeTwoFactorAuth from '../../../../components/VeryCodeTwoFactorAuth.vue'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'

const { t } = useI18n({ useScope: 'global' })
const { transactionData, fee, loading, dataBeneficiaryWithdrawal, visibleModalVeryCodeTwoFactor } = useWithdraw()
const { twoFactorIsActive, isEnabledButtonToProceedWithdrawal } = useTwoFactorAuth()
const props = defineProps<{
  subtitle: string
  makeTransaction: Function
}>()
const showModalVeryCodeTwoFactorOrMakeTransaction = () => {
  if (isEnabledButtonToProceedWithdrawal.value) {
    if (twoFactorIsActive()) {
      visibleModalVeryCodeTwoFactor.value = true
    } else {
      props.makeTransaction()
    }
  } else {
    visibleModalVeryCodeTwoFactor.value = true
  }
}
const close = () => {
  visibleModalVeryCodeTwoFactor.value = false
}
const codeIsValid = (isValid: boolean) => {
  if (isValid) {
    props.makeTransaction()
    visibleModalVeryCodeTwoFactor.value = false
    return
  }
  visibleModalVeryCodeTwoFactor.value = true
}
</script>
<style lang="scss" scoped>
.line-top {
  border-top: 1px solid #f3f4f6;
}

.text-color-primary {
  color: var(--primary-color);
}
</style>
