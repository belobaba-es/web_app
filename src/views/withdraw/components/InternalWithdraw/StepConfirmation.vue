<template>
  <div v-if="!isCompleted" class="formgrid grid mt-5 mb-5">
    <div class="col-12">
      <span class="mt-4">{{ t('Confirm wire information') }}</span>
      <Divider></Divider>
    </div>
    <div>
      <p class="title-beneficiary">{{ beneficiary.name }}</p>
    </div>
    <Divider></Divider>

    <div class="col-12 field p-fluid">
      <div class="field col-12">
        <label for="name1">{{ t('Amount') }}</label>
        <p class="green-color">{{ formData.amount }} {{ formData.symbol }}</p>
      </div>
      <div class="field col-12">
        <small>{{ t('fee') }}</small>

        <p class="green-color mt-0">
          <small>{{ formData.fee }} {{ formData.symbol }}</small>
        </p>
      </div>
    </div>

    <div class="col-12 mb-2">
      <p class="text-base">Your are sending to {{ beneficiary.name }}</p>
    </div>

    <div class="col-12">
      <p class="font-medium green-color">{{ formData.total }} {{ assetSymbol }}</p>
    </div>

    <Button
      class="w-50 p-button search-btn"
      iconPos="right"
      :label="t('confirmWithdraw')"
      @click="showModalVeryCodeTwoFactorOrMakeTransaction()"
      :loading="submitting"
    />
  </div>

  <Dialog
    v-model:visible="visibleModalVeryCodeTwoFactor"
    :header="t('twoFactor')"
    position="bottom"
    :modal="true"
    :draggable="false"
  >
    <VeryCodeTwoFactorAuth @codeIsValid="verifyCodeTwoFactorAuth" />
  </Dialog>

  <ConfirmationCompletedWithdrawInternal
    v-if="isCompleted"
    :beneficiary="beneficiary"
    :form-data="props.formData"
    :transaction-id="transactionId"
  />
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { WithdrawService } from '../../services/withdraw'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import ConfirmationCompletedWithdrawInternal from './ConfirmationCompletedWithdrawInternal.vue'
import VeryCodeTwoFactorAuth from '../../../../components/VeryCodeTwoFactorAuth.vue'
import Dialog from 'primevue/dialog'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import showMessage from '../../../../shared/showMessageArray'

const visibleModalVeryCodeTwoFactor = ref(false)

const toast = useToast()
const { isEnabledButtonToProceedWithdrawal, twoFactorIsActive } = useTwoFactorAuth()
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const transactionId = ref('')
const submitting = ref(false)
const isCompleted = ref(false)
const props = defineProps<{
  formData: any
}>()
const assetSymbol = props.formData.symbol
const beneficiary = props.formData.beneficiary
const emit = defineEmits(['complete'])
const router = useRouter()

const verifyCodeTwoFactorAuth = (res: boolean) => {
  if (res) {
    visibleModalVeryCodeTwoFactor.value = false
    makeTransaction()
  }
}

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

function makeTransaction() {
  submitting.value = true
  console.log(props.formData)
  switch (route.params.type) {
    case 'fiat':
      new WithdrawService()
        .makeFiatInternalTransfer({
          amount: props.formData.amount,
          clientIdDestination: props.formData.beneficiary.clientId,
          reference: props.formData.reference,
        })
        .then((res: any) => {
          transactionId.value = res.data.transactionId
          submitting.value = false
          isCompleted.value = true
        })
        .catch(e => {
          submitting.value = false

          toast.add({
            severity: 'error',
            summary: t('somethingWentWrong'),
            detail: e.response.data.message,
            life: 4000,
          })
        })
      break
    case 'crypto':
      new WithdrawService()
        .makeAssetInternalTransfer({
          clientIdDestination: props.formData.beneficiary.clientId,
          amount: props.formData.amount,
          reference: props.formData.reference,
          assetCode: props.formData.assetCode,
          purpose: props.formData.purpose,
        })
        .then((res: any) => {
          transactionId.value = res.data.transactionId
          submitting.value = false
          isCompleted.value = true
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
      break
    default:
      submitting.value = false
  }
}
</script>

<style scoped>
.title-beneficiary {
  color: #14443f;
}

.green-color {
  color: var(--primary-color);
}
</style>