<template>
  <div v-if="!isCompleted" class="formgrid grid mt-5 mb-5">
    <div class="col-12">
      <span class="mt-4">{{ t('Confirm wire information') }}</span>
      <Divider></Divider>
    </div>
    <div>
      <p class="title-beneficiary">{{ formData.beneficiary.informationOwner.name }}</p>
      <p class="font-ligth text-base">{{ formData?.beneficiary?.informationBank.accountNumber }}</p>
    </div>
    <Divider></Divider>

    <div class="col-12 field p-fluid">
      <div class="field col-12">
        <label for="name1">{{ t('Amount') }}</label>
        <p class="green-color">{{ formData.amountFee }} USD</p>
      </div>

      <div class="field col-12">
        <small>{{ t('fee') }}</small>
        <p class="green-color mt-0">
          <small>{{ formData.fee }} USD</small>
        </p>
      </div>
    </div>

    <div class="col-12 mb-2">
      <p class="text-base">Your are sending to {{ formData?.beneficiary?.informationOwner.name }}</p>
    </div>

    <div class="col-12 mb-2">
      <p class="font-medium green-color">{{ formData.amount }} USD</p>
    </div>

    <Button
      class="w-50 p-button search-btn"
      iconPos="right"
      :label="t('continue')"
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
import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { ref } from 'vue'
import { WithdrawService } from '../../services/withdraw'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useToast } from 'primevue/usetoast'
import ConfirmationCompletedWithdrawFiat from './ConfirmationCompletedWithdrawFiat.vue'
import VeryCodeTwoFactorAuth from '../../../../components/VeryCodeTwoFactorAuth.vue'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import showMessage from '../../../../shared/showMessageArray'

const toast = useToast()
const { updateBlockedBalanceWalletByCode } = useBalanceWallet()
const { isEnabledButtonToProceedWithdrawal, twoFactorIsActive } = useTwoFactorAuth()
const submitting = ref(false)
const isCompleted = ref(false)

const visibleModalVeryCodeTwoFactor = ref(false)

const transactionId = ref('')
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
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
    })
    .then((res: any) => {
      isCompleted.value = true
      transactionId.value = res.data.transactionId
      submitting.value = false
      updateBlockedBalanceWalletByCode('USD', props.formData.amount)
    })
    .catch(e => {
      submitting.value = false

      if (e.response.data.message) {
        toast.add({
          severity: 'error',
          summary: t('somethingWentWrong'),
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
