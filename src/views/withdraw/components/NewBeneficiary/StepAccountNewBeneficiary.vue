<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field">
      <label>{{ t('bankName') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="bankName" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('accountNumber') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="accountNumber" />
      </div>
    </div>

    <div class="field" v-if="typeBeneficiaryBankWithdrawal !== 'DOMESTIC'">
      <label>{{ t('swiftCode') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="swiftCode" />
      </div>
    </div>

    <div class="field">
      <label v-show="typeBeneficiaryBankWithdrawal == 'DOMESTIC'">{{ t('abaRoutingNumber') }} </label>
      <label v-show="typeBeneficiaryBankWithdrawal == 'INTERNATIONAL'">{{ t('iban') }} </label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="routingNumberOrIBAN" />
      </div>
    </div>

    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('nextButtonText')" class="px-5" @click="nextStep()" iconPos="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'

import { useToast } from 'primevue/usetoast'
import { useRoute, useRouter } from 'vue-router'

const emit = defineEmits(['nextPage', 'prevPage'])

const toast = useToast()

const { t } = useI18n({ useScope: 'global' })

const router = useRouter()
const route = useRoute()

const bankName = ref<string>('')
const accountNumber = ref<string>('')
const swiftCode = ref<string>('')
const routingNumberOrIBAN = ref<string>('')
const typeBeneficiaryBankWithdrawal = ref<string>('')

const formData = ref()

const props = defineProps<{
  typeBeneficiary: any
  formData: any
}>()

onMounted(async () => {
  typeBeneficiaryBankWithdrawal.value = props.typeBeneficiary
})

const validateFields = () => {
  let isSwiftCodeValid = true
  if (typeBeneficiaryBankWithdrawal.value === 'INTERNATIONAL') {
    isSwiftCodeValid = swiftCode.value.trim() !== ''
  }
  const isBankNameValid = bankName.value.trim() !== ''
  const isAccountNumberValid = accountNumber.value.trim() !== ''

  const isIntermediaryNumberValid = routingNumberOrIBAN.value.trim() !== ''

  return isBankNameValid && isAccountNumberValid && isSwiftCodeValid && isIntermediaryNumberValid
}

const nextStep = () => {
  if (!validateFields()) {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
    return
  }

  const page = 0

  formData.value = {
    informationBank: {
      typeBeneficiaryBankWithdrawal: typeBeneficiaryBankWithdrawal,
      accountNumber: accountNumber,
      bankName: bankName,
      swiftCode: '',
      routingNumber: '',
      iban: '',
    },
  }

  //Iban / Swift - International | Routing number Domestic
  if (typeBeneficiaryBankWithdrawal.value === 'INTERNATIONAL') {
    formData.value.informationBank.iban = routingNumberOrIBAN
    formData.value.informationBank.swiftCode = swiftCode
  } else if (typeBeneficiaryBankWithdrawal.value === 'DOMESTIC') {
    formData.value.informationBank.routingNumber = routingNumberOrIBAN
    delete formData.value.informationBank.iban
    delete formData.value.informationBank.swiftCode
  }

  emit('nextPage', {
    pageIndex: page,
    formData: formData.value,
  })
}
</script>
