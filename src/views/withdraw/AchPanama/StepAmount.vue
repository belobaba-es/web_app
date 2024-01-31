<template>
  <div class="formgrid grid mt-3">
    <div class="col-12 m-2">
      <span class="mt-4">{{ t('youBeneficiaries') }}</span>
      <Divider></Divider>
    </div>

    <div class="grid col-12 mb-4">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <p class="title-beneficiary text-capitalize">{{ formData?.beneficiary?.achInstructions.holderName }}</p>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <p class="text-base">{{ formData?.beneficiary?.accountNumber }}</p>
      </div>
    </div>

    <div class="grid col-12 mb-2">
      <div class="col-4 sm:col-4 md:col-4 lg:col-4 xl:col-4">
        <p>
          <label for="amount">{{ t('Amount') }}</label>
        </p>
      </div>

      <div class="col-8 sm:col-8 md:col-8 lg:col-8 xl:col-8">
        <p class="text-base text-amount">
          {{ t('currentBalance') }}: <b class="font-medium">{{ balance }} PAB</b>
        </p>
      </div>
    </div>

    <div class="grid col-12 flex w-full">
      <div class="flex w-full">
        <InputNumber
          id="amount"
          type="number"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          class="p-inputtext p-component b-gray w-full btn-amount"
          v-model="transactionData.amount"
          :placeholder="t('amount')"
        />
        <span class="p-inputgroup-addon symbol text-capitalize">PAB</span>
      </div>
    </div>

    <div class="col-12 field mt-4">
      <Timeline :value="events">
        <template #content="slotProps">
          {{ slotProps.item.label }}
          <span v-if="slotProps.item.holderName">{{ formData.holderName }}</span>

          <p class="font-medium" v-if="slotProps.item.name">{{ transactionData.amount }} <small>PAB</small></p>
          <p v-else>
            <small>{{ amount }}</small>
          </p>
        </template>
      </Timeline>
    </div>

    <div class="col-12 field p-fluid">
      <div class="col-8">
        <label for="">{{ t('purposeWithdrawal') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="transactionData.purpose"
            :options="WithdrawalPurpose(isAccountSegregated())"
            optionLabel="name"
            option-value="value"
            class="w-full"
            required
          />
        </div>
      </div>
    </div>

    <div class="col-12 field p-fluid">
      <div class="col-6">
        <label for="">{{ t('Reference') }}</label>
        <InputText
          minlength="3"
          maxlength="60"
          type="text"
          class="p-inputtext p-component b-gray"
          v-model="transactionData.concept"
          :placeholder="t('reference')"
        />
      </div>
    </div>

    <MessageAlertActiveTwoFactorAuth />

    <div class="col-6" v-if="isEnabledButtonToProceedWithdrawal">
      <Button class="w-100 p-button" :label="t('continue')" @click="nextPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { useI18n } from 'vue-i18n'
import Timeline from 'primevue/timeline'
import Button from 'primevue/button'
import { useTwoFactorAuth } from '../../../composables/useTwoFactorAuth'
import MessageAlertActiveTwoFactorAuth from '../../../components/MessageAlertActiveTwoFactorAuth.vue'
import { WithdrawalPurpose } from '../../../shared/propuseWithdrawal'
import Dropdown from 'primevue/dropdown'
import { useAuth } from '../../../composables/useAuth'
import { useTransactionPab } from './composable/useTransactionPab'

const { t } = useI18n({ useScope: 'global' })

const { transactionData, events, validateField, amountFee, balance, amount, fee } = useTransactionPab()

const props = defineProps<{
  formData: any
}>()
const emit = defineEmits(['nextPage'])

console.log('formData', props.formData)

const { isAccountSegregated } = useAuth()

const { isEnabledButtonToProceedWithdrawal } = useTwoFactorAuth()

const nextPage = () => {
  if (!validateField()) {
    return
  }

  const page = 1

  const formData = {
    ...props.formData.value,
    amount: transactionData.value.amount,
    fee: fee.value,
    concept: transactionData.value.concept,
    amountFee: amountFee,
    reference: transactionData.value.reference,
  }

  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}
</script>

<style lang="scss">
.title-beneficiary {
  color: #14443f;
}

.text-amount {
  @media only screen and (max-width: 992px) {
    text-align: right;
  }

  @media only screen and (min-width: 993px) {
    text-align: left;
  }
}

.btn-amount {
  @media only screen and (max-width: 992px) {
    max-width: 100%;
  }

  @media only screen and (min-width: 993px) {
    max-width: 80%;
  }

  @media only screen and (min-width: 1440px) {
    max-width: 60%;
  }
}
</style>