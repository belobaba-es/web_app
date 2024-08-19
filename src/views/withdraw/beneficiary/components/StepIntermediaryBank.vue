<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field">
      <label>{{ t('intermediaryBankName') }}</label>
      <div class="p-inputgroup">
        <InputText v-model="formObject.informationIntermediaryBank!.bankName" type="text" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('intermediarySwiftCode') }}</label>
      <div class="p-inputgroup">
        <InputText v-model="formObject.informationIntermediaryBank!.swiftCode" type="text" />
      </div>
    </div>

    <p class="mt-4 mb-0 text-uppercase">{{ t('intermediaryBankAddress') }}</p>
    <Divider class="mt-0"></Divider>
    <div class="grid mt-2">
      <div class="field col-12">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationIntermediaryBank!.address.country"
            :loading="loadingCountriesField"
            :options="countryAllowedForUSA"
            :placeholder="t('countryPlaceholder')"
            class="w-full"
            filter
            option-value="countryCode"
            optionLabel="name"
            required
            @change="changeCountryHandler"
          />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddress') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationIntermediaryBank!.address.streetOne" type="text" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationIntermediaryBank!.address.streetTwo" type="text" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            v-model="formObject.informationIntermediaryBank!.address.city"
            class="w-full"
            required
            type="text"
          />
        </div>
      </div>

      <div v-if="!showCombo" class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationIntermediaryBank!.address.region" type="text" />
        </div>
      </div>

      <div v-if="showCombo" class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationIntermediaryBank!.address.region"
            :options="state_us"
            :placeholder="t('stateLabel')"
            class="w-full"
            option-value="state_code"
            optionLabel="name"
            required
          />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationIntermediaryBank!.address.postalCode" type="text" />
        </div>
      </div>
    </div>
    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('nextButtonText')" class="px-5" iconPos="right" @click="nextPage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../composables/useWorld'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'
import { useNewOrEditBeneficiary } from '../composable/useNewOrEditBeneficiary'
import { ref } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const emit = defineEmits(['nextPage', 'prevPage'])

const { countryAllowedForUSA, loadingCountriesField, state_us, onChangeCountryHandler } = useWorld()
const { formObject } = useNewOrEditBeneficiary()
const showCombo = ref<boolean>(false)

const nextPage = () => {
  emit('nextPage', {
    pageIndex: 2,
  })
}

const changeCountryHandler = async (event: DropdownChangeEvent) => {
  formObject.value.informationIntermediaryBank!.address.region = ''
  onChangeCountryHandler(event, showCombo)
}
</script>
