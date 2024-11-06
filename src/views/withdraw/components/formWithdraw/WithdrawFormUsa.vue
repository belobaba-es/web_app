<template>
  <div class="transfer-component pr-4 pl-4">
    <h3>{{ t('textWithdrawPanama') }}</h3>
    <div class="card col p-1">
      <div
        class="beneficiary-info flex justify-content-between p-4 mb-4"
        style="background: #000; border-top-left-radius: 10px; border-top-right-radius: 10px"
      >
        <div class="col-6">
          <div>
            <p class="font-regular text-16 m-0 text-white">
              {{ t('bankAccountHolder') }}:
              <span class="font-medium text-16 color-green">{{
                dataBeneficiaryWithdrawal.informationOwner?.name
              }}</span>
            </p>
          </div>

          <div>
            <p class="font-regular text-16 m-0 text-white">
              {{ t('accountNumber') }}:
              <span class="font-medium text-16 color-green">{{
                dataBeneficiaryWithdrawal.informationBank?.accountNumber
              }}</span>
            </p>
          </div>
        </div>

        <div class="col-6 flex justify-content-end">
          <div>
            <p class="font-regular m-0 text-right text-white">{{ t('textBalance') }}</p>
            <span class="font-medium text-16 color-green">${{ balance }}</span>
          </div>
        </div>
      </div>

      <div class="amount-info flex justify-content-center pt-0">
        <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
          <label class="font-regular">{{ t('textSend') }}</label>
          <div class="p-inputgroup flex">
            <InputNumber
              v-model="transactionData.amount as number"
              :maxFractionDigits="2"
              :minFractionDigits="2"
              class="w-full text-center"
              placeholder="0.00"
              required
              type="text"
            />
          </div>

          <span class="fee flex justify-content-end font-medium color-green">{{ t('fee') }} {{ fee }}$</span>

          <div class="circle-bottom text-center">
            <i class="pi pi-arrow-right-arrow-left text-16 text-1xl text-white" style="line-height: 2"></i>
          </div>

          <label class="font-regular">{{ t('textReceives') }}</label>
          <div class="p-inputgroup text-center">
            <InputNumber
              v-model="transactionData.amount"
              :maxFractionDigits="2"
              :minFractionDigits="2"
              class="w-full text-center"
              disabled
              placeholder="0.00"
              type="text"
            />
          </div>
        </div>

        <div class="col-1 flex lg:justify-content-center">
          <div class="separator-line"></div>
        </div>

        <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
          <div class="mb-4">
            <label>{{ t('purposeWithdrawal') }}</label>
            <Dropdown
              v-model="transactionData.purpose"
              :options="WithdrawalPurpose(isAccountSegregated())"
              :placeholder="t('textOption')"
              class="custom-dropdown w-full p-1"
              option-value="value"
              optionLabel="name"
              required
            />
          </div>

          <div class="mt-4">
            <label>{{ t('Note') }}</label>
            <label>{{ t('Note') }}</label>
            <div class="p-inputgroup">
              <InputText v-model="transactionData.reference" :placeholder="t('reference')" class="w-full" type="text" />
            </div>
          </div>
        </div>
      </div>

      <div class="pl-5 pr-5 pt-0 mt-4 mb-4">
        <MessageAlertActiveTwoFactorAuth />
      </div>
      <div class="flex pl-5 pr-5 pt-0 mt-4 mb-4">
        <div class="col">
          <p class="m-0">
            {{ t('textnote1') }} <span class="font-semi-bold">{{ t('continue') }}</span
            >.
          </p>
          <p class="m-0">
            {{ t('textnote2') }} <span class="font-semi-bold">{{ t('backButtonTitle') }}</span> .
          </p>
        </div>

        <div class="flex justify-content-end">
          <div>
            <Button :label="t('backButtonTitle')" class="mr-4 w-8rem" outlined severity="secondary" @click="toBack" />
          </div>
          <div>
            <Button
              :disabled="!isEnabledButtonToProceedWithdrawal"
              :label="t('continue')"
              class="mr-4 w-8rem"
              @click="validateForm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :style="{ width: '30rem' }"
    modal
    :show-header="false"
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
    <ConfirmWithdrawUsa :makeTransaction="makeTransaction" :subtitle="t('ModalConfirmSubtitleUSA')" />
  </Dialog>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useWithdraw } from '../../composable/useWithdraw'
import { WithdrawalPurpose } from '../../../../shared/propuseWithdrawal'
import { useAuth } from '../../../../composables/useAuth'
import MessageAlertActiveTwoFactorAuth from '../../../../components/MessageAlertActiveTwoFactorAuth.vue'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import ConfirmWithdrawUsa from '../modalWithdraw/ConfirmWithdrawUsa.vue'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })
const { transactionData, toBack, dataBeneficiaryWithdrawal, fee, balance, makeTransaction, isValidFormWithdrawal } =
  useWithdraw()
const { isEnabledButtonToProceedWithdrawal } = useTwoFactorAuth()
const { isAccountSegregated } = useAuth()
const toast = useToast()
const visible = ref(false)
const close = () => {
  visible.value = false
}
const validateForm = () => {
  if (!isValidFormWithdrawal()) {
    toast.add({
      severity: 'warn',
      detail: t('completeForm'),
      life: 4000,
    })
    return
  }
  visible.value = true
}
</script>

<style lang="scss" scoped>
.custom-dropdown {
  border-radius: 4px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.card {
  border: 1px solid var(--primary-color);
  margin: 0 auto;
}

.separator-line {
  border-left: 1px solid var(--primary-color);
  height: 100%;
}

.circle-bottom {
  background: var(--primary-color);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  color: white;
}

.color-green {
  color: var(--primary-color);
}

.text-16 {
  font-size: 16px;
}
</style>
