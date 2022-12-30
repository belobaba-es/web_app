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
        <p class="text-base font-medium">{{ beneficiary.label }}</p>
      </div>

      <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
        <p class="text-base font-medium wallet-address">{{ beneficiary.walletAddress }}</p>
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
        <InputText
          id="amount"
          type="number"
          class="p-inputtext p-component b-gray w-full btn-amount"
          v-model="amount"
          :placeholder="t('amount')"
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
        <label for="">{{ t('Reference') }}</label>
        <InputText
          type="text"
          class="p-inputtext p-component b-gray"
          v-model="reference"
          :placeholder="t('reference')"
        />
      </div>
    </div>

    <div class="col-12 m-2">
      <span>{{ t('The wire will take 24 hours.') }}</span>
    </div>
    <div class="col-6">
      <Button class="w-100 p-button" :label="t('continue')" @click="nextPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Timeline from 'primevue/timeline'
import Button from 'primevue/button'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useToast } from 'primevue/usetoast'
import { Asset } from '../../../deposit/types/asset.interface'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const { getBalanceByCode, getWalletByAssetCode } = useBalanceWallet()

const props = defineProps<{
  formData: any
}>()

const beneficiary = props.formData.beneficiary

const emit = defineEmits(['nextPage'])
const amount = ref('')
const fee = ref(0)
const reference = ref('')
const assetId = ref('')
const asset = ref('')
const assetSymbol = ref('')
const balance = ref(0)
const total = ref(0)
const showAmount = ref(true)

onMounted(() => {
  asset.value = props.formData.beneficiary.assetCode
  assetId.value = props.formData.beneficiary.assetId
  balance.value = getBalanceByCode(asset.value)
  assetSymbol.value = getWalletByAssetCode(asset.value)?.assetCode ?? ''
  fee.value = props.formData.beneficiary.fee
})

const amountFee = computed(() => {
  const t = isNaN(parseFloat(amount.value) - fee.value) ? 0 : parseFloat(amount.value) - fee.value
  if (t > balance.value) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please enter the amount you wish to send.',
      life: 4000,
    })

    amount.value = '0'

    total.value = 0
  }

  total.value = Number(t.toFixed(8))
  console.log(fee.value)
  return Number(t.toFixed(8))
})

const events = computed(() => {
  return [
    { amount: fee.value, label: t('Fee'), name: false },
    { amount: amountFee.value, label: `${t('youSendTo')}: ${props.formData.beneficiary.label}`, name: true },
  ]
})

const validateField = (): boolean => {
  if (amount.value.trim().length === 0) {
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
  }
  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}

const selectedAsset = (evt: Asset) => {
  console.log('SELEEEEEE', evt)
  showAmount.value = true
  assetSymbol.value = evt.code

  balance.value = getBalanceByCode(evt.code)
  fee.value = evt.fee
  assetId.value = evt.assetId
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
