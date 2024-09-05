<template>
  <div class="col-12 md:col-8 mt-5">
    <p class="mb-0 text-uppercase">{{ t('bankAddress') }}</p>
    <Divider class="mt-0"></Divider>

    <div class="grid mt-2">
      <div class="field col-12">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationBank.address.country"
            :disabled="disableCountry()"
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
          <InputText v-model="formObject.informationBank.address.streetOne" type="text" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationBank.address.streetTwo" type="text" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationBank.address.city" class="w-full" required type="text" />
        </div>
      </div>

      <div v-if="!showCombo" class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationBank.address.region" type="text" />
        </div>
      </div>

      <div v-if="showCombo" class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationBank.address.region"
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
          <InputText v-model="formObject.informationBank.address.postalCode" type="text" />
        </div>
      </div>
    </div>
    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('saveNewPayee')" :loading="submitting" class="px-5" iconPos="right" @click="save" />
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
import { useAuth } from '../../../../composables/useAuth'
import { useNewOrEditBeneficiary } from '../composable/useNewOrEditBeneficiary'
import { ref } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const showCombo = ref<boolean>(false)
const toast = useToast()
const { formObject, typeBeneficiary, saveBeneficiary, submitting } = useNewOrEditBeneficiary()
const { loadingCountriesField, state_us, onChangeCountryHandler, fetchCountries, countryAllowedForUSA } = useWorld()
const { getUserName } = useAuth()

const emit = defineEmits(['nextPage', 'prevPage'])

const props = defineProps<{
  formData: any
}>()

const changeCountryHandler = async (event: DropdownChangeEvent) => {
  formObject.value.informationBank.address.region = ''
  onChangeCountryHandler(event, showCombo)
}

const validateFields = () => {
  const informationBank = formObject.value.informationBank
  return [
    informationBank.address.country,
    informationBank.address.region,
    informationBank.address.city,
    informationBank.address.postalCode,
    informationBank.address.streetOne,
  ].every(field => field.trim() !== '')
}

const disableCountry = () => {
  if (typeBeneficiary.value === 'DOMESTIC') {
    formObject.value.informationBank.address.country = 'US'
    showCombo.value = true
    return true
  }

  return false
}

const save = () => {
  if (!validateFields()) {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
    return
  }

  saveBeneficiary()
}
</script>
