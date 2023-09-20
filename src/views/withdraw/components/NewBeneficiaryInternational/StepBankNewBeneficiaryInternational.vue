<template>
  <div class="col-12 md:col-8 mt-5">
    <p class="mb-0 text-uppercase">{{ t('intermediaryBankAddress') }}</p>
    <Divider class="mt-0"></Divider>

    <div class="grid mt-2">
      <div class="field col-12">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="bankCountry"
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
          <InputText type="text" v-model="bankStreetOne" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="bankStreetTwo" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="bankCity" class="w-full" required />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="bankState"
            :options="states"
            optionLabel="name"
            option-value="state_code"
            :loading="loadingStatesField"
            :placeholder="t('statePlaceHolder')"
            :disabled="statesInputIsEmpty"
            class="w-full"
            @change="onChangeStateHandler"
          />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="bankPostalCode" />
        </div>
      </div>
    </div>
    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('saveNewPayee')" class="px-5" @click="saveBeneficiary" :loading="submitting" iconPos="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../composables/useWorld'
import { useUserStore } from '../../../../stores/user'
import { BeneficiaryService } from '../../services/beneficiary'
import { BeneficiaryFiatInternacional } from '../../types/beneficiary.interface'

import router from '../../../../router'

import showMessage from '../../../../shared/showMessageArray'
import showExceptionError from '../../../../shared/showExceptionError'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Divider from 'primevue/divider'

import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const { getUserName } = useUserStore()

const emit = defineEmits(['nextPage', 'prevPage'])

const submitting = ref(false)

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
  formData: any
}>()

const bankCountry = ref<string>('')
const bankState = ref<string>('')
const bankCity = ref<string>('')
const bankPostalCode = ref<string>('')
const bankStreetOne = ref<string>('')
const bankStreetTwo = ref<string>('')

onMounted(() => {
  fetchCountries(true).then(() => {
    bankCountries.value = countries.value
  })
})

const validateFields = () => {
  return [bankCountry, bankState, bankCity, bankPostalCode, bankStreetOne].every(field => field.value.trim() !== '')
}

const saveBeneficiary = () => {
  if (validateFields()) {
    submitting.value = true

    const formData = ref({
      typeBeneficiaryBankWithdrawal: props.formData.typeBeneficiaryBankWithdrawal,
      informationBank: {
        ...props.formData.informationBank,
        address: {
          streetOne: bankStreetOne.value,
          streetTwo: bankStreetTwo.value,
          postalCode: bankPostalCode.value,
          region: bankState.value,
          city: bankCity.value,
          country: bankCountry.value,
        },
      },
      informationOwner: {
        ...props.formData.informationOwner,
      },
    })

    const beneficiaryService = BeneficiaryService.instance()
    beneficiaryService
      .saveBeneficiaryInternational(formData.value)
      .then(resp => {
        submitting.value = false
        router.push('/withdraw/fiat/international')
        toast.add({
          severity: 'success',
          detail: resp.data.message,
          life: 4000,
        })
      })
      .catch(e => {
        submitting.value = false

        if (e.response.data.data?.warning) {
          e.response.data.data.warning.forEach((element: any) => {
            showExceptionError(toast, 'error', t('somethingWentWrong'), `${element.field} ${element.message}`, 4000)
          })
          return
        }

        if (e.response.data.message) {
          showExceptionError(toast, 'error', t('somethingWentWrong'), e.response.data.message, 4000)
          return
        }

        showMessage(toast, e.response.data)
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
