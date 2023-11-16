<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field">
      <label>{{ t('bankName') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObject.informationBank.bankName" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('accountNumber') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObject.informationBank.accountNumber" />
      </div>
    </div>

    <div class="field" v-if="typeBeneficiary !== 'DOMESTIC'">
      <label>{{ t('swiftCode') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObject.informationBank.swiftCode" />
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
import { useNewOrEditBeneficiary } from '../composable/useNewOrEditBeneficiary'

const emit = defineEmits(['nextPage', 'prevPage'])

const toast = useToast()

const { t } = useI18n({ useScope: 'global' })

const { typeBeneficiary } = useNewOrEditBeneficiary()

const routingNumberOrIBAN = ref<string>('')

const { formObject } = useNewOrEditBeneficiary()
const validateFields = () => {
  let isSwiftCodeValid = true
  if (typeBeneficiary.value === 'INTERNATIONAL') {
    isSwiftCodeValid = formObject.value.informationBank.swiftCode!.trim() !== ''
  }
  const isBankNameValid = formObject.value.informationBank.bankName.trim() !== ''
  const isAccountNumberValid = formObject.value.informationBank.accountNumber.trim() !== ''

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

  formObject.value.informationBank.typeBeneficiaryBankWithdrawal = typeBeneficiary.value
  //Iban / Swift - International | Routing number Domestic
  if (typeBeneficiary.value === 'INTERNATIONAL') {
    formObject.value.informationBank.iban = routingNumberOrIBAN.value
  } else if (typeBeneficiary.value === 'DOMESTIC') {
    formObject.value.informationBank.routingNumber = routingNumberOrIBAN.value
    delete formObject.value.informationBank.iban
    delete formObject.value.informationBank.swiftCode
  }

  emit('nextPage', {
    pageIndex: page,
  })
}
</script>
