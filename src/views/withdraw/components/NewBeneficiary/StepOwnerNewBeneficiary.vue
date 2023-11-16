<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field">
      <label>{{ t('depositNameOnBank') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="name" />
      </div>
      <small>Make sure it exactly as it appears on your bank account</small>
    </div>

    <p class="mt-4 mb-0 text-uppercase">{{ t('beneficiaryAddress') }}</p>
    <Divider class="mt-0"></Divider>
    <div class="grid mt-2">
      <div class="field col-12">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="country"
            :options="allowed_countries"
            optionLabel="name"
            option-value="country_code"
            :loading="loadingCountriesField"
            :placeholder="t('countryPlaceholder')"
            :disabled="countriesInputIsEmpty"
            class="w-full"
            @change="onChangeCountryHandler"
            required
          />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddress') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="streetOne" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="streetTwo" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="city" class="w-full" required />
        </div>
      </div>

      <div class="field col-4" v-if="!showCombo">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="state" />
        </div>
      </div>
      <div class="field col-4" v-if="showCombo">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
              v-model="state"
              :options="state_us"
              optionLabel="name"
              option-value="state_code"
              :loading="loadingStatesField"
              :placeholder="t('countryPlaceholder')"
              :disabled="stateInputIsEmpty"
              class="w-full"
              required
          />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="postalCode" />
        </div>
      </div>
    </div>
    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('nextButtonText')" class="px-5" @click="nextPage" iconPos="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../composables/useWorld'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const emit = defineEmits(['nextPage', 'prevPage'])

const {
  allowed_countries,
  state_us,
  fetchAllowedCountries,
  fetchStatesUS,
  loadingCountriesField,
  stateInputIsEmpty,
  loadingStatesField,
  countriesInputIsEmpty,
  onChangeCountryHandler,
  showCombo,
} = useWorld()

const {
  statesInputIsEmpty: bankStatesInputIsEmpty,
  loadingStatesField: bankLoadingStatesField,
  states: bankStates,
  onChangeCountryHandler: onBankChangeCountryHandler,
  onChangeStateHandler: onBankChangeStateHandler,
} = useWorld()

const props = defineProps<{
  formData: object
}>()

const name = ref<string>('')
const country = ref<string>('')
const streetOne = ref<string>('')
const streetTwo = ref<string>('')
const city = ref<string>('')
const state = ref<string>('')
const postalCode = ref<string>('')

onMounted(() => {
  fetchAllowedCountries();
  fetchStatesUS();
})

const validateFields = () => {
  return [name, country, streetOne, city, state, postalCode].every(field => field.value.trim() !== '')
}

const nextPage = () => {
  if (validateFields()) {
    const formData = ref({
      ...props.formData,
      informationOwner: {
        name: name.value,
        address: {
          streetOne: streetOne.value,
          streetTwo: streetTwo.value,
          postalCode: postalCode.value,
          region: state.value,
          city: city.value,
          country: country.value,
        },
      },
    })
    const page = 1
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
