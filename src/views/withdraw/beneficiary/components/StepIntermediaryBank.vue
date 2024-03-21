<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field">
      <label>{{ t('intermediaryBankName') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObject.informationIntermediaryBank!.bankName" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('intermediarySwiftCode') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObject.informationIntermediaryBank!.swiftCode" />
      </div>
    </div>

    <p class="mt-4 mb-0 text-uppercase">{{ t('intermediaryBankAddress') }}</p>
    <Divider class="mt-0"></Divider>
    <div class="grid mt-2">
      <div class="field col-12">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            filter
            v-model="formObject.informationIntermediaryBank!.address.country"
            :options="countryAllowedForUSA"
            optionLabel="name"
            option-value="countryCode"
            :loading="loadingCountriesField"
            :placeholder="t('countryPlaceholder')"
            class="w-full"
            @change="onChangeCountryHandler"
            required
          />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddress') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationIntermediaryBank!.address.streetOne" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationIntermediaryBank!.address.streetTwo" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="formObject.informationIntermediaryBank!.address.city"
            class="w-full"
            required
          />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationIntermediaryBank!.address.region" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationIntermediaryBank!.address.postalCode" />
        </div>
      </div>
    </div>
    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('nextButtonText')" class="px-5" @click="nextPage" iconPos="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../composables/useWorld'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'
import { useNewOrEditBeneficiary } from '../composable/useNewOrEditBeneficiary'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const emit = defineEmits(['nextPage', 'prevPage'])

const { countryAllowedForUSA, loadingCountriesField, countriesInputIsEmpty, onChangeCountryHandler } = useWorld()
const { formObject } = useNewOrEditBeneficiary()

const nextPage = () => {
  emit('nextPage', {
    pageIndex: 2,
  })
}
</script>