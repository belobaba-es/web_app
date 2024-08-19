<template>
  <div class="col-12 md:col-8 mt-5">
    <div class="field mb-4">
      <label>{{ t('beneficiaryType') }}</label>
      <div class="p-inputgroup">
        <Dropdown
          v-model="formObject.profileType"
          :options="accountType"
          class="w-full md:w-14rem"
          option-value="description"
          optionLabel="name"
        />
      </div>
    </div>

    <div class="field mb-4">
      <label>{{ t('relationToBeneficiary') }}</label>
      <div class="p-inputgroup">
        <Dropdown
          v-model="formObject.relationToBeneficiary"
          :options="relationToBeneficiary"
          class="w-full md:w-14rem"
          option-value="description"
          optionLabel="name"
        />
      </div>
    </div>

    <div class="field">
      <label>{{ t('depositNameOnBank') }}</label>
      <div class="p-inputgroup">
        <InputText v-model="formObject.informationOwner.name" type="text" />
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
            :disabled="countriesInputIsEmpty"
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
          <InputText v-model="formObject.informationOwner.address.streetOne" type="text" />
        </div>
      </div>

      <div class="field col-12">
        <label>{{ t('streetAddressTwo') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationOwner.address.streetTwo" type="text" />
        </div>
      </div>

      <div class="field col-4">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationOwner.address.city" class="w-full" required type="text" />
        </div>
      </div>

      <div v-if="!showCombo" class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationOwner.address.region" type="text" />
        </div>
      </div>
      <div v-if="showCombo" class="field col-4">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationOwner.address.region"
            :options="state_us"
            :placeholder="t('countryPlaceholder')"
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
          <InputText v-model="formObject.informationOwner.address.postalCode" type="text" />
        </div>
      </div>
    </div>
    <div class="field mt-5 flex justify-content-end">
      <Button :label="t('nextButtonText')" class="px-5" iconPos="right" @click="next" />
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
import { onMounted, ref } from 'vue'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()
const { formObject } = useNewOrEditBeneficiary()
const emit = defineEmits(['nextPage', 'prevPage'])

const {
  countryAllowedForUSA,
  state_us,
  loadingCountriesField,
  countriesInputIsEmpty,
  onChangeCountryHandler,
  fetchCountries,
} = useWorld()

const showCombo = ref<boolean>(false)

const accountType = ref([
  { name: 'CORPORATION', description: 'CORPORATION' },
  { name: 'INDIVIDUAL', description: 'INDIVIDUAL' },
])

const relationToBeneficiary = ref([
  { description: 'SELF', name: t('SELF') },
  { description: 'SPOUSE', name: t('SPOUSE') },
  { description: 'EX_SPOUSE', name: t('EX_SPOUSE') },
  { description: 'CHILDREN', name: t('CHILDREN') },
  { description: 'PARENT', name: t('PARENT') },
  { description: 'SIBLING', name: t('SIBLING') },
  { description: 'RELATIVE', name: t('RELATIVE') },
  { description: 'FRIEND', name: t('FRIEND') },
  { description: 'BUSINESS_PARTNER', name: t('BUSINESS_PARTNER') },
  { description: 'CUSTOMER', name: t('CUSTOMER') },
  { description: 'EMPLOYEE', name: t('EMPLOYEE') },
  { description: 'BRANCH_OFFICE', name: t('BRANCH_OFFICE') },
  { description: 'SUBSIDIARY_COMPANY', name: t('SUBSIDIARY_COMPANY') },
  { description: 'HOLDING_COMPANY', name: t('HOLDING_COMPANY') },
  { description: 'SUPPLIER', name: t('SUPPLIER') },
  { description: 'CREDITOR', name: t('CREDITOR') },
  { description: 'DEBTOR', name: t('DEBTOR') },
  { description: 'FRANCHISEE', name: t('FRANCHISEE') },
  { description: 'NOT_RELATED', name: t('NOT_RELATED') },
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

const changeCountryHandler = async (event: DropdownChangeEvent) => {
  formObject.value.informationOwner.address.region = ''
  onChangeCountryHandler(event, showCombo)
}
</script>
