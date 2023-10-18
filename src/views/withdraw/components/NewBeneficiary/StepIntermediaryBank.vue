<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field">
      <label>{{ t('intermediaryBankName') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="intermediaryBankName" />
      </div>
    </div>

    <div class="field">
      <label>{{ t('intermediarySwiftCode') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="intermediaryBankSwiftCode" />
      </div>
    </div>

    <p class="mt-4 mb-0 text-uppercase">{{ t('intermediaryBankAddress') }}</p>
    <Divider class="mt-0"></Divider>
    <div class="grid mt-2">
      <div class="field col-12">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="intermediaryBankCountry"
            :options="countries"
            optionLabel="name"
            option-value="country_code"
            :loading="loadingCountiesField"
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
          <InputText type="text" v-model="intermediaryBankStreetOne" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="intermediaryBankStreetTwo" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="intermediaryBankCity" class="w-full" required />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="intermediaryBankState" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="intermediaryBankPostalCode" />
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
  countries,
  fetchCountries,
  loadingCountiesField,
  countriesInputIsEmpty,
  statesInputIsEmpty,
  loadingStatesField,
  states,
  onChangeCountryHandler,
  onChangeStateHandler,
} = useWorld()

const {
  countries: bankCountries,
  statesInputIsEmpty: bankStatesInputIsEmpty,
  loadingStatesField: bankLoadingStatesField,
  states: bankStates,
  onChangeCountryHandler: onBankChangeCountryHandler,
  onChangeStateHandler: onBankChangeStateHandler,
} = useWorld()

const props = defineProps<{
  formData: object
}>()

const intermediaryBankName = ref<string>('')
const intermediaryBankSwiftCode = ref<string>('')
const intermediaryBankCountry = ref<string>('')
const intermediaryBankStreetOne = ref<string>('')
const intermediaryBankStreetTwo = ref<string>('')
const intermediaryBankCity = ref<string>('')
const intermediaryBankState = ref<string>('')
const intermediaryBankPostalCode = ref<string>('')

onMounted(() => {
  fetchCountries(true).then(() => {
    bankCountries.value = countries.value
  })
})

const validateFields = () => {
  return [
    intermediaryBankName,
    intermediaryBankSwiftCode,
    intermediaryBankCountry,
    intermediaryBankStreetOne,
    intermediaryBankCity,
    intermediaryBankState,
    intermediaryBankPostalCode,
  ] //.every(field => field.value.trim() !== '')
}

const nextPage = () => {
  if (validateFields()) {
    const formData = ref({
      ...props.formData,
      informationIntermediaryBank: {
        bankName: intermediaryBankName.value,
        swiftCode: intermediaryBankSwiftCode.value,
        address: {
          streetOne: intermediaryBankStreetOne.value,
          streetTwo: intermediaryBankStreetTwo.value,
          postalCode: intermediaryBankPostalCode.value,
          region: intermediaryBankState.value,
          city: intermediaryBankCity.value,
          country: intermediaryBankCountry.value,
        },
      },
    })
    const page = 2
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
