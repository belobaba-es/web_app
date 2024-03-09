<template>
  <div v-if="!isCompleted" class="formgrid grid mt-5 mb-5">
    <div class="col-12">
      <span class="mt-4">{{ t('Confirm wire information') }}</span>
      <Divider></Divider>
      <div>
        <p class="title-beneficiary">{{ formData?.beneficiary?.achInstructions.holderName }}</p>
        <p class="font-ligth text-base">{{ formData?.beneficiary?.achInstructions.accountDestinationNumber }}</p>
      </div>
    </div>
    <Divider></Divider>

    <div class="col-12 field p-fluid">
      <div class="field col-12">
        <label for="name1">{{ t('Amount') }}</label>
        <p class="green-color">{{ formData.amount }} PAD</p>
      </div>

      <div class="field col-12">
        <small>{{ t('fee') }}</small>
        <p class="green-color mt-0">
          <small>{{ formData.fee }} USD PA</small>
        </p>
      </div>
    </div>

    <div class="col-12 mb-2">
      <p class="text-base">Your are sending to {{ formData?.beneficiary?.achInstructions.holderName }}</p>
    </div>

    <div class="col-12 mb-2">
      <p class="font-medium green-color">{{ formData.amount }} PAD</p>
    </div>

    <Button
      class="w-50 p-button search-btn"
      iconPos="right"
      :label="t('confirmWithdraw')"
      @click="showModalVeryCodeTwoFactorOrMakeTransaction()"
      :loading="submitting"
    />

    <Dialog
      v-model:visible="visibleModalVeryCodeTwoFactor"
      :header="t('twoFactor')"
      position="bottom"
      :modal="true"
      :draggable="false"
    >
      <VeryCodeTwoFactorAuth @codeIsValid="verifyCodeTwoFactorAuth" />
    </Dialog>
  </div>

  <ConfirmationCompletedWithdrawFiat v-if="isCompleted" :form-data="props.formData" :transaction-id="transactionId" />
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import ConfirmationCompletedWithdrawFiat from './ConfirmationCompletedWithdrawAchPA.vue'
import VeryCodeTwoFactorAuth from '../../../components/VeryCodeTwoFactorAuth.vue'
import { useTransactionPab } from './composable/useTransactionPab'
import { WithdrawService } from '../services/withdraw'
import showMessage from '../../../shared/showMessageArray'
import { useTwoFactorAuth } from '../../../composables/useTwoFactorAuth'

const toast = useToast()
const submitting = ref(false)
const isCompleted = ref(false)

const { transactionId } = useTransactionPab()
const { isEnabledButtonToProceedWithdrawal, twoFactorIsActive } = useTwoFactorAuth()
const visibleModalVeryCodeTwoFactor = ref(false)

const { t } = useI18n({ useScope: 'global' })

const props = defineProps<{
  formData: any
}>()
const showModalVeryCodeTwoFactorOrMakeTransaction = () => {
  if (isEnabledButtonToProceedWithdrawal.value) {
    if (twoFactorIsActive()) {
      visibleModalVeryCodeTwoFactor.value = true
    } else {
      makeTransaction()
    }
  } else {
    visibleModalVeryCodeTwoFactor.value = true
  }
}

const verifyCodeTwoFactorAuth = (res: boolean) => {
  if (res) {
    visibleModalVeryCodeTwoFactor.value = false
    makeTransaction()
  }
}

function makeTransaction() {
  submitting.value = true

  new WithdrawService()
    .makeFiatExternalTransfer({
      amount: props.formData.amount,
      beneficiaryId: props.formData.beneficiary.counterpartyId,
      reference: props.formData.reference,
      purpose: props.formData.purpose,
    })
    .then((res: any) => {
      toast.add({
        severity: 'success',
        summary: t('success'),
        detail: res.message,
        life: 4000,
      })
      isCompleted.value = true
      transactionId.value = res.data.transactionId
      submitting.value = false
    })
    .catch(e => {
      submitting.value = false

      if (e.response.data.message) {
        toast.add({
          severity: 'error',
          summary: e.response.data.error || 'Something went wrong',
          detail: e.response.data.message,
          life: 4000,
        })
        return
      }

      showMessage(toast, e.response.data)
    })
}
</script>

<style scoped>
.green-color {
  color: var(--primary-color);
}

.mt-5 {
  margin-top: 22px !important;
}
</style>