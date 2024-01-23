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
      <label>{{ t('typeProduct') }}</label>
      <div class="p-inputgroup">
        <Dropdown
          class="select-asset"
          v-model="formObjectPanama.productType"
          :options="productType"
          optionLabel="name"
          optionValue="code"
          :placeholder="t('selectAnAsset')"
          :showClear="true"
        />
      </div>
    </div>
    <div></div>
    <div class="field">
      <label>{{ t('beneficiaryName') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.holderName" required />
      </div>
    </div>

    <div class="field">
      <label>{{ t('dni') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.holderId" required />
      </div>
    </div>

    <div class="field">
      <label>{{ t('emailLabel') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObjectPanama.holderEmail" />
      </div>
    </div>

    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('saveNewPayee')" class="px-5" @click="save" iconPos="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { useNewBeneficiaryPanama } from '../composable/useNewBeneficiaryPanama'

const { t } = useI18n({ useScope: 'global' })

const { formObjectPanama, productType, save } = useNewBeneficiaryPanama()
</script>