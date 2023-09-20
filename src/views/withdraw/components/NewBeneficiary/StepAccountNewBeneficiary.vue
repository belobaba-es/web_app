<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="grid">
      <div class="field-radiobutton col-6">
        <RadioButton inputId="DOMESTIC" value="DOMESTIC" v-model="typeBeneficiaryBankWithdrawal" />
        <label for="DOMESTIC">{{ t('domesticAccount') }}</label>
      </div>

      <div class="field-radiobutton col-6">
        <RadioButton inputId="INTERNATIONAL" value="INTERNATIONAL" v-model="typeBeneficiaryBankWithdrawal" />
        <label for="INTERNATIONAL">{{ t('internationalAccount') }}</label>
      </div>
    </div>

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
      <label v-show="typeBeneficiaryBankWithdrawal == 'DOMESTIC'">{{ t('abaRoutingNumber') }} </label>
      <label v-show="typeBeneficiaryBankWithdrawal == 'INTERNATIONAL'">{{ t('iban') }} </label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="intermediaryNumber" />
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
const intermediaryNumber = ref<string>('')
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
  const isBankNameValid = bankName.value.trim() !== ''
  const isAccountNumberValid = accountNumber.value.trim() !== ''
  const isSwiftCodeValid = swiftCode.value.trim() !== ''
  const isIntermediaryNumberValid = intermediaryNumber.value.trim() !== ''

  return isBankNameValid && isAccountNumberValid && isSwiftCodeValid && isIntermediaryNumberValid
}

const nextStep = () => {
  if (validateFields()) {
    const page = 0

    formData.value = {
      informationBank: {
        typeBeneficiaryBankWithdrawal: typeBeneficiaryBankWithdrawal,
        accountNumber: accountNumber,
        bankName: bankName,
        swiftCode: swiftCode,
      },
    }

    //Iban - International | Routing number Domestic
    if (typeBeneficiaryBankWithdrawal.value === 'INTERNATIONAL') {
      formData.value.informationBank.iban = intermediaryNumber
    } else if (typeBeneficiaryBankWithdrawal.value === 'DOMESTIC') {
      formData.value.informationBank.routingNumber = intermediaryNumber
    }

    emit('nextPage', {
      pageIndex: page,
      formData: formData.value,
    })
  } else {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
  }
}
</script>
