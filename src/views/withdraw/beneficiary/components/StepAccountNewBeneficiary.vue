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

    <div class="field" v-if="typeBeneficiary !== 'DOMESTIC'">
      <label>{{ t('swiftCode') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="swiftCode" />
      </div>
    </div>

    <div class="field">
      <label v-show="typeBeneficiary == 'DOMESTIC'">ABA Fedwire</label>
      <label v-show="typeBeneficiary == 'INTERNATIONAL'">{{ t('iban') }} </label>
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useToast } from 'primevue/usetoast'
import { useRoute, useRouter } from 'vue-router'
import { useNewOrEditBeneficiary } from '../composable/useNewOrEditBeneficiary'

const emit = defineEmits(['nextPage', 'prevPage'])

const toast = useToast()

const { t } = useI18n({ useScope: 'global' })

const router = useRouter()
const route = useRoute()

const { typeBeneficiary } = useNewOrEditBeneficiary()

const bankName = ref<string>('')
const accountNumber = ref<string>('')
const swiftCode = ref<string>('')
const routingNumberOrIBAN = ref<string>('')

const formData = ref()

const validateFields = () => {
  let isSwiftCodeValid = true
  if (typeBeneficiary.value === 'INTERNATIONAL') {
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
      typeBeneficiaryBankWithdrawal: typeBeneficiary.value,
      accountNumber: accountNumber,
      bankName: bankName,
      swiftCode: '',
      routingNumber: '',
      iban: '',
    },
  }

  //Iban / Swift - International | Routing number Domestic
  if (typeBeneficiary.value === 'INTERNATIONAL') {
    formData.value.informationBank.iban = routingNumberOrIBAN
    formData.value.informationBank.swiftCode = swiftCode
  } else if (typeBeneficiary.value === 'DOMESTIC') {
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