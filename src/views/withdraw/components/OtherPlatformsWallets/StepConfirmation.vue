<template>
  <div v-if="!isCompleted" class="formgrid grid mt-5 mb-5">
    <div class="col-12">
      <span class="mt-4">{{ t('Confirm withdraw information') }}</span>
      <Divider></Divider>
    </div>
    <div class="col-12">
      <h5 class="text-base text-600">{{ t('description') }}</h5>
      <p class="text-base font-medium">{{ beneficiary.informationOwner.name }}</p>
    </div>
    <div class="col-12">
      <h5 class="text-base text-600">{{ t('walletAddress') }}</h5>
      <p class="text-base font-medium">{{ beneficiary.informationWallet.address }}</p>
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
      <p class="text-base">Your are sending to: {{ beneficiary.informationOwner.name }}</p>
    </div>

    <div class="col-12">
      <p class="font-medium green-color">{{ formData.total }} {{ assetSymbol }}</p>
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

    <Button
      class="w-50 p-button search-btn"
      iconPos="right"
      :label="t('confirmWithdraw')"
      @click="showModalVeryCodeTwoFactorOrMakeTransaction()"
      :loading="submitting"
    />
  </div>

  <ConfirmationCompletedWithOtherPlatformsWallet
    v-if="isCompleted"
    :form-data="props.formData"
    :transaction-id="transactionId"
  />
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import { WithdrawService } from '../../services/withdraw'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import ConfirmationCompletedWithOtherPlatformsWallet from './ConfirmationCompletedWithOtherPlatformsWallet.vue'
import VeryCodeTwoFactorAuth from '../../../../components/VeryCodeTwoFactorAuth.vue'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import showMessage from '../../../../shared/showMessageArray'

const toast = useToast()
const { isEnabledButtonToProceedWithdrawal, twoFactorIsActive } = useTwoFactorAuth()
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const submitting = ref(false)
const props = defineProps<{
  formData: any
}>()
const assetSymbol = props.formData.symbol
const beneficiary = props.formData.beneficiary
const emit = defineEmits(['complete'])

const isCompleted = ref(false)
const visibleModalVeryCodeTwoFactor = ref(false)

const transactionId = ref('')

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
  const withDrawService = new WithdrawService()
  submitting.value = true
  withDrawService
    .makeAssetExternalTransfer({
      amount: props.formData.total,
      beneficiaryAssetId: props.formData.beneficiary.counterpartyId,
      reference: props.formData.reference,
      purpose: props.formData.purpose,
    })
    .then((res: any) => {
      transactionId.value = res.data.transactionId
      isCompleted.value = true
      submitting.value = false
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
</style>
