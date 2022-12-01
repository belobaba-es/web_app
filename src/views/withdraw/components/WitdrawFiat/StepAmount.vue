<template>
  <div class="formgrid grid mt-3">
    <div class="col-12 m-2">
      <span class="mt-4">{{ t('youBeneficiaries') }}</span>
      <Divider></Divider>
    </div>

    <div class="col-12 mb-4">
      <p class="title-beneficiary text-capitalize">{{ formData?.beneficiary?.realName }}</p>
      <p class="text-base">{{ formData?.beneficiary?.accountNumber }}</p>
    </div>

    <div class="col-12 field p-fluid">
      <div class="flex col-6 justify-content-end">

      </div>
      <div class="field col-6 relative">
        <span class="text-left absolute" style="right: 0px;">
          {{ t('currentBalance') }}: <b class="font-medium">{{ balance }} USD</b>
        </span>
        <label for="amount">{{ t('Amount') }}</label>

        <div class="flex">
          <InputText
              id="amount"
              type="number"
              class="p-inputtext p-component b-gray"
              v-model="amount"
              :placeholder="t('amount')"
          />
          <span class="p-inputgroup-addon symbol text-capitalize">USD</span>
        </div>
      </div>
    </div>

    <div class="col-12 field">
      <Timeline :value="events">

        <template #content="slotProps">
          {{ slotProps.item.label }}
          <span v-if="slotProps.item.name">{{ formData.beneficiary?.realName }}</span>

          <p class="font-medium" v-if="slotProps.item.name">
            {{ amountFee }} <small>USD</small>
          </p>
          <p v-else><small>{{ fee }}</small></p>
        </template>
      </Timeline>

    </div>
    <div class="col-12 field p-fluid">
      <div class="col-6">
        <label for="">{{ t('Reference') }}</label>
        <InputText type="text" class="p-inputtext p-component  b-gray" v-model="reference"
                   :placeholder="t('reference')"/>

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
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import {computed, onMounted, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRoute} from "vue-router";
import Timeline from 'primevue/timeline';
import Button from 'primevue/button';
import {useBalanceWallet} from "../../../../composables/useBalanceWallet";
import {useToast} from "primevue/usetoast";

const {getBalanceByCode} = useBalanceWallet()
const toast = useToast()
const {t} = useI18n({useScope: 'global'})
const route = useRoute();
const props = defineProps<{
  formData: any
}>()
const emit = defineEmits(['nextPage']);
const amount = ref('')
const fee = ref(0)
const reference = ref('')
const balance = ref(0)

balance.value = getBalanceByCode('USD')


const events = ref<any>([
  {amount: '2,5', label: 'Fee', name: false},
  {amount: '2,5', label: `You send to `, name: true},

]);

onMounted(async () => {
  console.log(props.formData, 'amount')
});
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
    amountFee: amountFee
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
</style>