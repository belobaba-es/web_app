<template>
  <div class="formgrid grid mt-3">
    <div class="col-12 m-2">
      <span class="mt-4">{{ t('youBeneficiaries') }}</span>
      <Divider></Divider>
    </div>

    <div class="col-12 mb-4">
      <p class="title-beneficiary">{{ beneficiary.name }}</p>
      <p class="text-base">{{ beneficiary.email }}</p>
    </div>

    <SelectedAssets v-if="showSelectedAsset" @selectedAsset="selectedAsset"/>

    <div v-if="showAmount" class="col-12 field p-fluid mt-3">

      <div class="field col-8 relative">
        <span class="text-left absolute" style="right: 0px;">
          {{ t('currentBalance') }}: <b class="font-medium">{{ balance }} {{ assetSymbol }}</b></span>
        <label for="amount">{{ t('Amount') }}</label>

        <div class="flex">
          <InputText
              id="amount"
              type="number"
              class="p-inputtext p-component b-gray"
              v-model="amount"
              :placeholder="t('amount')"
          />
          <span class="p-inputgroup-addon symbol text-capitalize">{{ assetSymbol }}</span>
        </div>
      </div>
    </div>

    <div v-if="showAmount" class="col-12 field">
      <Timeline :value="events">

        <template #content="slotProps">
          {{ slotProps.item.label }}
          <span v-if="slotProps.item.name">{{ beneficiary.name }}</span>

          <p class="font-medium" v-if="slotProps.item.name">
            {{ amountFee }} <small>{{ assetSymbol }}</small>
          </p>
          <p v-else> {{ fee }} <small>{{ assetSymbol }}</small></p>
        </template>
      </Timeline>

    </div>

    <div class="col-12 field p-fluid">
      <div class="col-8">
        <label for="">{{ t('Reference') }}</label>
        <InputText
            type="text"
            class="p-inputtext p-component  b-gray"
            v-model="reference"
            :placeholder="t('reference')"
        />

      </div>
    </div>

    <div class="col-12 m-2">
      <span>{{ t('The wire will take 24 hours.') }}</span>
    </div>
    <div class="col-6">

      <Button class="w-100 p-button " :label="t('continue')" @click="nextPage"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRoute} from "vue-router"
import Timeline from 'primevue/timeline'
import Button from 'primevue/button'
import {BeneficiaryInternal} from "../../types/beneficiary.interface"
import {useBalanceWallet} from "../../../../composables/useBalanceWallet"
import {useToast} from 'primevue/usetoast'
import SelectedAssets from "../../../../components/SelectedAssets.vue";
import {Asset} from "../../../deposit/types/asset.interface";

const toast = useToast()
const {t} = useI18n({useScope: 'global'})
const route = useRoute()
const {getBalanceByCode, getWalletByAssetCode} = useBalanceWallet()

const props = defineProps<{
  formData: any
}>()

const beneficiary = props.formData.beneficiary as BeneficiaryInternal

const emit = defineEmits(['nextPage']);
const amount = ref('')
const fee = ref(0)
const reference = ref('')
const assetId = ref('')
const asset = ref('USD')
const assetSymbol = ref('USD')
const balance = ref(0)
const isAsset = route.params.type === 'crypto'

const showAmount = ref(!isAsset)
const showSelectedAsset = ref(isAsset)

balance.value = getBalanceByCode(asset.value)
assetSymbol.value = getWalletByAssetCode(asset.value)?.assetCode ?? 'USD'

const events = ref<any>([
  {amount: '2,5', label: t('Fee'), name: false},
  {amount: '2,5', label: t('youSendTo'), name: true},

]);

const amountFee = computed(() => {

  const total = isNaN(parseFloat(amount.value) - fee.value) ? 0 : parseFloat(amount.value) - fee.value
  if (total > balance.value) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please enter the amount you wish to send.',
      life: 4000
    })

    amount.value = '0'

    return 0
  }

  return total
})

const validateField = (): boolean => {
  if (amount.value.trim().length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please enter the amount you wish to send.',
      life: 4000
    })

    return false;
  }

  if (reference.value.trim().length === 0) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please include a reference.',
      life: 4000
    })

    return false;
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
    assetId: assetId.value
  };
  emit('nextPage', {
    pageIndex: page,
    formData: formData
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
  color: #14443F;
}
</style>