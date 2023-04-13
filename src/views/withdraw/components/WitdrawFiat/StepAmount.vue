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
          {{ t('currentBalance') }}: <b class="font-medium">{{ balance }} USD</b>
        </p>
      </div>
    </div>

    <div class="grid col-12 flex w-full">
      <div class="flex w-full">
        <InputNumber
          id="amount"
          type="number"
          :minFractionDigits="2" :maxFractionDigits="2"
          class="p-inputtext p-component b-gray w-full btn-amount"
          v-model="amount"
          :placeholder="t('amount')"
        />
        <span class="p-inputgroup-addon symbol text-capitalize">$</span>
      </div>
    </div>

    <div class="col-12 field mt-4">
      <Timeline :value="events">
        <template #content="slotProps">
          {{ slotProps.item.label }}
          <span v-if="slotProps.item.name">{{ formData.beneficiary?.realName }}</span>

          <p class="font-medium" v-if="slotProps.item.name">{{ amount }} <small>USD</small></p>
          <p v-else>
            <small>{{ fee }}</small>
          </p>
        </template>
      </Timeline>
    </div>
    <div class="col-12 field p-fluid">
      <div class="col-6">
        <label for="">{{ t('Reference') }}</label>
        <InputText
          type="text"
          class="p-inputtext p-component b-gray"
          v-model="reference"
          :placeholder="t('reference')"
        />
      </div>
    </div>
    <!--    <div class="col-12 m-2">-->
    <!--      <span>{{ t('The wire will take 24 hours.') }}</span>-->
    <!--    </div>-->
    <div class="col-6">
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
import { useUserStore } from '../../../../stores/user'

const { getBalanceByCode } = useBalanceWallet()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const props = defineProps<{
  formData: any
}>()
const emit = defineEmits(['nextPage'])
const amount = ref(0)
const fee = ref(0)
const reference = ref('')
const balance = ref(0)
const userStore = useUserStore()

balance.value = getBalanceByCode('USD')

const events = ref<any>([
  { amount: '2,5', label: 'Fee', name: false },
  { amount: '2,5', label: `You send to `, name: true },
])
const typeTransaction = ref('domestic')

onMounted(async () => {
  if (props.formData.typeTransaction.toLowerCase() !== 'domestic') {
    typeTransaction.value = 'international'
  }
  getUserFee()
})

const getUserFee = () => {
  fee.value =
    typeTransaction.value === 'domestic'
      ? userStore.getUserFeeWire()?.domestic.out
      : userStore.getUserFeeWire()?.international.out
}
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

const validateField = (): boolean => {
  if (amount.value == 0) {
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
