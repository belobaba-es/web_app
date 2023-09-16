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

    <div class="field">
      <label>{{ t('swiftCode') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="swiftCode" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('IBAN') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="iban" />
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


const emit = defineEmits(['nextPage', 'prevPage'])

const toast = useToast()

const { t } = useI18n({ useScope: 'global' })

const bankName = ref<string>('')
const accountNumber = ref<string>('')
const swiftCode = ref<string>('')
const iban = ref<string>('')
const formData = ref<object>()

const validateFields = () => {
  const isBankNameValid = bankName.value.trim() !== ''
  const isAccountNumberValid = accountNumber.value.trim() !== ''
  const isSwiftCodeValid = swiftCode.value.trim() !== ''
  const isIbanValid = iban.value.trim() !== ''

  return isBankNameValid && isAccountNumberValid && isSwiftCodeValid && isIbanValid
}

const nextStep = () => {
  if (validateFields() === true) {
    const page = 0

    formData.value = {
      bankName: bankName,
      accountNumber: accountNumber,
      swiftCode: swiftCode,
      iban: iban,
    }

    emit('nextPage', {
      pageIndex: page,
      formData: formData.value,
    })
  }
  else{
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })

  }
}
</script>
