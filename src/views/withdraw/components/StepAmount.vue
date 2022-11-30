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

    <div class="col-12 field p-fluid mt-3">

      <div class="field col-8 relative">
        <span class="text-left absolute" style="right: 0px;">{{ t('currentBalance') }}: {{ balance }} {{
            assetSymbol
          }}</span>
        <label for="amount">{{ t('Amount') }}</label>

        <div class="flex">
          <InputText id="amount" type="number" class="p-inputtext p-component b-gray" v-model="amount"
                     :placeholder="t('amount')"/>
          <span class="p-inputgroup-addon symbol">{{ assetSymbol }}</span>
        </div>
      </div>
    </div>

    <div class="col-12 field">
      <Timeline :value="events">

        <template #content="slotProps">
          {{ slotProps.item.label }}
          <span v-if="slotProps.item.name">{{ beneficiary.name }}</span>

          <p class="font-medium" v-if="slotProps.item.name">
            {{ amountFee }} <small>{{assetSymbol}}</small>
          </p>
          <p v-else> {{ fee }} <small>{{assetSymbol}}</small></p>
        </template>
      </Timeline>

    </div>
    <div class="col-12 field p-fluid">
      <div class="col-8">
        <label for="">{{ t('Reference') }}</label>
        <InputText type="text" class="p-inputtext p-component  b-gray" v-model="reference"
                   :placeholder="t('reference')"/>

      </div>
    </div>
    <div class="col-12 m-2">
      <span>{{ t('The wire will take 24 hours.') }}</span>
    </div>
    <div class="col-6">

      <Button class="p-button " :label="t('continue')" @click="nextPage"/>
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
import {BeneficiaryInternal} from "../types/beneficiary.interface"
import {useBalanceWallet} from "../../../composables/useBalanceWallet"
import {useToast} from 'primevue/usetoast'

const toast = useToast()
const {t} = useI18n({useScope: 'global'})
const route = useRoute()
const {getBalanceByCode} = useBalanceWallet()

const props = defineProps<{
  formData: any
}>()

const beneficiary = props.formData.beneficiary as BeneficiaryInternal

const emit = defineEmits(['nextPage']);
const amount = ref('')
const fee = ref(0)
const reference = ref('')
const asset = ref('USD')
const assetSymbol = ref('USD')
const balance = ref(0)

balance.value = getBalanceByCode(asset.value)?.balance ?? 0
assetSymbol.value = getBalanceByCode(asset.value)?.assetCode ?? 'USD'

const events = ref<any>([
  {amount: '2,5', label: t('Fee'), name: false},
  {amount: '2,5', label: t('youSendTo'), name: true},

]);

const amountFee = computed(() => {
  console.log(parseFloat(amount.value) - fee.value, 'undefined')
  const total = isNaN(parseFloat(amount.value) - fee.value) ? 0 : parseFloat(amount.value) - fee.value
  if (total > balance.value) {
    toast.add({
      severity: 'warn',
      summary: 'Order structure',
      detail: 'Please enter the amount you wish to send.',
      life: 4000
    })
    
    amount.value = '0'
  }
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
    return;
  }


  const page = 1
  const formData = {
    ...props.formData.value,
    amount: amount.value,
    fee: fee,
    reference: reference.value,
    asset: asset.value,
    symbol: assetSymbol
  };
  emit('nextPage', {
    pageIndex: page,
    formData: formData
  })
}

</script>

<style scoped>
.title-beneficiary {
  color: #14443F;
}

.symbol {
  background: #8CE2DB;
  padding: 2px 20px;
  color: #0F655D;
  font-size: 2rem;
  border-radius: 0;
}


.p-timeline-event-opposite {
  display: none !important;
}
</style>