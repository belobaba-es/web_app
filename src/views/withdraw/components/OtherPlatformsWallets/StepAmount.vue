<template>
  <div class="formgrid grid mt-3">
    <div class="col-12 m-2">
      <span class="mt-4">{{ t('beneficiary') }}</span>
      <Divider></Divider>
    </div>

    <div class="grid col-12">
      <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
        <h5 class="text-base text-600">{{ t('description') }}</h5>
      </div>

      <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
        <h5 class="text-base text-600">{{ t('walletAddress') }}</h5>
      </div>
    </div>

    <div class="grid col-12">
      <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
        <p class="text-base font-medium">{{ beneficiary.informationOwner.name }}</p>
      </div>

      <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
        <p class="text-base font-medium wallet-address">{{ beneficiary.informationWallet.address }}</p>
      </div>
    </div>

    <div v-if="showAmount" class="grid col-12 mb-2 mt-3">
      <div class="col-4 sm:col-4 md:col-4 lg:col-4 xl:col-4">
        <p>
          <label for="amount">{{ t('Amount') }}</label>
        </p>
      </div>

      <div class="col-8 sm:col-8 md:col-8 lg:col-8 xl:col-8">
        <p class="text-base text-amount">
          {{ t('currentBalance') }}: <b class="font-medium">{{ balance }} {{ assetSymbol }}</b>
        </p>
      </div>
    </div>

    <div v-if="showAmount" class="grid col-12 flex w-full">
      <div class="flex w-full">
        <InputNumber
          id="amount"
          class="p-inputtext p-component b-gray w-full btn-amount"
          v-model="amount"
          :placeholder="t('amount')"
          :minFractionDigits="2"
          :maxFractionDigits="8"
        />
        <span class="p-inputgroup-addon symbol text-capitalize">{{ assetSymbol }}</span>
      </div>
    </div>

    <div v-if="showAmount" class="col-12 field mt-2">
      <Timeline :value="events">
        <template #content="slotProps">
          {{ slotProps.item.label }}
          <p class="font-medium" v-if="slotProps.item.label">
            {{ slotProps.item.amount }} <small>{{ assetSymbol }}</small>
          </p>
          <p v-else>
            {{ slotProps.item.amount }} <small>{{ assetSymbol }}</small>
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
      <div class="col-8">
        <label for="">{{ t('Reference') }}</label>
        <InputText
          type="text"
          minlength="3"
          maxlength="60"
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
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Timeline from 'primevue/timeline'
import Button from 'primevue/button'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useToast } from 'primevue/usetoast'
import MessageAlertActiveTwoFactorAuth from '../../../../components/MessageAlertActiveTwoFactorAuth.vue'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import Dropdown from 'primevue/dropdown'
import { WithdrawalPurpose } from '../../../../shared/propuseWithdrawal'
import { useAuth } from '../../../../composables/useAuth'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const { getBalanceByCode, getWalletByAssetCode } = useBalanceWallet()
const { isEnabledButtonToProceedWithdrawal } = useTwoFactorAuth()
const { isAccountSegregated } = useAuth()

const props = defineProps<{
  formData: any
}>()

const beneficiary = props.formData.beneficiary

const emit = defineEmits(['nextPage'])
const amount = ref<number>(0)
const fee = ref(0)
const reference = ref('')
const assetId = ref('')
const asset = ref('')
const assetSymbol = ref('')
const balance = ref(0)
const total = ref(0)
const showAmount = ref(true)
const purpose = ref('')

onMounted(() => {
  asset.value = props.formData.beneficiary.assetCode
  assetId.value = props.formData.beneficiary.assetId
  balance.value = getBalanceByCode(asset.value)
  assetSymbol.value = getWalletByAssetCode(asset.value)?.assetCode ?? ''
  fee.value = props.formData.beneficiary.fee
})

const amountFee = computed(() => {
  fee.value = fee.value ?? 0

  const subtotal = isNaN(amount.value - fee.value) ? 0 : amount.value - fee.value
  if (subtotal > Number(balance.value)) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please enter the amount you wish to send.',
      life: 4000,
    })

    amount.value = 0

    total.value = 0
  }

  total.value = Number(subtotal.toFixed(8))
  return Number(subtotal.toFixed(8))
})

const events = computed(() => {
  return [
    { amount: fee.value, label: t('Fee'), name: false },
    {
      amount: amountFee.value,
      label: `${t('youSendTo')}: ${props.formData.beneficiary.informationOwner.name}`,
      name: true,
    },
  ]
})

const validateField = (): boolean => {
  if (purpose.value == '') {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please selected Purpose of the withdrawal.',
      life: 4000,
    })

    return false
  }
  if (amount.value === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please enter the amount you wish to send.',
      life: 4000,
    })

    return false
  }

  if (reference.value.trim().length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please include a reference.',
      life: 4000,
    })

    return false
  }

  return true
}

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
    asset: asset.value,
    symbol: assetSymbol.value,
    assetId: assetId.value,
    total: total.value,
    purpose: isAccountSegregated() ? 'LOAN' : purpose.value,
  }

  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}
</script>

<style scoped>
.title-beneficiary {
  color: #14443f;
}

.wallet-address {
  word-wrap: break-word;
  text-align: start;
}
</style>