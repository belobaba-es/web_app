<template>
  <div class="formgrid grid mt-3">
    <div class="col-12 m-2">
      <span class="mt-4">{{ t('youBeneficiaries') }}</span>
      <Divider></Divider>
    </div>

    <div class="grid col-12 mb-4">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <p class="title-beneficiary text-capitalize">{{ beneficiary.name }}</p>
      </div>

      <!--      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">-->
      <!--        <p class="text-base text-end">{{ beneficiary.email }}</p>-->
      <!--      </div>-->
    </div>

    <SelectedAssets v-if="showSelectedAsset" @selectedAsset="selectedAsset" />

    <div v-if="showAmount" class="grid col-12 mb-2">
      <div class="col-4 sm:col-4 md:col-4 lg:col-4 xl:col-4">
        <p>
          <label for="amount">{{ t('Amount') }}</label>
        </p>
      </div>

      <div class="col-8 sm:col-8 md:col-8 lg:col-8 xl:col-8">
        <p class="text-end text-base text-amount">
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

    <div v-if="showAmount" class="col-12 field mt-4">
      <Timeline :value="events">
        <template #content="slotProps">
          {{ slotProps.item.label }}
          <span v-if="slotProps.item.name">{{ beneficiary.name }}</span>

          <p class="font-medium" v-if="slotProps.item.name">
            {{ amountFee }} <small>{{ assetSymbol }}</small>
          </p>
          <p v-else>
            {{ fee }} <small>{{ assetSymbol }}</small>
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Timeline from 'primevue/timeline'
import Button from 'primevue/button'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useToast } from 'primevue/usetoast'
import SelectedAssets from '../../../../components/SelectedAssets.vue'
import { Asset } from '../../../deposit/types/asset.interface'
import MessageAlertActiveTwoFactorAuth from '../../../../components/MessageAlertActiveTwoFactorAuth.vue'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import { UserAccount } from '../../types/account'
import { WithdrawalPurpose } from '../../../../shared/propuseWithdrawal'
import Dropdown from 'primevue/dropdown'
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

const beneficiary = props.formData.beneficiary as UserAccount

const emit = defineEmits(['nextPage'])
const amount = ref(0)
const fee = ref(0)
const reference = ref('')
const assetId = ref('')
const asset = ref('USD')
const assetSymbol = ref('USD')
const balance = ref(0)
const total = ref(0)
const purpose = ref('')
const isAsset = route.params.type === 'crypto'

const showAmount = ref(!isAsset)
const showSelectedAsset = ref(isAsset)

balance.value = getBalanceByCode(asset.value)
assetSymbol.value = getWalletByAssetCode(asset.value)?.assetCode ?? 'USD'

const events = ref([
  { amount: '2,5', label: t('Fee'), name: false },
  { amount: '2,5', label: t('youSendTo'), name: true },
])

const amountFee = computed(() => {
  fee.value = fee.value ?? 0
  const t = isNaN(amount.value - fee.value) ? 0 : amount.value - fee.value
  if (t > Number(balance.value)) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please enter the amount you wish to send.',
      life: 4000,
    })

    amount.value = 0

    total.value = 0
  }

  if (assetSymbol.value === 'USD') {
    total.value = Number(t.toFixed(2))
  }

  total.value = Number(t.toFixed(8))

  return Number(t.toFixed(8))
})

const validateField = (): boolean => {
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
const onInput = (event: any) => {
  if (event.target.value.startsWith('00')) {
    amount.value = 0
  }
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
    assetCode: assetSymbol.value,
    total: total.value,
    purpose: purpose.value,
  }
  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}

const selectedAsset = (evt: Asset) => {
  showAmount.value = true
  assetSymbol.value = evt.code

  balance.value = getBalanceByCode(evt.code)
  fee.value = evt.fee
  assetId.value = evt.assetId
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

.text-end {
  text-align: end !important;
}
</style>