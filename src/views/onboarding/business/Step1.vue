<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 font-medium">{{ t('titleBusinessAccount') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('businessNameLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingCompany.informationCompany.name" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <!-- //FIX readonly -->
          <InputText type="text" v-model="onboardingCompany.email" class="w-full" readonly required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelDocumentCompany') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.informationCompany.registerNumber"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyTax') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelNaics') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingCompany.informationCompany.naics" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextNaics') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelnaicsDescription') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.informationCompany.naicsDescription"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextNaicsDescription') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelEstablishedDate') }}</label>
        <div class="p-inputgroup">
          <Calendar
            v-model="onboardingCompany.informationCompany.establishedDate"
            placeholder="0000/00/00"
            dateFormat="yy/mm/dd"
          />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextEstablishedDate') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('labelWebsite') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="onboardingCompany.informationCompany.webSite" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextWebsite') }}</span>
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 phone-input">
        <label>{{ t('phoneLabel') }}</label>
        <div class="field grid">
          <div class="col-4">
            <Dropdown
              class="w-full"
              v-model="onboardingCompany.informationCompany.phoneCountry"
              :options="calling_code"
            />
          </div>
          <div class="col-8">
            <InputText id="phoneNumber" type="text" class="" v-model="phoneNumber" required />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-4 mb-0 text-uppercase">{{ t('labelAdressRegistration') }}</p>
      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingCompany.informationCompany.registeredAddress.country"
              :options="countries"
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
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }}</label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.registeredAddress.region"
              class="w-full"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }}</label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.registeredAddress.city"
              class="w-full"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }}</label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.registeredAddress.streetOne"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingCompany.informationCompany.registeredAddress.streetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.registeredAddress.postalCode"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
        </div>
      </div>

      <div class="flex w-100 justify-content-between align-items-center mt-2">
        <div>
          <p class="mt-4 mb-0 text-uppercase">{{ t('labelAdressFisical') }}</p>
        </div>
        <div class="field-checkbox mt-2">
          <Checkbox
            inputId="patriot"
            v-model="isFisicalAdress"
            @change="physicalAddressIsSameRegisteredAddress"
            :binary="true"
          />
          <label for="patriot">Click aquí si la dirección fisica es igual que la dirección de registro</label>
        </div>
      </div>

      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="onboardingCompany.informationCompany.physicalAddress.country"
              :options="countries"
              optionLabel="name"
              option-value="country_code"
              :loading="loadingCountriesField"
              :placeholder="t('countryPlaceholder')"
              :disabled="countriesInputIsEmpty"
              class="w-full"
              @change="onChangeCountryHandlerTwo"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }}</label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.physicalAddress.region"
              class="w-full"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }}</label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              v-model="onboardingCompany.informationCompany.physicalAddress.city"
              class="w-full"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingCompany.informationCompany.physicalAddress.streetOne" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingCompany.informationCompany.physicalAddress.streetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="onboardingCompany.informationCompany.physicalAddress.postalCode" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
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
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Divider from 'primevue/divider'
import Checkbox from 'primevue/checkbox'

import { useToast } from 'primevue/usetoast'

import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../composables/useWorld'

import router from '../../../router'
import { useAuth } from '../../../composables/useAuth'
import { convertISODateToYYYYMMDD } from '../../../shared/formatDate'
import { useOnboardingCompany } from '../../../composables/useOnboardingCompany'

const { countries, fetchCountries, loadingCountriesField, countriesInputIsEmpty, loadingStatesField, calling_code } =
  useWorld()

const { onboardingCompany } = useOnboardingCompany()

const { getUserEmail } = useAuth()

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const submitting = ref(false)

const name = ref<string>('')
const email = ref<string>(getUserEmail())
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

onMounted(async () => {
  await fetchCountries()
})

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

const saveData = () => {
  submitting.value = true

  if (validateFields()) {
    router.push('/onboarding/business/new-shareholder')
    return
  }
  submitting.value = false
  toast.add({
    severity: 'error',
    summary: t('warningAllFieldRequired'),
    detail: t('warningDetailAllFieldRequired'),
    life: 4000,
  })
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
