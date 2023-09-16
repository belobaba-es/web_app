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
      <Button :label="t('nextButtonText')" class="px-5" @click="nextStep()" iconPos="right" :loading="submitting" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useUserStore } from '../../../../stores/user'

const emit = defineEmits(['nextPage', 'prevPage'])

const { t } = useI18n({ useScope: 'global' })

const submitting = ref(false)

const { getUserName } = useUserStore()

const bankName = ref<string>('')
const accountNumber = ref<string>('')
const swiftCode = ref<string>('')
const iban = ref<string>('')
const formData = ref<object>()

const nextStep = () => {
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
</script>
