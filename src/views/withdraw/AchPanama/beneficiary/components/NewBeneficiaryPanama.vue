<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-6">
      .
      <p class="text-3xl font-medium mb-4">
        {{ t('withdraw') }} / <span class="text-primary"> {{ t('fiat') }} </span>
      </p>
      <div class="flex align-items-center">
        <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="toBack" />
        <span class="text-xl"> ACH Panama Wire</span>
      </div>

      <div class="flex align-items-center">
        <div class="mt-1 col-12">
          <h3 class="font-medium">{{ t('addBeneficiaries') }}</h3>
        </div>
      </div>

      <div class="field mt-1">
        <label>{{ t('bankName') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            class="select-asset"
            v-model="formObjectPanama.bankName"
            :options="allowed_banks"
            optionLabel="name"
            optionValue="name"
            :placeholder="t('bankName')"
            :showClear="true"
          />
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
            :options="productAccountType"
            optionLabel="name"
            optionValue="name"
            :placeholder="t('typeProduct')"
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
        <Button :label="t('saveNewPayee')" class="px-5" @click="save" :loading="submitting" iconPos="right" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import data_banks from '../../../../../assets/panama_banks/banks.json'
import { useNewBeneficiaryPanama } from '../../composable/useNewBeneficiaryPanama'
import { ref } from 'vue'

const allowed_banks = ref(data_banks)
const { t } = useI18n({ useScope: 'global' })

const { formObjectPanama, save, toBack, productAccountType, submitting } = useNewBeneficiaryPanama()
</script>