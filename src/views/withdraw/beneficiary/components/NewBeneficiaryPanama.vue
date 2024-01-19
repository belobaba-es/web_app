<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field">
      <label>Nombre del Banco</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.bankName" required />
      </div>
    </div>

    <div class="field">
      <label>{{ t('accountNumber') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.accountDestinationNumber" required />
      </div>
    </div>

    <div class="field">
      <label>{{ t('Tipo de Produto') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.productType" required />
      </div>
    </div>
    <div></div>
    <div class="field">
      <label>{{ t('Nombre del Propietario') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.holderName" required />
      </div>
    </div>

    <div class="field">
      <label>{{ t('Identificación del Propietario') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.holderId" required />
      </div>
    </div>

    <div class="field">
      <label>{{ t('Email') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.holderEmail" />
      </div>
    </div>

    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('saveNewPayee')" class="px-5" @click="" iconPos="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewOrEditBeneficiary } from '../composable/useNewOrEditBeneficiary'
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'

const { t } = useI18n({ useScope: 'global' })
const { formObjectPanama } = useNewOrEditBeneficiary()
</script>