<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field mb-4">
      <label>{{ t('beneficiaryType') }}</label>
      <div class="p-inputgroup">
        <Dropdown
          v-model="formObject.profileType"
          :options="accountType"
          optionLabel="name"
          option-value="description"
          class="w-full md:w-14rem"
        />
      </div>
    </div>

    <div class="field">
      <label>{{ t('depositNameOnBank') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="formObject.informationOwner.name" />
      </div>
      <small>Make sure it exactly as it appears on your bank account</small>
    </div>

    <p class="mt-4 mb-0 text-uppercase">{{ t('residenceBeneficiaryAddress') }}</p>
    <Divider class="mt-0"></Divider>
    <div class="grid mt-2">
      <div class="field col-12">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationOwner.address.country"
            :options="countryAllowedForUSA"
            filter
            optionLabel="name"
            option-value="country_code"
            :loading="loadingCountriesField"
            :placeholder="t('countryPlaceholder')"
            :disabled="countriesInputIsEmpty"
            @change="onChangeCountryHandler"
            class="w-full"
            required
          />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddress') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationOwner.address.streetOne" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationOwner.address.streetTwo" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationOwner.address.city" class="w-full" required />
        </div>
      </div>

      <div class="field col-4" v-if="!showCombo">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationOwner.address.region" />
        </div>
      </div>
      <div class="field col-4" v-if="showCombo">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationOwner.address.region"
            :options="state_us"
            optionLabel="name"
            option-value="state_code"
            :placeholder="t('countryPlaceholder')"
            class="w-full"
            required
          />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationOwner.address.postalCode" />
        </div>
      </div>
    </div>
    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('nextButtonText')" class="px-5" @click="next" iconPos="right" />
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
import { onMounted, ref } from 'vue'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()
const { formObject } = useNewOrEditBeneficiary()
const emit = defineEmits(['nextPage', 'prevPage'])

const {
  countryAllowedForUSA,
  showCombo,
  state_us,
  loadingCountriesField,
  countriesInputIsEmpty,
  onChangeCountryHandler,
  fetchCountries,
} = useWorld()

const accountType = ref([
  { name: 'CORPORATION', description: 'CORPORATION' },
  { name: 'INDIVIDUAL', description: 'INDIVIDUAL' },
])
onMounted(async () => {
  await fetchCountries()
})
const validateFields = () => {
  const owner = formObject.value.informationOwner
  return [
    owner.name,
    owner.address.country,
    owner.address.streetOne,
    owner.address.city,
    owner.address.region,
    owner.address.postalCode,
  ].every(field => field.trim() !== '')
}

const next = () => {
  if (!validateFields()) {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })

    return
  }

  const page = 1
  emit('nextPage', {
    pageIndex: page,
  })
}
</script>