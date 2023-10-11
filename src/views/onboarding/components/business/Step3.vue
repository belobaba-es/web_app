<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleBusinessAccount') }} - {{ t('accountPropuseTitle') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
        <label>{{ t('accountPropuseTitle') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="name" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('accountPropuseHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('associationsAccountsLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>
      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>
      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <Button :label="t('save')" class="px-5 mt-2 btn-submit" @click="saveData()" :loading="submitting" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useToast } from 'primevue/usetoast'

import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../../composables/useWorld'

import router from '../../../../router'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const submitting = ref(false)
const formData = ref()

const name = ref<string>('')
const email = ref<string>('')
const registerNumber = ref<string>('')
const naics = ref<string>('')
const naicsDescription = ref<string>('')
const establishedDate = ref<string>('')
const website = ref<string>('')
const phoneCountry = ref<string>('')
const phoneNumber = ref<string>('')

const registerStreetOne = ref<string>('')
const registerStreetTwo = ref<string>('')
const registerPostalCode = ref<string>('')
const registerCity = ref<string>('')
const registerState = ref<string>('')
const registerCountry = ref<string>('')

const fisicalStreetOne = ref<string>('')
const fisicalStreetTwo = ref<string>('')
const fisicalPostalCode = ref<string>('')
const fisicalCity = ref<string>('')
const fisicalState = ref<string>('')
const fisicalCountry = ref<string>('')

const isFisicalAdress = ref<boolean>(false)

onMounted(() => {
  const data = localStorage.getItem('companyData') || '{}'

  if (data) {
    formData.value = JSON.parse(data)
  }
})

const convertISODateToYYYYMMDD = (isoDateString: string) => {
  const date = new Date(isoDateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

const validateFields = () => {
  const isNameValid = name.value.trim() !== ''
  const isEmailValid = email.value.trim() !== ''
  const isRegisterNumberValid = registerNumber.value.trim() !== ''
  const isNaicsValid = naics.value.trim() !== ''
  const isNaicsDescriptionValid = naicsDescription.value.trim() !== ''
  const isEstablishedDateValid = establishedDate.value !== ''
  const isWebsiteValid = website.value.trim() !== ''
  const isPhoneCountryValid = phoneCountry.value.trim() !== ''
  const isPhoneNumberValid = phoneNumber.value.trim() !== ''
  const isRegisterStreetOneValid = registerStreetOne.value.trim() !== ''
  const isRegisterStreetTwoValid = registerStreetTwo.value.trim() !== ''
  const isRegisterPostalCodeValid = registerPostalCode.value.trim() !== ''
  const isRegisterCityValid = registerCity.value.trim() !== ''
  const isRegisterStateValid = registerState.value.trim() !== ''
  const isRegisterCountryValid = registerCountry.value.trim() !== ''
  const isFisicalStreetOneValid = fisicalStreetOne.value.trim() !== ''
  const isFisicalStreetTwoValid = fisicalStreetTwo.value.trim() !== ''
  const isFisicalPostalCodeValid = fisicalPostalCode.value.trim() !== ''
  const isFisicalCityValid = fisicalCity.value.trim() !== ''
  const isFisicalStateValid = fisicalState.value.trim() !== ''
  const isFisicalCountryValid = fisicalCountry.value.trim() !== ''

  return (
    isNameValid &&
    isEmailValid &&
    isRegisterNumberValid &&
    isNaicsValid &&
    isNaicsDescriptionValid &&
    isEstablishedDateValid &&
    isWebsiteValid &&
    isPhoneCountryValid &&
    isPhoneNumberValid &&
    isRegisterStreetOneValid &&
    isRegisterStreetTwoValid &&
    isRegisterPostalCodeValid &&
    isRegisterCityValid &&
    isRegisterStateValid &&
    isRegisterCountryValid &&
    isFisicalStreetOneValid &&
    isFisicalStreetTwoValid &&
    isFisicalPostalCodeValid &&
    isFisicalCityValid &&
    isFisicalStateValid &&
    isFisicalCountryValid
  )
}

const physicalAddressIsSameRegisteredAddress = () => {
  if (isFisicalAdress.value) {
    fisicalStreetOne.value = registerStreetOne.value
    fisicalStreetTwo.value = registerStreetTwo.value
    fisicalPostalCode.value = registerPostalCode.value
    fisicalCity.value = registerCity.value
    fisicalCountry.value = registerCountry.value

    if (fisicalState.value.length > 0) {
      fisicalState.value = registerState.value
    }
  } else {
    fisicalStreetOne.value = ''
    fisicalStreetTwo.value = ''
    fisicalPostalCode.value = ''
    fisicalCity.value = ''
    fisicalState.value = ''
    fisicalCountry.value = ''
  }
}

const saveData = () => {
  submitting.value = true

  if (validateFields()) {
    const formData = ref()

    formData.value = {
      informationCompany: {
        name: name.value,
        email: email.value,
        registerNumber: registerNumber.value,
        naics: naics.value,
        naicsDescription: naicsDescription.value,
        establishedDate: convertISODateToYYYYMMDD(establishedDate.value),
        website: website.value,
        phoneCountry: phoneCountry.value,
        phoneNumber: phoneNumber.value,
      },
      registeredAddress: {
        streetOne: registerStreetOne.value,
        streetTwo: registerStreetTwo.value,
        postalCode: registerPostalCode.value,
        city: registerCity.value,
        region: registerState.value,
        country: registerCountry.value,
      },
      physicalAddress: {
        streetOne: fisicalStreetOne.value,
        streetTwo: fisicalStreetTwo.value,
        postalCode: fisicalPostalCode.value,
        city: fisicalCity.value,
        region: fisicalState.value,
        country: fisicalCountry.value,
      },
      partners: [],
    }

    localStorage.setItem('companyData', JSON.stringify(formData.value))

    router.push('/onboarding/business/step2')
  } else {
    submitting.value = false
    toast.add({
      severity: 'error',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
  }
}
</script>
<style lang="scss">
.phone-input {
  margin-top: 7px;
}

.btn-submit {
  @media only screen and (max-width: 992px) {
    width: 100% !important;
  }
}

#phoneNumber {
  width: 97%;
}
</style>
