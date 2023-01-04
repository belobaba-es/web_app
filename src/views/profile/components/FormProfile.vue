<template>
  <div class="formgrid grid">
    <div
      v-if="!isNaturalAccount && isUpdateProfileView && !isEditPartnerAccount"
      class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4"
    >
      <label>{{ t('nameLabel') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.generalData.name" class="w-full" required />
      </div>
    </div>
    <div
      v-if="isNaturalAccount || isCreateView || isEditPartnerAccount"
      class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4"
    >
      <label>{{ t('nameLabel') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.generalData.firstName" class="w-full" required />
      </div>
    </div>
    <div
      v-if="isNaturalAccount || isCreateView || isEditPartnerAccount"
      class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4"
    >
      <label>{{ t('secondNameLabel') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.generalData.middleName" class="w-full" required />
      </div>
    </div>
    <div
      v-if="isNaturalAccount || isCreateView || isEditPartnerAccount"
      class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4"
    >
      <label>{{ t('surnameLabel') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.generalData.lastName" class="w-full" required />
      </div>
    </div>
    <div
      class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6"
      :class="{ 'col-6': isNaturalAccount || isCreateView || isEditPartnerAccount }"
    >
      <label>{{ t('emailLabel') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.generalData.email" class="w-full" required />
      </div>
    </div>
    <div
      class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 phone-input"
      :class="{ 'col-6': isNaturalAccount || isCreateView || isEditPartnerAccount }"
    >
      <label>{{ t('phoneLabel') }}</label>
      <div class="field grid">
        <div class="col-3 p-inputgroup">
          <Dropdown v-model="form.phone.phoneCountry" :options="calling_code" />
        </div>
        <div class="col-9 p-inputgroup">
          <InputText id="phoneNumber" type="text" class="w-full" v-model="form.phone.phoneNumber" required />
        </div>
      </div>
    </div>
    <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
      <label>{{ t('countryLabel') }}</label>
      <div class="p-inputgroup">
        <Dropdown
          v-model="form.address.country"
          :options="countries"
          optionLabel="name"
          option-value="country_code"
          :loading="loadingCountiesField"
          :placeholder="t('countryPlaceholder')"
          :disabled="countriesInputIsEmpty"
          class="w-full"
          required
        />
      </div>
    </div>
    <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
      <label>{{ t('stateLabel') }}</label>
      <div class="p-inputgroup">
        <Dropdown
          v-model="form.address.region"
          :options="states"
          optionLabel="name"
          option-value="name"
          :loading="loadingStatesField"
          :placeholder="t('statePlaceHolder')"
          :disabled="statesInputIsEmpty"
          class="w-full"
          required
        />
      </div>
    </div>
    <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
      <label>{{ t('cityLabel') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.address.city" class="w-full" required />
      </div>
    </div>
    <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
      <label>{{ t('addressLabel1') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.address.streetOne" class="w-full" required />
      </div>
    </div>
    <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
      <label>{{ t('addressLabel2') }}</label>
      <div class="p-inputgroup">
        <InputText type="text" v-model="form.address.streetTwo" class="w-full" required />
      </div>
    </div>
    <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
      <label>{{ t('postalCodeLabel') }}</label>
      <div class="p-inputgroup">
        <InputText id="phoneNumber" type="text" class="w-full" v-model="form.address.postalCode" required />
      </div>
    </div>
    <div class="field col-12 flex align-items-center">
      <Button :label="t('save')" class="px-5 mt-2 btn-submit" @click="submitProfileForm" :loading="submitting" />
    </div>
  </div>
</template>
margin-top: 7px;
<script lang="ts" setup>
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useAccount } from '../../../composables/useAccount'
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, watch } from 'vue'
import { useWorld } from '../../../composables/useWorld'
import { useRoute } from 'vue-router'

const {
  isNaturalAccount,
  submitProfileForm,
  form,
  submitting,
  isEditView,
  isCreateView,
  isUpdateProfileView,
  clearAccountFormData,
  setAccountForm,
  setFormInitialInfo,
  isEditPartnerAccount,
  getPartnerToEdit,
  isAccountBusinessComputed,
  setIsAccountBusiness,
} = useAccount()

const {
  countries,
  states,
  fetchStates,
  fetchCountries,
  loadingCountiesField,
  loadingStatesField,
  statesInputIsEmpty,
  countriesInputIsEmpty,
  calling_code,
  setCountry,
} = useWorld()

const { t } = useI18n({ useScope: 'global' })

const route = useRoute()

onMounted(async () => {
  await fetchCountries()
  if (getPartnerToEdit.value?.country) {
    await onChangeCountryHandler(getPartnerToEdit.value?.country ?? 'US')
  }

  if (isEditView.value || isUpdateProfileView.value) {
    setFormInitialInfo()
    setIsAccountBusiness(isAccountBusinessComputed.value)
  }
  console.log(getPartnerToEdit.value?.region)
  console.log(getPartnerToEdit.value?.country)
  let data = {
    generalData: {
      email: getPartnerToEdit.value?.email.toLowerCase() ?? '',
      name: '',
      lastName: getPartnerToEdit.value?.lastName,
      middleName: getPartnerToEdit.value?.middleName,
      firstName: getPartnerToEdit.value?.firstName,
    },
    address: {
      streetOne: getPartnerToEdit.value?.streetOne,
      streetTwo: getPartnerToEdit.value?.streetTwo,
      city: getPartnerToEdit.value?.city,
      country: getPartnerToEdit.value?.country,
      postalCode: getPartnerToEdit.value?.postalCode,
      region: getPartnerToEdit.value?.region,
    },
    phone: {
      phoneNumber: getPartnerToEdit.value?.phoneNumber,
      phoneCountry: getPartnerToEdit.value?.phoneCountry,
    },
    documentId: '',
    deviceId: '',
    isAccountBusiness: isAccountBusinessComputed.value,
  }

  if (isEditPartnerAccount.value) {
    setAccountForm(data)
  }

  if (isCreateView.value) {
    setAccountForm(data)
  }
})

onUnmounted(() => {
  clearAccountFormData()
})

const onChangeCountryHandler = async (value: string) => {
  const country = countries.value.find(country => country.country_code === value)
  if (!country) return
  setCountry(country)
  await fetchStates()
}

watch(form.value, async newValue => {
  if (newValue.address.country) {
    await onChangeCountryHandler(newValue.address.country)
  }
})
</script>
<style lang="scss">
.phone-input {
  margin-top: 7px;
}

.btn-submit{
  @media only screen and (max-width: 992px) {
    width: 100% !important;
  }
}
</style>
