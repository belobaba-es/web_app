<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleNaturalPerson') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('nameLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="firstName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('secondNameLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="middleName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextMiddleName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('surnameLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="lastName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextSurname') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('otherLastName') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="otherLastName" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextSecondSurname') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
        <label>{{ t('docTypeLabelPassport') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="passport" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextPassport') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
        <label>{{ t('documentLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="dni" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextIdNumber') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
        <label>{{ t('taxIdLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="taxId" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextTaxIDNumber') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <!-- //FIX readonly -->
          <InputText type="text" v-model="email" class="w-full" readonly required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('birthdateLabel') }}</label>
        <div class="p-inputgroup">
          <Calendar v-model="dateBirth" placeholder="0000/00/00" dateFormat="yy/mm/dd" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextTaxIDNumber') }}</span>
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 phone-input">
        <label>{{ t('phoneLabel') }}</label>
        <div class="field grid">
          <div class="col-4">
            <Dropdown class="w-full" v-model="phoneCountry" :options="calling_code" />
          </div>
          <div class="col-8">
            <InputText id="phoneNumber" type="text" class="" v-model="phoneNumber" required />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-4 mb-0 text-uppercase">{{ t('divisorLabel') }}</p>
      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="country"
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
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="state"
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
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="city" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="streetOne" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="streetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="postalCode" />
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
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Divider from 'primevue/divider'
import { useToast } from 'primevue/usetoast'

import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../../composables/useWorld'
import { useAccount } from '../../../../composables/useAccount'
import showExceptionError from '../../../../shared/showExceptionError'
import showMessage from '../../../../shared/showMessageArray'

import { OnboardingService } from '../../services/onboarding'
import router from '../../../../router'
import { useUserStore } from '../../../../stores/user'
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
  calling_code,
} = useWorld()

const { getEmail } = useUserStore()

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const submitting = ref(false)

const firstName = ref<string>('')
const middleName = ref<string>('')
const lastName = ref<string>('')
const otherLastName = ref<string>('')

const email = ref<string>(getEmail())
const dateBirth = ref<string>('')

const dni = ref<string>('')
const taxId = ref<string>('')
const passport = ref<string>('')
const phoneCountry = ref<string>('')
const phoneNumber = ref<string>('')
const streetOne = ref<string>('')
const streetTwo = ref<string>('')
const postalCode = ref<string>('')
const city = ref<string>('')
const state = ref<string>('')
const type = ref<string>('')
const country = ref<string>('')

onMounted(async () => {
  await fetchCountries()
})

const isPassportOrTaxIdEmpty = () => {
  return !passport.value && !taxId.value
}
const convertISODateToYYYYMMDD = (isoDateString: string) => {
  const date = new Date(isoDateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

const saveData = () => {
  submitting.value = true

  if (isPassportOrTaxIdEmpty()) {
    toast.add({
      severity: 'error',
      summary: t('error'),
      detail: t('passportOrTaxIdEmpty'),
    })
    submitting.value = false
    return
  }

  type.value = 'NATURAL_PERSON'
  const formData = ref()

  formData.value = {
    firstName: firstName.value,
    middleName: middleName.value,
    lastName: lastName.value + ' ' + otherLastName.value,
    email: email.value,
    dateBirth: convertISODateToYYYYMMDD(dateBirth.value),
    dni: dni.value,
    taxId: taxId.value,
    passport: passport.value,
    phoneCountry: phoneCountry.value,
    phoneNumber: phoneNumber.value,
    streetOne: streetOne.value,
    streetTwo: streetTwo.value,
    postalCode: postalCode.value,
    city: city.value,
    region: state.value,
    country: country.value,
    type: type.value,
  }

  const uploadDocumentsService = OnboardingService.instance()

  uploadDocumentsService
    .openingAccountPersonal(formData.value)
    .then(resp => {
      submitting.value = false
      toast.add({
        severity: 'success',
        detail: resp.message,
        life: 4000,
      })

      //save localstorage
      localStorage.setItem('accountId', resp.data.clientId)
      localStorage.setItem('dni', dni.value)

      router.push('/onboarding/personal/step2')
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
