<template>
  <div v-if="!isCompleted" class="formgrid grid mt-5 mb-5">
    <div class="col-12">
      <span class="mt-4">{{ t('transactionConfirmation') }}</span>
      <Divider></Divider>
    </div>
    <div>
      <p class="title-beneficiary">{{ beneficiary.name }}</p>
    </div>
    <Divider></Divider>

    <div class="col-12 field p-fluid">
      <div class="field col-12">
        <label for="name1">{{ t('Amount') }}</label>
        <p class="green-color">{{ formData.amount }} {{ formData.assetCode }}</p>
      </div>
      <div class="field col-12">
        <small>{{ t('fee') }}</small>

        <p class="green-color mt-0">
          <small>{{ formData.fee }} {{ formData.assetCode }}</small>
        </p>
      </div>
    </div>

    <div class="col-12 mb-2">
      <p class="text-base">Your are sending to {{ props.formData.name }}</p>
    </div>

    <div class="col-12">
      <p class="font-medium green-color">{{ formData.total }} {{ formData.assetCode }}</p>
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
    :beneficiary="props.formData.beneficiary"
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
import ConfirmationCompletedWithdrawInternal from './ConfirmationCompletedWithdrawInternal.vue'
import VeryCodeTwoFactorAuth from '../../../../components/VeryCodeTwoFactorAuth.vue'
import Dialog from 'primevue/dialog'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import showMessage from '../../../../shared/showMessageArray'
import { AssetClassification } from '../../../deposit/types/asset.interface'

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

async function makeTransaction() {
  submitting.value = true

  if (props.formData.assetClassification === AssetClassification.FIAT) {
    await fiatTransaction()
  }

  if (props.formData.assetClassification !== AssetClassification.FIAT) {
    await cryptoTransaction()
  }
}

const fiatTransaction = async () => {
  await new WithdrawService()
    .makeFiatInternalTransfer({
      clientIdDestination: props.formData.beneficiary.clientId,
      amount: props.formData.amount,
      reference: props.formData.reference,
      assetCode: props.formData.assetCode,
      purpose: props.formData.purpose,
    })
    .then((res: any) => {
      transactionId.value = res.data.transactionId
      handleSuccess(res.message, res.data.transactionId)
    })
    .catch(e => {
      handleError(e)
    })
}
const cryptoTransaction = async () => {
  await new WithdrawService()
    .makeAssetInternalTransfer({
      clientIdDestination: props.formData.beneficiary.clientId,
      amount: props.formData.amount,
      reference: props.formData.reference,
      assetCode: props.formData.assetCode,
      purpose: props.formData.purpose,
    })
    .then((res: any) => {
      handleSuccess(res.message, res.data.transactionId)
    })
    .catch(e => {
      handleError(e)
    })
}

const handleSuccess = (message: any, transactionId: string) => {
  submitting.value = false
  isCompleted.value = true

  toast.add({
    severity: 'success',
    summary: t('transactionCompleted'),
    detail: message,
    life: 4,
  })
}

const handleError = (e: any) => {
  submitting.value = false

  if (e.response.data.message) {
    toast.add({
      severity: 'error',
      summary: t('somethingWentWrong'),
      detail: e.response.data.message,
      life: 4,
    })
    return
  }

  showMessage(toast, e.response.data)
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
