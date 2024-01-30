<template>
  <div class="formgrid grid mt-3">
    <div class="col-12 m-2">
      <span class="mt-4">{{ t('youBeneficiaries') }}</span>
      <Divider></Divider>
    </div>

    <div class="grid col-12 mb-4">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <p class="title-beneficiary text-capitalize">{{ formData?.beneficiary?.realName }}</p>
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
          v-model="amount"
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

          <p class="font-medium" v-if="slotProps.item.name">{{ amount }} <small>PAB</small></p>
          <p v-else>
            <small>{{ fee }}</small>
          </p>
        </template>
      </Timeline>
    </div>

    <div class="col-12 field p-fluid">
      <div class="col-8">
        <label for="">{{ t('purposeWithdrawal') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="purpose"
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
          v-model="reference"
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Timeline from 'primevue/timeline'
import Button from 'primevue/button'
import { useBalanceWallet } from '../../../composables/useBalanceWallet'
import { useToast } from 'primevue/usetoast'
import { useTwoFactorAuth } from '../../../composables/useTwoFactorAuth'
import MessageAlertActiveTwoFactorAuth from '../../../components/MessageAlertActiveTwoFactorAuth.vue'
import { WithdrawalPurpose } from '../../../shared/propuseWithdrawal'
import Dropdown from 'primevue/dropdown'
import { useAuth } from '../../../composables/useAuth'
import { useTransactionPab } from './composable/useTransactionPab'

const { getBalanceByCode } = useBalanceWallet()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()

const { transactionData, events, validateField } = useTransactionPab()

const props = defineProps<{
  formData: any
}>()
const emit = defineEmits(['nextPage'])
const { isAccountSegregated } = useAuth()
const amount = ref(0)
const fee = ref(0)
const reference = ref('')
const balance = ref(0)
const purpose = ref('')

const { isEnabledButtonToProceedWithdrawal } = useTwoFactorAuth()

balance.value = getBalanceByCode('PAB')

const amountFee = computed(() => {
  const total = isNaN(amount.value + fee.value) ? 0 : amount.value + fee.value
  if (total > balance.value) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please enter the amount you wish to send.',
      life: 4000,
    })

    amount.value = 0

    return 0
  }

  return total
})

const nextPage = () => {
  if (!validateField()) {
    return
  }

  const page = 1

  const formData = {
    ...props.formData.value,
    amount: amount.value,
    fee: fee.value,
    reference: reference.value,
    amountFee: amountFee,
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