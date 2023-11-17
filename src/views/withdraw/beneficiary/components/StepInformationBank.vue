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
            :options="allowed_countries"
            optionLabel="name"
            option-value="country_code"
            :loading="loadingCountriesField"
            :placeholder="t('countryPlaceholder')"
            :disabled="disableCountry()"
            class="w-full"
            required
          />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddress') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationBank.address.streetOne" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationBank.address.streetTwo" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationBank.address.city" class="w-full" required />
        </div>
      </div>

      <div class="field col-4" v-if="!showCombo">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationBank.address.region" />
        </div>
      </div>
      <div class="field col-4" v-if="showCombo">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationBank.address.region"
            :options="state_us"
            optionLabel="name"
            option-value="state_code"
            :placeholder="t('countryPlaceholder')"
            class="w-full"
            required
            @change="changeCountryHandler"
          />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="formObject.informationBank.address.postalCode" />
        </div>
      </div>
    </div>
    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('saveNewPayee')" class="px-5" @click="saveBeneficiary" :loading="submitting" iconPos="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../composables/useWorld'
import { BeneficiaryService } from '../../services/beneficiary'

import router from '../../../../router'

import showMessage from '../../../../shared/showMessageArray'
import showExceptionError from '../../../../shared/showExceptionError'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown'
import Divider from 'primevue/divider'

import { useToast } from 'primevue/usetoast'
import { useAuth } from '../../../../composables/useAuth'
import { useNewOrEditBeneficiary } from '../composable/useNewOrEditBeneficiary'
import { NewBeneficiary } from '../../types/beneficiary.interface'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()
const { formObject, typeBeneficiary } = useNewOrEditBeneficiary()
const { allowed_countries, loadingCountriesField, showCombo, state_us, onChangeCountryHandler, fetchCountries } =
  useWorld()
const { getUserName } = useAuth()

const emit = defineEmits(['nextPage', 'prevPage'])

const submitting = ref(false)

const props = defineProps<{
  formData: any
}>()

fetchCountries()

const changeCountryHandler = (event: DropdownChangeEvent) => {
  onChangeCountryHandler(event)
  if (!showCombo.value) {
    formObject.value.informationBank.address.country = ''
  }
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

const saveBeneficiary = () => {
  if (!validateFields()) {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
  }
  submitting.value = true

  let formData: NewBeneficiary = formObject.value as NewBeneficiary
  if (props.formData.informationBank.typeBeneficiaryBankWithdrawal !== 'INTERNATIONAL') {
    delete formData.informationIntermediaryBank
  }

  new BeneficiaryService()
    .saveBeneficiary(formData)
    .then(resp => {
      submitting.value = false
      toast.add({
        severity: 'success',
        detail: resp.data.message,
        life: 4000,
      })
      router.push(`/withdraw/fiat/${typeBeneficiary.value.toLowerCase()}`)
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
}
</script>
