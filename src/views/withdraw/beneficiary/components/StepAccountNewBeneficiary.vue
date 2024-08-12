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

    <div v-if="!isUpdateBeneficiary" class="field">
      <label v-show="typeBeneficiary == 'DOMESTIC'">ABA Fedwire</label>
      <label v-show="typeBeneficiary == 'INTERNATIONAL'">{{ t('iban') }} </label>
      <div class="p-inputgroup">
        <InputText v-model="routingNumberOrIBAN" type="text" />
      </div>
    </div>

    <div v-show="typeBeneficiary == 'DOMESTIC' && !isUpdateBeneficiary" class="field">
      <label>Add ABA ACH ?</label>
      <div class="p-inputgroup">
        <Checkbox v-model="isAchUs" :binary="true" />
      </div>
    </div>

    <div v-show="typeBeneficiary == 'DOMESTIC' && isAchUs && !isUpdateBeneficiary" class="field">
      <label>ABA ACH</label>
      <div class="p-inputgroup">
        <InputText v-model="formObject.informationBank.abaAch" type="text" />
      </div>
    </div>

    <!--updating wire and ach-->
    <div v-if="isUpdateBeneficiary && !isAchUs" class="field">
      <label v-show="typeBeneficiary == 'DOMESTIC'">ABA Fedwire</label>
      <label v-show="typeBeneficiary == 'INTERNATIONAL'">{{ t('iban') }} </label>
      <div class="p-inputgroup">
        <InputText v-model="routingNumberOrIBAN" type="text" />
      </div>
    </div>

    <div v-show="typeBeneficiary == 'DOMESTIC' && isAchUs && isUpdateBeneficiary" class="field">
      <label>ABA ACH</label>
      <div class="p-inputgroup">
        <InputText v-model="routingNumberOrIBAN" type="text" />
      </div>
    </div>

    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('nextButtonText')" class="px-5" @click="nextStep()" iconPos="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import { useToast } from 'primevue/usetoast'
import { useNewOrEditBeneficiary } from '../composable/useNewOrEditBeneficiary'
import { NetworkBank } from '../../types/beneficiary.interface'

const emit = defineEmits(['nextPage', 'prevPage'])

const toast = useToast()

const { t } = useI18n({ useScope: 'global' })

const { formObject, typeBeneficiary, routingNumberOrIBAN, isAchUs, isUpdateBeneficiary } = useNewOrEditBeneficiary()

const validateFields = () => {
  let isSwiftCodeValid = true
  let isIbanValid: boolean
  const isBankNameValid = formObject.value.informationBank.bankName.trim() !== ''
  let isAccountNumberValid = formObject.value.informationBank.accountNumber.trim() !== ''
  isIbanValid = routingNumberOrIBAN.value?.trim() !== ''

  if (typeBeneficiary.value === 'INTERNATIONAL') {
    isSwiftCodeValid = formObject.value.informationBank.swiftCode!.trim() !== ''
    if (isAccountNumberValid && !isIbanValid) {
      isIbanValid = true
    }
    if (isIbanValid && !isAccountNumberValid) {
      isAccountNumberValid = true
    }
  }
  // edit beneficiary
  if (isUpdateBeneficiary.value && typeBeneficiary.value === 'DOMESTIC' && !isAchUs) {
    return isBankNameValid && isAccountNumberValid && isSwiftCodeValid && isIbanValid
  }

  // new beneficiary
  let isAbaAchValid = true
  if (typeBeneficiary.value === 'DOMESTIC' && isAchUs) {
    const abaAch = formObject.value.informationBank.abaAch ?? ''
    isAbaAchValid =
      abaAch.trim() !== routingNumberOrIBAN.value?.trim() ||
      abaAch.trim() !== '' ||
      routingNumberOrIBAN.value?.trim() !== ''
  }

  if (!isUpdateBeneficiary.value) {
    const abaAch = formObject.value.informationBank.abaAch ?? ''
    isIbanValid =
      abaAch.trim() !== routingNumberOrIBAN.value?.trim() &&
      (abaAch.trim().length > 0 || routingNumberOrIBAN.value?.trim().length > 0)
  }
  return isBankNameValid && isAccountNumberValid && isSwiftCodeValid && isIbanValid && isAbaAchValid
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
    formObject.value.informationBank.networkBank = NetworkBank.SWIFT
    formObject.value.informationBank.iban = routingNumberOrIBAN.value
    delete formObject.value.informationBank.abaAch
  } else if (typeBeneficiary.value === 'DOMESTIC') {
    formObject.value.informationBank.routingNumber = routingNumberOrIBAN.value
    delete formObject.value.informationBank.iban
    delete formObject.value.informationBank.swiftCode

    if (!isAchUs.value) {
      formObject.value.informationBank.networkBank = NetworkBank.WIRE
      delete formObject.value.informationBank.abaAch
    }
    // new
    if (!isUpdateBeneficiary.value) {
      formObject.value.bankNetworks = []
      if (isAchUs.value) {
        formObject.value.bankNetworks?.push(NetworkBank.ACH)
      }

      const isWireEmpty = routingNumberOrIBAN.value.trim().length > 0
      if (isWireEmpty) {
        formObject.value.bankNetworks?.push(NetworkBank.WIRE)
      }
    }
  }

  emit('nextPage', {
    pageIndex: page,
  })
}
</script>
